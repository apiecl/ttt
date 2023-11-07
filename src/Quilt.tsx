import React, { useCallback } from "react";
import { Graphics, Stage, SimpleRope } from "@pixi/react";

function Quilt({ sensorData }) {

    const draw = useCallback((g) => {
        g.clear();
        g.beginFill(0xff3300);
        g.lineStyle(4, 0xffd900, 1);
        g.drawCircle(250, 250, sensorData["0"]);
        g.drawCircle(20, 20, sensorData["1"]);
        g.drawCircle(300, 300, sensorData["2"]);
    })
  return (
    <Stage width={500} height={500} options={{ backgroundColor: 0x000000 }}>
        <Graphics draw={draw} />
    </Stage>
  );
}

export default Quilt;
