import { Stage, Container, withFilters } from "@pixi/react";
import * as PIXI from "pixi.js";
import { ReactNode } from "react";
import { colors, size } from "./types/types";
//import { BlurFilter, ColorMatrixFilter } from "pixi.js";

interface stageprops {
  children: ReactNode[] | ReactNode,
  size: size
}

function TTTStage(props:stageprops) {
  const Filters = withFilters(Container, {
    blur: PIXI.BlurFilter,
    noise: PIXI.NoiseFilter
  });
  return (
    <Stage
      width={props.size.w}
      height={props.size.h}
      options={{ backgroundColor: colors.black, antialias: true }}
    >
      <Filters
        blur={{ blur: 5 }}
        noise={{ noise: 0.2 }}
      >
        {props.children}
      </Filters>
    </Stage>
  );
}

export default TTTStage;
