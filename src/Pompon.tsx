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
  sensorCalibrateA: sensorOutput;
  sensorCalibrateB: sensorOutput;
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
  
  
  
  useEffect(() => {
    const tmpArr = [];
    const slots = 24;
    const angleUnit = 360 / 24;
    let slot = 0;
    for(let i = 0; i <= slots; i++) {
      slot += angleUnit;
      tmpArr.push(slot);
    }

    //revert the last 12
    const start = tmpArr.slice(0, 11);
    const end = tmpArr.slice(12, -1).reverse();
    setAnglesArray([...start, ...end]);
  },[]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [center, _] = useState({ x: props.size.w / 2, y: props.size.h / 2 });
  const [anglesArray, setAnglesArray] = useState<Array<number>>([]);

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
    (g: graphics) => {
      g.clear();
      const tmpPositions:point[] = [];
      Object.keys(props.sensorData).forEach((channelKey) => {
        const sensorNo:number = props.sensorData["s"];
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

          let calibrateValue:number;
          
          if(sensorNo === 1) {
            calibrateValue = (
              props.sensorCalibrateA as unknown as variantNumber
            )[channelKey];
          } else {
            calibrateValue = (
              props.sensorCalibrateA as unknown as variantNumber
            )[channelKey];
          }
          

          if (sensorValue !== calibrateValue) {
            const radius = calculateRadius(sensorValue, calibrateValue);
            //const key:number = sensorNo === 2 ? parseInt(channelKey) + 14 : parseInt(channelKey);
            const angle = sensorNo === 1 ? anglesArray[parseInt(channelKey)] : anglesArray[parseInt(channelKey) + 12];
            
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
    [alpha, anglesArray, calculateRadius, center, props.sensorCalibrateA, props.sensorData, width],
  );

  const drawSensorA = useCallback(
    (g: graphics) => {
      if (props.sensorData) {
        drawLine(g);
      }
    },
    [props.sensorData, drawLine],
  );

  const drawSensorB = useCallback(
    (g: graphics) => {
      if (props.sensorData) {
        drawLine(g);
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
