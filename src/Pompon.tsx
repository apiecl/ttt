import { useCallback, useEffect, useState } from "react";
import { Graphics } from "@pixi/react";
import {
  sensorOutput,
  size,
  variantNumber,
  sensorNumber,
  colors,
} from "./types/types";
import { calcPos, calcRadius, channelToColor } from "./utils/utils";

interface pomponProps {
  sensorData: sensorOutput;
  sensorCalibrate: sensorOutput;
  size: size;
  lineWidth: number;
  age?: number;
  totalOlds?: number;
  debug: boolean;
}

type point = {
  x: number,
  y: number,
  ch: string,
  s: sensorNumber
}

type graphics = {
  clear: () => void;
  lineStyle: (width: number, color: number, alpha: number) => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
  beginFill: (color: number) => void;
  endFill: () => void;
  drawCircle: (x: number, y: number, radius: number) => void;
};

function Pompon(props: pomponProps) {
  //Time alive in miliseconds
  const center = { x: props.size.w / 2, y: props.size.h / 2 };
  const anglesArray = [0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360];

  const calculateRadius = useCallback(
    (channelData: number, calValue: number) => {
      return calcRadius(channelData, calValue, props.size.h);
    },
    [props.size.h],
  );

  
  const [alpha, setAlpha] = useState<number>(1);
  const [width, setWidth] = useState<number>(4);


  const calcAlphaAndWidth = useCallback(
    (age: number) => {
      if (age && props.totalOlds) {
        
        const alphaUnit = 1 / props.totalOlds;
        const lineUnit = props.lineWidth / props.totalOlds;
        
        setAlpha((oldAlpha) => {
          const tmpAlpha = oldAlpha > 0 ? 1 - age * alphaUnit : 0.1;
          return tmpAlpha;
        });
        setWidth((oldWidth) => {
          const tmpWidth =
            oldWidth > 0 ? props.lineWidth - age * lineUnit : 0.1;
          return tmpWidth;
        });
        
      }
    },
    [props.lineWidth, props.totalOlds],
  );

  useEffect(() => {
    if (props.age) {
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
      const tmpPositions:point[] = [];
      Object.keys(props.sensorData).forEach((channelKey) => {
        if (channelKey !== "s" && channelKey !== "c") {
          const curcolor = channelToColor(parseInt(channelKey), sensorNo as sensorNumber);
          g.lineStyle(
            width,
            curcolor,
            alpha,
          );
          g.moveTo(center.x, center.y);

          const sensorValue = (props.sensorData as unknown as variantNumber)[
            channelKey
          ];

          const calibrateValue = (
            props.sensorCalibrate as unknown as variantNumber
          )[channelKey];

          if (sensorValue !== calibrateValue) {
            const radius = calculateRadius(sensorValue, calibrateValue);
            const key:number = sensorNo === 2 ? parseInt(channelKey) + 11 : parseInt(channelKey);
            const angle = anglesArray[key];

            const pointPos = calcPos(center, radius, angle);

            tmpPositions.push({x:pointPos.x, y: pointPos.y, ch: channelKey, s: props.sensorData["s"]});
            g.lineTo(pointPos.x, pointPos.y);
            g.moveTo(pointPos.x, pointPos.y);
            g.beginFill(curcolor);
            g.drawCircle(pointPos.x, pointPos.y, 2);
            g.endFill();
          }
        }
      });

  
    },
    [props.sensorCalibrate, props.sensorData],
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
      <Graphics key={"center"} draw={drawCenter}></Graphics>
    </>
  );
}

export default Pompon;
