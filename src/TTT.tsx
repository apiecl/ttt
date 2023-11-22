import Pompon from "./Pompon";
import { ReactNode } from "react";

import type { sensorOutput, size } from "./types/types";
import TTTStage from "./TTTStage";

interface TTTProps {
  calValues: sensorOutput;
  output: sensorOutput;
  oldOutput: sensorOutput
}

export function TTT(props: TTTProps): ReactNode {
  const size: size = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  return (
    <div className="main-ttt">
      <TTTStage size={size}>
        <Pompon
          lineWidth={3}
          size={size}
          sensorCalibrate={props.calValues}
          sensorData={props.output}
        />
        <Pompon
          lineWidth={10}
          size={size}
          sensorCalibrate={props.calValues}
          sensorData={props.oldOutput}
        />
      </TTTStage>
    </div>
  );
}
