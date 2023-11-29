import Pompon from "./Pompon";
import { ReactNode } from "react";

import { colors, type sensorOutput, type size } from "./types/types";
import TTTStage from "./TTTStage";
import { PrevPoints } from "./PrevPoints";

interface TTTProps {
  calValuesA: sensorOutput;
  calValuesB: sensorOutput;
  output: sensorOutput;
  oldOutput: sensorOutput;
  oldOutputs: sensorOutput[];
  debug: boolean;
}

export function TTT(props: TTTProps): ReactNode {
  const size: size = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  return (
    <div className="main-ttt">
      <TTTStage size={size}>
        <PrevPoints
          previous={props.oldOutput}
          height={size.h}
          width={size.w}
          color={colors.green}
        ></PrevPoints>
         <PrevPoints
          previous={props.oldOutput}
          factor={1.5}
          height={size.h}
          width={size.w}
          color={colors.blue}
        ></PrevPoints>
        <PrevPoints
          previous={props.oldOutput}
          factor={2}
          height={size.h}
          width={size.w}
          color={colors.red}
        ></PrevPoints>
        <Pompon
          lineWidth={10}
          size={size}
          sensorCalibrateA={props.calValuesA}
          sensorCalibrateB={props.calValuesB}
          sensorData={props.output}
          debug={props.debug}
        />
        {props.oldOutputs && props.debug === false && props.oldOutputs.map((output, idx) => 
          <Pompon
          key={`pompon-${idx}`}
          lineWidth={10}
          size={size}
          sensorCalibrateA={props.calValuesA}
          sensorCalibrateB={props.calValuesB}
          sensorData={output}
          age={idx}
          totalOlds={props.oldOutputs.length}
          debug={props.debug}
        />
        )}
      </TTTStage>
    </div>
  );
}
