import { Stage, Container, withFilters } from "@pixi/react";
import * as PIXI from "pixi.js";
import { ReactNode } from "react";
import { size } from "./types/types";
//import { BlurFilter, ColorMatrixFilter } from "pixi.js";

interface stageprops {
  children: ReactNode[] | ReactNode,
  size: size
}

function TTTStage(props:stageprops) {
  const Filters = withFilters(Container, {
    blur: PIXI.BlurFilter,
  });
  return (
    <Stage
      width={props.size.w}
      height={props.size.h}
      options={{ backgroundColor: 0x000000, antialias: true }}
    >
      <Filters
        blur={{ blur: 5 }}
        //matrix={{ enabled: true }}
      >
        {props.children}
      </Filters>
    </Stage>
  );
}

export default TTTStage;
