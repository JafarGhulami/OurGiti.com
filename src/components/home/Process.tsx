import Ridge from "@/components/common/Ridge";
import { PROCESS } from "@/data/home";
import ProcessSteps from "./ProcessSteps";
import { BuildVisual, CareVisual, PlanVisual, TalkVisual } from "./ProcessVisuals";

/**
 * How an engagement runs, as a walkthrough: the four steps (numbered, because the order
 * carries information) beside a stage that shows what each step produces, from the first
 * conversation to an ordinary day of support.
 */
export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="section ground-page bg-terrain pat-section overflow-hidden pb-0"
    >
      <div className="light-field light-field-wide" aria-hidden />
      <div className="wrap relative">
        <div className="section-head reveal">
          <h2 id="process-title">{PROCESS.title}</h2>
          <p className="lead">{PROCESS.lead}</p>
        </div>

        <div className="reveal mt-14">
          <ProcessSteps
            steps={PROCESS.steps}
            panels={[
              <TalkVisual key="talk" />,
              <PlanVisual key="plan" />,
              <BuildVisual key="build" />,
              <CareVisual key="care" />,
            ]}
          />
        </div>
        <p className="mt-5 text-[13px] text-muted lg:text-right">{PROCESS.visualCaption}</p>
      </div>
      <Ridge from="page" to="band" seed={3} className="mt-[clamp(64px,8vw,104px)]" />
    </section>
  );
}
