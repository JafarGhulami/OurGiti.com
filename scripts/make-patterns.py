"""
Generates the seamless background tiles in public/patterns/.

Every tile is written twice, as two-tone SVGs (same shapes, two inks):

  <name>.svg        deep green lines with emerald accents, for the light scheme
  <name>-dark.svg   pale mint lines with emerald accents, for the dark scheme
                    (also used on the deep-green .inverse band in both schemes)

Strength is baked into the files; the CSS picks the tile for the scheme, and the context
class (pat-hero, pat-section, pat-band) decides where it shows and how it fades.

    python scripts/make-patterns.py

Tiles (all from the IT world; no plain grids):
  mesh     a network: nodes joined to their nearest neighbours, a few lit nodes
  circuit  board traces with pads and vias, one trace in five live
  hex      a cell structure, a scatter of lit cells
  flow     data streams: even waves that run unbroken across the repeat
  dots     a halftone field whose dots swell and fade in soft waves
"""

from __future__ import annotations

import math
import os
import random

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "patterns")
os.makedirs(OUT, exist_ok=True)

# Ink, accent and base opacities per scheme. The dark tiles sit on near-black green, the
# light ones on white / green-gray; the opacities give both the same quiet presence.
LIGHT = {"ink": "#0B3D26", "acc": "#0B8A4F", "ink_o": 0.12, "acc_o": 0.42}
DARK = {"ink": "#BFE9D2", "acc": "#2FC277", "ink_o": 0.085, "acc_o": 0.5}


def write(name: str, w: float, h: float, build) -> None:
    for suffix, scheme in (("", LIGHT), ("-dark", DARK)):

        def ink(kind: str, mult: float = 1.0, s=scheme) -> str:
            return f'{kind}="{s["ink"]}" {kind}-opacity="{min(1.0, s["ink_o"] * mult):.3f}"'

        def acc(kind: str, mult: float = 1.0, s=scheme) -> str:
            return f'{kind}="{s["acc"]}" {kind}-opacity="{min(1.0, s["acc_o"] * mult):.3f}"'

        body = build(ink, acc)
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:g}" height="{h:g}" '
            f'viewBox="0 0 {w:g} {h:g}" fill="none">\n{body}\n</svg>\n'
        )
        with open(os.path.join(OUT, f"{name}{suffix}.svg"), "w", encoding="utf-8") as fh:
            fh.write(svg)
    print(f"  {name}: {w:g}x{h:g}")


def _copies(x1, y1, x2, y2, w, h):
    """A segment plus the shifted copies needed where it crosses the tile edge."""
    out = []
    for dx in (-w, 0, w):
        for dy in (-h, 0, h):
            a, b, c, d = x1 + dx, y1 + dy, x2 + dx, y2 + dy
            if max(a, c) < 0 or min(a, c) > w or max(b, d) < 0 or min(b, d) > h:
                continue
            out.append((a, b, c, d))
    return out


def mesh() -> None:
    """Nodes on a torus joined to their nearest neighbours: a network, seamless at the edges."""
    size = 640
    rnd = random.Random(7)
    pts: list[tuple[float, float]] = []
    while len(pts) < 46:  # loose Poisson-disc spacing
        p = (rnd.uniform(0, size), rnd.uniform(0, size))
        if all(min(abs(p[0] - q[0]), size - abs(p[0] - q[0])) ** 2 + min(abs(p[1] - q[1]), size - abs(p[1] - q[1])) ** 2 > 72**2 for q in pts):
            pts.append(p)

    def near(i):
        res = []
        for j, q in enumerate(pts):
            if j == i:
                continue
            dx = q[0] - pts[i][0]
            dy = q[1] - pts[i][1]
            dx -= size * round(dx / size)
            dy -= size * round(dy / size)
            res.append((math.hypot(dx, dy), j, dx, dy))
        return sorted(res)[:3]

    edges = {}
    for i, p in enumerate(pts):
        for dist, j, dx, dy in near(i):
            if dist < 150:
                key = tuple(sorted((i, j)))
                edges[key] = (p[0], p[1], p[0] + dx, p[1] + dy)
    lit = set(rnd.sample(range(len(pts)), 6))

    def build(ink, acc):
        segs = []
        for (x1, y1, x2, y2) in edges.values():
            for a, b, c, d in _copies(x1, y1, x2, y2, size, size):
                segs.append(f"M{a:.1f} {b:.1f}L{c:.1f} {d:.1f}")
        parts = [f'<path d="{"".join(segs)}" {ink("stroke", 1.6)} stroke-width="1"/>']
        for k, (x, y) in enumerate(pts):
            for dx in (-size, 0, size):
                for dy in (-size, 0, size):
                    cx, cy = x + dx, y + dy
                    if -10 <= cx <= size + 10 and -10 <= cy <= size + 10:
                        if k in lit:
                            parts.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="9" {acc("fill", 0.22)}/>')
                            parts.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="3.4" {acc("fill", 1)}/>')
                        else:
                            parts.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="2.4" {ink("fill", 3)}/>')
        return "\n".join(parts)

    write("mesh", size, size, build)


