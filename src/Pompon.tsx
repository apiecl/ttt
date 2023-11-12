import { useCallback, useState } from "react";
import { Graphics } from "@pixi/react";

function Pompon({ sensorData, sensorCalibrate }) {
  const dimensions = {
    w: 500,
    h: 500,
  };

  const maxRadius = dimensions.w / 2;
  const maxCalibrate = 500;

  function calculateRadius(channelData) {
    const unit = maxRadius / maxCalibrate;

    return maxRadius - channelData * unit;
  }

  const drawSensorA = useCallback(
    (g) => {
      if (sensorData && sensorData["s"] === 1) {
        g.clear();
        g.beginFill(0x4adb71);
        g.lineStyle(1, 0xffd900, 0.5);
        const nsensors = 12;
        const angleUnit = 360 / nsensors;
        const center = { x: dimensions.w / 2, y: dimensions.h / 2 };

        for (let i = 0; i < 12; i++) {
          g.moveTo(center.x, center.y);
          const radius = calculateRadius(sensorData[i.toString()]);
          const angle = angleUnit * i;
          const pointToX = radius * Math.sin(angle);
          const pointToY = radius * Math.cos(angle);
          console.log(angle, radius);
          g.lineTo(pointToX + center.x, pointToY + center.y);
        }
      }
    },
    [sensorData, dimensions.w, dimensions.y]
  );

  const drawSensorB = useCallback(
    (g) => {
      if (sensorData && sensorData["s"] === 2) {
        g.clear();
        g.beginFill(0x4adb71);
        g.lineStyle(1, 0x5F4BB6, 0.5);
        const nsensors = 12;
        const angleUnit = 360 / nsensors;
        const center = { x: dimensions.w / 2, y: dimensions.h / 2 };

        for (let i = 0; i < 12; i++) {
          g.moveTo(center.x, center.y);
          const radius = calculateRadius(sensorData[i.toString()]);
          const angle = angleUnit + 8 * i;
          const pointToX = radius * Math.sin(angle);
          const pointToY = radius * Math.cos(angle);
          console.log(angle, radius);
          g.lineTo(pointToX + center.x, pointToY + center.y);
        }
      }
    },
    [sensorData, dimensions.w, dimensions.y]
  );

  return (
    <>
      <Graphics draw={drawSensorA}></Graphics>
      <Graphics draw={drawSensorB}></Graphics>
    </>
  );
}

export default Pompon;
