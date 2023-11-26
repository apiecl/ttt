import { useCallback, useEffect, useState } from "react";
import { Graphics } from "@pixi/react";
import {
  position,
  sensorOutput,
  size,
  variant,
  variantNumber,
  sensorNumber,
  colors,
} from "./types/types";
import { Persistent } from "./Persistent";
import { calcPos, calcRadius, channelToColor } from "./utils/utils";
import { baseconfig } from "./conf/baseconfig";

interface pomponProps {
  sensorData: sensorOutput;
  sensorCalibrate: sensorOutput;
  size: size;
  lineWidth: number;
  age?: number;
  totalOlds?: number;
}

type graphics = {
  clear: () => void;
  lineStyle: (width: number, color: number, alpha: number) => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  beginFill: (color: number) => void;
  drawCircle: (x: number, y: number, radius: number) => void;
};

function Pompon(props: pomponProps) {
  //Time alive in miliseconds
  const nsensors = 12;
  const angleUnit = 360 / (nsensors * 2);
  const center = { x: props.size.w / 2, y: props.size.h / 2 };

  const calculateRadius = useCallback(
    (channelData: number, calValue: number) => {
      return calcRadius(channelData, calValue, props.size.h);
    },
    [props.size.h],
  );

  const [points, setPoints] = useState<position[]>();
  const [alpha, setAlpha] = useState<number>(1);
  const [width, setWidth] = useState<number>(4);
  const [pointSize, setPointSize] = useState<number>(5);
 

  const calcAlphaAndWidth = useCallback((age:number) => {
    if(age && props.totalOlds) {
      const max = baseconfig.noStore;
      const alphaUnit = 1 / props.totalOlds;
      const lineUnit = props.lineWidth / props.totalOlds;
      const pointUnit = 5 / max;
      setAlpha(oldAlpha => {
        const tmpAlpha = oldAlpha > 0 ? 1 - (age * alphaUnit) : 0.1;
        return tmpAlpha;
      });
      setWidth(oldWidth => {
        const tmpWidth = oldWidth > 0 ? props.lineWidth - (age * lineUnit) : 0.1;
        return tmpWidth;
      });
      setPointSize(oldPointSize => {
        const tmpPointSize = oldPointSize > 0 ? 5 - (age * pointUnit) : 0.1;
        return tmpPointSize;
      });
    }
  }, [props.lineWidth, props.totalOlds])

  useEffect(() => {
    if(props.age) {
      calcAlphaAndWidth(props.age);
    }
  }, [calcAlphaAndWidth, props.age]);

  const drawCenter = useCallback(
    (g: graphics) => {
      g.clear();
      g.beginFill(colors.background);
      g.drawCircle(center.x, center.y, 15);
    },
    [center.x, center.y],
  );

  const drawLine = useCallback(
    (g: graphics, sensorNo: number) => {
      g.clear();
      const tmpPositions: position[] = [];
      for (let i = 0; i < 12; i++) {
        g.lineStyle(width, channelToColor(i, sensorNo as sensorNumber), alpha);
        g.moveTo(center.x, center.y);
        const sensorValue = (props.sensorData as unknown as variantNumber)[
          i.toString()
        ];
        const calibrateValue = (
          props.sensorCalibrate as unknown as variantNumber
        )[i.toString()];
        if (sensorValue !== calibrateValue) {
          const radius = calculateRadius(sensorValue, calibrateValue);
          const angle = 360 - (angleUnit * i * sensorNo);
          const pointPos = calcPos(radius, angle);
          tmpPositions.push({
            x: pointPos.x + center.x,
            y: pointPos.y + center.y,
          });
          g.lineTo(pointPos.x + center.x, pointPos.y + center.y);
        }
      }
      setPoints(tmpPositions);
    },
    [alpha, angleUnit, calculateRadius, center.x, center.y, props.sensorCalibrate, props.sensorData, width],
  );

  const drawSensorA = useCallback(
    (g: graphics) => {
      if (props.sensorData) {
        drawLine(g, 1);
      }
    },
    [props.sensorData, drawLine],
  );

  const drawSensorB = useCallback(
    (g: graphics) => {
      if (props.sensorData) {
        drawLine(g, 2);
      }
    },
    [props.sensorData, drawLine],
  );

  return (
    <>
      <Graphics key={"sensorA"} draw={drawSensorA}></Graphics>
      <Graphics key={"sensorB"} draw={drawSensorB}></Graphics>

      {points?.map((point, idx) => (
        <Persistent
          key={`point-${idx}`}
          position={point}
          size={pointSize}
          alpha={alpha}
          color={channelToColor(
            idx,
            (props.sensorData as unknown as variant)["s"] as sensorNumber,
          )}
        />
      ))}
      <Graphics key={"center"} draw={drawCenter}></Graphics>
    </>
  );
}

export default Pompon;
