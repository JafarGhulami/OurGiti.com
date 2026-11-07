"""
Generates the seamless background tiles in public/patterns/.

The tiles come from the Giti landscape: a place of mountains, green valleys and rivers.
Every tile is written twice, as two-tone SVGs (same shapes, two inks):

  <name>.svg        deep green lines with emerald accents, for the light scheme
  <name>-dark.svg   pale mint lines with emerald accents, for the dark scheme
                    (also used on the deep-green .inverse band in both schemes)

Strength is baked into the files; the CSS picks the tile for the scheme, and the context
class (pat-hero, pat-section, pat-right, pat-band) decides where it shows and how it fades.

    python scripts/make-patterns.py

Tiles:
  contour   a topographic map of mountains: marching squares over a periodic height
            field, index contours heavier, the summit line in emerald
  ridges    mountain ranges seen from the valley: stacked ridgelines with sharp peaks
  river     rivers meandering down the valley, tributaries joining them
  terrain   an elevation map as halftone: dots swell over the peaks
  stream    calm river currents: bands of parallel flow lines with a few eddies
"""

from __future__ import annotations

import math
import os
import random

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "patterns")
os.makedirs(OUT, exist_ok=True)

LIGHT = {"ink": "#0B3D26", "acc": "#0B8A4F", "ink_o": 0.12, "acc_o": 0.42}
DARK = {"ink": "#BFE9D2", "acc": "#2FC277", "ink_o": 0.085, "acc_o": 0.5}


def write(name: str, w: float, h: float, build) -> None:
    for suffix, scheme in (("", LIGHT), ("-dark", DARK)):

        def ink(kind: str, mult: float = 1.0, s=scheme) -> str:
            return f'{kind}="{s["ink"]}" {kind}-opacity="{min(1.0, s["ink_o"] * mult):.3f}"'

        def acc(kind: str, mult: float = 1.0, s=scheme) -> str:
            return f'{kind}="{s["acc"]}" {kind}-opacity="{min(1.0, s["acc_o"] * mult):.3f}"'

        body = build(ink, acc, scheme)
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:g}" height="{h:g}" '
            f'viewBox="0 0 {w:g} {h:g}" fill="none">\n{body}\n</svg>\n'
        )
        with open(os.path.join(OUT, f"{name}{suffix}.svg"), "w", encoding="utf-8") as fh:
            fh.write(svg)
    print(f"  {name}: {w:g}x{h:g}")


def mountain_field(seed: int):
    """A periodic height field with mountain character: soft swells in every direction and
    summits of varied size (periodic Gaussian bumps), so the map still tiles."""
    rnd = random.Random(seed)
    waves = []
    for _ in range(8):
        kx, ky = rnd.choice([-2, -1, 1, 2]), rnd.choice([1, 2])
        waves.append((kx, ky, rnd.uniform(0, math.tau), rnd.uniform(0.3, 0.8)))
    summits = [
        (rnd.uniform(0, 1), rnd.uniform(0, 1), rnd.uniform(0.018, 0.05), rnd.uniform(0.7, 1.3))
        for _ in range(7)
    ]

    def field(u: float, v: float) -> float:
        base = sum(amp * math.sin(math.tau * (kx * u + ky * v) + ph) for kx, ky, ph, amp in waves)
        peaks = sum(
            hgt * math.exp(-((math.sin(math.pi * (u - cu)) ** 2 + math.sin(math.pi * (v - cv)) ** 2) / sig))
            for cu, cv, sig, hgt in summits
        )
        return 0.3 * base + 2.4 * peaks

    return field


