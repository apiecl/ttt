import { Stage } from "@pixi/react";
import { ReactNode } from "react";
import { colors, size } from "./types/types";
//import { BlurFilter, ColorMatrixFilter } from "pixi.js";

interface stageprops {
  children: ReactNode[] | ReactNode,
  size: size
}

function TTTStage(props:stageprops) {
  return (
    <Stage
      width={props.size.w}
      height={props.size.h}
      options={{ backgroundColor: colors.black, antialias: true }}
    >
        {props.children}
    </Stage>
  );
}

export default TTTStage;
