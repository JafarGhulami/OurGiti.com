import Ridge from "@/components/common/Ridge";
import { PROCESS } from "@/data/home";
import { BuildPanel, CarePanel, PlanPanel, TalkPanel } from "./ProcessPanels";
import ProcessStory from "./ProcessStory";

/**
 * How an engagement runs, as a scroll story: the steps pinned on the left, and on the right a
 * large panel for each showing what it produces, from the first inquiry to an ordinary day of
 * support. The section clips sideways with `overflow-x: clip`, not hidden, so the pinned
 * column can stick.
 */
export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="section ground-page bg-terrain pat-section overflow-x-clip pb-0"
    >
      <div className="light-field light-field-wide" aria-hidden />
      <div className="wrap relative">
        <ProcessStory
          title={PROCESS.title}
          lead={PROCESS.lead}
          cta={PROCESS.cta}
          steps={PROCESS.steps}
          panels={[
            <TalkPanel key="talk" />,
            <PlanPanel key="plan" />,
            <BuildPanel key="build" />,
            <CarePanel key="care" />,
          ]}
        />
        <p className="mt-6 text-[13px] text-muted lg:text-right">{PROCESS.visualCaption}</p>
      </div>
      <Ridge from="page" to="band" seed={3} className="mt-[clamp(64px,8vw,104px)]" />
    </section>
  );
}