def contour() -> None:
    """Topographic contours: marching squares over a periodic field, so the lines tile."""
    w, h = 720.0, 480.0
    nx, ny = 144, 96
    field = mountain_field(7)
    grid = [[field(i / nx, j / ny) for i in range(nx + 1)] for j in range(ny + 1)]
    lo = min(min(r) for r in grid)
    hi = max(max(r) for r in grid)
    levels = [lo + (hi - lo) * (0.06 + 0.9 * k / 15) for k in range(16)]
    summit = levels[-1]

    def lerp(a, b, fa, fb, lv):
        t = 0.5 if fb == fa else (lv - fa) / (fb - fa)
        return (a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t)

    table = {
        1: [(3, 0)], 2: [(0, 1)], 3: [(3, 1)], 4: [(1, 2)], 5: [(3, 0), (1, 2)], 6: [(0, 2)],
        7: [(3, 2)], 8: [(2, 3)], 9: [(0, 2)], 10: [(0, 1), (2, 3)], 11: [(1, 2)],
        12: [(1, 3)], 13: [(0, 1)], 14: [(3, 0)],
    }
    cw, ch = w / nx, h / ny
    by_level: dict[float, list[str]] = {}
    for lv in levels:
        segs = by_level.setdefault(lv, [])
        for j in range(ny):
            for i in range(nx):
                f = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]]
                p = [(i * cw, j * ch), ((i + 1) * cw, j * ch), ((i + 1) * cw, (j + 1) * ch), (i * cw, (j + 1) * ch)]
                idx = sum(1 << k for k in range(4) if f[k] > lv)
                if idx in (0, 15):
                    continue
                edges = {k: lerp(p[k], p[(k + 1) % 4], f[k], f[(k + 1) % 4], lv) for k in range(4)}
                for ea, eb in table[idx]:
                    (x1, y1), (x2, y2) = edges[ea], edges[eb]
                    segs.append(f"M{x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}")

    def build(ink, acc, *_):
        parts = []
        for k, lv in enumerate(levels):
            d = "".join(by_level[lv])
            if lv == summit:
                parts.append(f'<path d="{d}" {acc("stroke", 1)} stroke-width="1.1" stroke-linecap="round"/>')
            elif k % 5 == 0:  # index contours, heavier, as on a survey map
                parts.append(f'<path d="{d}" {ink("stroke", 1.9)} stroke-width="1.15" stroke-linecap="round"/>')
            else:
                parts.append(f'<path d="{d}" {ink("stroke", 1.15)} stroke-width="0.8" stroke-linecap="round"/>')
        return "\n".join(parts)

    write("contour", w, h, build)


def ridges() -> None:
    """Stacked mountain ridgelines: sharp peaks from whole-cycle terms, so they tile across."""
    w, gap, count = 720, 64, 8
    h = gap * count
    rnd = random.Random(11)
    lines = []
    for i in range(count):
        terms = [(rnd.choice([2, 3, 4, 5]), rnd.uniform(0, 1), rnd.uniform(0.35, 0.8)) for _ in range(3)]
        lines.append(terms)

    def tri(t):
        return 1 - abs(2 * (t % 1.0) - 1)  # a sharp peak at the middle of every cycle

    def y_at(x, i):
        height = sum(a * tri(k * x / w + ph) ** 1.6 for k, ph, a in lines[i])
        height += 0.12 * tri(13 * x / w + i * 0.37) + 0.06 * tri(29 * x / w + i * 0.11)  # rugged crest
        return i * gap + gap - 4 - 24 * height

    def build(ink, acc, sc):
        # Each range is shaded from its crest down to nothing, like haze in a valley
        parts = [
            '<defs><linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">'
            f'<stop offset="0" stop-color="{sc["ink"]}" stop-opacity="{sc["ink_o"] * 0.55:.3f}"/>'
            f'<stop offset="1" stop-color="{sc["ink"]}" stop-opacity="0"/>'
            "</linearGradient></defs>"
        ]
        for i in range(count):
            crest = "L".join(f"{x:g} {y_at(x, i):.1f}" for x in range(0, w + 1, 4))
            foot = min(h, i * gap + gap + 30)
            parts.append(f'<path d="M0 {foot}L{crest}L{w} {foot}Z" fill="url(#haze)"/>')
            d = "M" + crest
            if i % 4 == 1:
                parts.append(f'<path d="{d}" {acc("stroke", 0.75)} stroke-width="1.2" stroke-linejoin="round"/>')
            else:
                parts.append(f'<path d="{d}" {ink("stroke", 1.6)} stroke-width="1" stroke-linejoin="round"/>')
        return "\n".join(parts)

    write("ridges", w, h, build)