def circuit() -> None:
    """Manhattan traces with 45-degree corners, pads at the ends and vias; wraps at the edges."""
    cell, n = 32, 20
    size = cell * n
    rnd = random.Random(21)
    occupied: set[tuple[int, int]] = set()
    traces: list[list[tuple[int, int]]] = []
    for _ in range(70):
        x, y = rnd.randrange(n), rnd.randrange(n)
        if (x, y) in occupied:
            continue
        path = [(x, y)]
        dx, dy = rnd.choice([(1, 0), (-1, 0), (0, 1), (0, -1)])
        for _step in range(rnd.randint(3, 10)):
            if rnd.random() < 0.28:
                dx, dy = (dy, dx) if rnd.random() < 0.5 else (-dy, -dx)
            nx_, ny_ = (x + dx) % n, (y + dy) % n
            if (nx_, ny_) in occupied:
                break
            x, y = nx_, ny_
            path.append((x, y))
        if len(path) < 3:
            continue
        occupied.update(path)
        traces.append(path)
    paths, pads = [], []
    for k, path in enumerate(traces):
        d = []
        for i, (x, y) in enumerate(path):
            px, py = x * cell + cell / 2, y * cell + cell / 2
            if i > 0:
                ox, oy = path[i - 1]
                if abs(x - ox) > 1 or abs(y - oy) > 1:
                    d.append(f"M{px:g} {py:g}")
                    continue
            d.append(("M" if i == 0 else "L") + f"{px:g} {py:g}")
        paths.append(("".join(d), k % 5 == 0))
        for x, y in (path[0], path[-1]):
            pads.append((x * cell + cell / 2, y * cell + cell / 2, k % 5 == 0))

    def build(ink, acc):
        plain = "".join(d for d, lit in paths if not lit)
        lit = "".join(d for d, l in paths if l)
        parts = [
            f'<path d="{plain}" {ink("stroke", 1.7)} stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/>',
            f'<path d="{lit}" {acc("stroke", 0.7)} stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>',
        ]
        for x, y, l in pads:
            if l:
                parts.append(f'<circle cx="{x:g}" cy="{y:g}" r="3.6" {acc("fill", 0.9)}/>')
            else:
                parts.append(f'<circle cx="{x:g}" cy="{y:g}" r="3.2" {ink("stroke", 2)} stroke-width="1.2"/>')
        return "\n".join(parts)

    write("circuit", size, size, build)


def hex_cells() -> None:
    """Flat-top hexagonal cells; a scatter of lit cells. The repeat is a whole number of cells.

    The cells are a hair off regular (24 px across the flats, 42 px row pitch) so the tile
    measures whole pixels (360 x 294) and repeats without hairline seams.
    """
    rx, pitch = 24.0, 42.0
    ry = pitch / math.sqrt(3)
    cols, rows = 10, 7  # cols must be even for the column offset to wrap
    w, h = 1.5 * rx * cols, pitch * rows
    rnd = random.Random(5)

    def hexagon(cx, cy, inset=1.5):
        a, b = rx - inset, ry - inset
        pts = [(cx + a * math.cos(math.radians(60 * k)), cy + b * math.sin(math.radians(60 * k))) for k in range(6)]
        return "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z"

    def centre(c, rw):
        return c * 1.5 * rx, rw * pitch + (pitch / 2 if c % 2 else 0)

    cells = [centre(c, rw) for c in range(cols + 1) for rw in range(-1, rows + 1)]
    lit = [centre(c, rw) for c, rw in rnd.sample([(c, rw) for c in range(cols) for rw in range(rows)], 6)]

    def build(ink, acc):
        d = "".join(hexagon(cx, cy) for cx, cy in cells)
        parts = [f'<path d="{d}" {ink("stroke", 1.4)} stroke-width="1"/>']
        for cx, cy in lit:
            for dx in (0, w):
                for dy in (0, h):
                    parts.append(f'<path d="{hexagon(cx + dx, cy + dy)}" {acc("fill", 0.16)} {acc("stroke", 0.8)} stroke-width="1"/>')
        return "\n".join(parts)

    write("hex", w, h, build)


def flow() -> None:
    """Even data streams: each wave fits whole cycles across the tile so it runs unbroken."""
    w, gap, count = 720, 30, 14
    h = gap * count

    def y_at(x, i):
        k1, k2 = 1, 2
        return i * gap + gap / 2 + 9 * math.sin(2 * math.pi * k1 * x / w + i * 0.55) + 4 * math.sin(2 * math.pi * k2 * x / w + i * 1.3)

    def build(ink, acc):
        parts = []
        for i in range(count):
            d = "M" + "L".join(f"{x:g} {y_at(x, i):.1f}" for x in range(0, w + 1, 8))
            if i % 5 == 2:
                parts.append(f'<path d="{d}" {acc("stroke", 0.65)} stroke-width="1.3" stroke-linecap="round"/>')
                for x in (90, 330, 560):  # packets travelling the live stream
                    parts.append(f'<circle cx="{x}" cy="{y_at(x, i):.1f}" r="2.8" {acc("fill", 1)}/>')
            else:
                parts.append(f'<path d="{d}" {ink("stroke", 1.4)} stroke-width="1" stroke-linecap="round"/>')
        return "\n".join(parts)

    write("flow", w, h, build)


def dots() -> None:
    """A halftone field: dot size follows a smooth periodic wave, so the tile repeats cleanly."""
    step, n = 16, 36
    size = step * n

    def f(x, y):
        u, v = 2 * math.pi * x / size, 2 * math.pi * y / size
        return 0.5 + 0.5 * math.sin(u + 0.7 * math.sin(v)) * math.cos(v * 2 - u * 0.5 + 0.4)

    def build(ink, acc):
        parts = []
        for i in range(n):
            for j in range(n):
                x, y = i * step + step / 2, j * step + step / 2
                rr = 0.5 + 1.9 * f(x, y) ** 1.6
                if rr < 0.7:
                    continue
                parts.append(f'<circle cx="{x:g}" cy="{y:g}" r="{rr:.2f}" {ink("fill", 2.4)}/>')
        return "\n".join(parts)

    write("dots", size, size, build)


if __name__ == "__main__":
    mesh()
    circuit()
    hex_cells()
    flow()
    dots()
