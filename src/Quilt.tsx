import { useCallback, useState, useEffect } from "react";
import { Graphics, Stage, SimpleRope } from "@pixi/react";

function Quilt({ sensorData, sensorCalibrate }) {
  const dimensions = {
    w: 500,
    h: 500,
  };

  const [sensor, setSensor] = useState(1);

  useCallback(() => {
    console.log(sensorData);
    setSensor(sensorData["s"]);
  }, [sensorData]);

  const drawSensorA = useCallback(
    (g) => {
      if (sensorData && sensorData["s"] === 1) {
        g.clear();
        g.beginFill(0x4adb71);
        const nsensors = 12;
        const rectsize = dimensions.w / nsensors;
        for (let i = 0; i < 12; i++) {
          const barHeight =
            (sensorData[i.toString()] * dimensions.h) /
            sensorCalibrate[i.toString()];
          g.drawRect(rectsize * i, 0, rectsize, barHeight);
        }
      }
    },
    [sensorData, dimensions.w]
  );

  const drawSensorB = useCallback(
    (g) => {
      if (sensorData && sensorData["s"] === 2) {
        g.clear();
        g.beginFill(0xd34157);
        const nsensors = 12;
        const rectsize = dimensions.w / nsensors;
        for (let i = 0; i < 12; i++) {
          const barHeight =
            (sensorData[i.toString()] * dimensions.h) /
            sensorCalibrate[i.toString()];
          g.drawRect(rectsize * i, 0, rectsize, barHeight);
        }
      }
    },
    [sensorData, dimensions.w]
  );

  return (
    <Stage
      width={dimensions.w}
      height={dimensions.h}
      options={{ backgroundColor: 0x000000 }}
    >
      <Graphics draw={drawSensorA} />
      <Graphics draw={drawSensorB} />
    </Stage>
  );
}

export default Quilt;