def river() -> None:
    """Rivers meandering down the tile (whole cycles, so they tile vertically), tributaries joining."""
    w, h = 720, 720
    rivers = [(130, 1, 0.3, 46), (380, 1, 2.1, 38), (610, 2, 4.0, 30)]

    def x_at(y, x0, k, ph, amp):
        return x0 + amp * math.sin(math.tau * k * y / h + ph) + amp * 0.35 * math.sin(math.tau * 2 * k * y / h + ph * 1.7)

    def build(ink, acc, *_):
        parts = []
        for x0, k, ph, amp in rivers:
            for off, kind, mult in ((-5, ink, 1.8), (5, ink, 1.8)):  # the two banks
                d = "M" + "L".join(f"{x_at(y, x0, k, ph, amp) + off:.1f} {y}" for y in range(0, h + 1, 6))
                parts.append(f'<path d="{d}" {kind("stroke", mult)} stroke-width="1" stroke-linecap="round"/>')
            d = "M" + "L".join(f"{x_at(y, x0, k, ph, amp):.1f} {y}" for y in range(0, h + 1, 6))
            parts.append(f'<path d="{d}" {acc("stroke", 0.6)} stroke-width="1.1" stroke-dasharray="2 7" stroke-linecap="round"/>')
            # the valley sides: contours that follow the river, wider and fainter uphill
            for step, off in enumerate((20, 36, 56, 80)):
                for sgn in (-1, 1):
                    wobble = 1 + 0.15 * step
                    d = "M" + "L".join(
                        f"{x_at(y, x0, k, ph, amp * wobble) + sgn * (off + 4 * math.sin(math.tau * 3 * y / h + step)):.1f} {y}"
                        for y in range(0, h + 1, 8)
                    )
                    parts.append(f'<path d="{d}" {ink("stroke", 1.3 - 0.22 * step)} stroke-width="0.8" stroke-linecap="round"/>')
            # tributaries: curves from the valley sides that end on the river
            for j, ty in enumerate((140, 400, 610)):
                side = -1 if (j + int(x0)) % 2 else 1
                ex = x_at(ty, x0, k, ph, amp) + side * 5
                sx = ex + side * 90
                sy = ty - 70
                parts.append(
                    f'<path d="M{sx:.1f} {sy:.1f}C{sx - side * 20:.1f} {sy + 40:.1f} {ex + side * 40:.1f} {ty - 30:.1f} {ex:.1f} {ty:.1f}" '
                    f'{ink("stroke", 1.3)} stroke-width="0.9" stroke-linecap="round"/>'
                )
        return "\n".join(parts)

    write("river", w, h, build)


def terrain() -> None:
    """An elevation map as halftone: dot size follows the mountain field."""
    step, n = 16, 36
    size = step * n
    field = mountain_field(3)
    vals = [[field(i / n, j / n) for i in range(n)] for j in range(n)]
    lo = min(min(r) for r in vals)
    hi = max(max(r) for r in vals)

    def build(ink, acc, *_):
        parts = []
        for j in range(n):
            for i in range(n):
                t = (vals[j][i] - lo) / (hi - lo)
                rr = 0.4 + 2.3 * t**1.8
                if rr < 0.75:
                    continue
                cx, cy = i * step + step / 2, j * step + step / 2
                paint = acc("fill", 0.9) if t > 0.93 else ink("fill", 2.4)
                parts.append(f'<circle cx="{cx:g}" cy="{cy:g}" r="{rr:.2f}" {paint}/>')
        return "\n".join(parts)

    write("terrain", size, size, build)


def stream() -> None:
    """Calm currents: bands of three close flow lines; whole cycles so the tile repeats."""
    w, band, count = 720, 48, 9
    h = band * count

    def y_at(x, i, line):
        return (
            i * band + band / 2 + (line - 1) * 5
            + 7 * math.sin(math.tau * x / w + i * 0.8)
            + 3 * math.sin(math.tau * 3 * x / w + i * 1.9 + line * 0.3)
        )

    def build(ink, acc, *_):
        parts = []
        for i in range(count):
            for line in range(3):
                d = "M" + "L".join(f"{x:g} {y_at(x, i, line):.1f}" for x in range(0, w + 1, 8))
                parts.append(f'<path d="{d}" {ink("stroke", 1.5 if line == 1 else 1.0)} stroke-width="0.9" stroke-linecap="round"/>')
            if i % 3 == 1:  # a current marker on the middle line
                for x0 in (140, 470):
                    d = "M" + "L".join(f"{x:g} {y_at(x, i, 1):.1f}" for x in range(x0, x0 + 64, 4))
                    parts.append(f'<path d="{d}" {acc("stroke", 0.9)} stroke-width="1.4" stroke-linecap="round"/>')
        return "\n".join(parts)

    write("stream", w, h, build)


if __name__ == "__main__":
    contour()
    ridges()
    river()
    terrain()
    stream()
