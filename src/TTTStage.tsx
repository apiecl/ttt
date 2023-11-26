import { Stage, Container, withFilters } from "@pixi/react";
import * as PIXI from "pixi.js";
import { ReactNode } from "react";
import { colors, size } from "./types/types";

interface stageprops {
  children: ReactNode[] | ReactNode,
  size: size
}

function TTTStage(props:stageprops) {
  const Filters = withFilters(Container, {
    blur: PIXI.BlurFilter
  });
  return (
    <Stage
      width={props.size.w}
      height={props.size.h}
      options={{ backgroundColor: colors.background, antialias: true }}
    >
      <Filters
        blur={{ blur: 0.1 }}
      >
        {props.children}
      </Filters>
    </Stage>
  );
}

export default TTTStage;
