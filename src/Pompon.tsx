import { useCallback, useState } from "react";
import { Graphics } from "@pixi/react";
import {
  position,
  sensorOutput,
  size,
  variant,
  variantNumber,
} from "./types/types";
import { Persistent } from "./Persistent";
import { calcPos, calcRadius } from "./utils/utils";

interface pomponProps {
  sensorData: sensorOutput;
  sensorCalibrate: sensorOutput;
  size: size;
  lineWidth: number;
}

type graphics = {
  clear: () => void;
  lineStyle: (width: number, color: number, alpha: number) => void;
  moveTo: (x: number, y: number) => void;
  lineTo: (x: number, y: number) => void;
};

function Pompon(props: pomponProps) {
  //Time alive in miliseconds
  const nsensors = 12;
  const angleUnit = 360 / nsensors;
  const center = { x: props.size.w / 2, y: props.size.h / 2 };

  const calculateRadius = useCallback(
    (channelData: number, calValue:number) => {
      return calcRadius(channelData, calValue, props.size.h);
    },
    [props.size.h],
  );


  const [points, setPoints] = useState<position[]>();


  const drawLine = useCallback(
    (g: graphics, color: number, sensorNo: number) => {
      g.clear();
      const tmpPositions: position[] = [];
      for (let i = 0; i < 12; i++) {
        g.lineStyle(props.lineWidth, color, 0.2);
        g.moveTo(center.x, center.y);
        const sensorValue = (props.sensorData as unknown as variantNumber)[
          i.toString()
        ];
        const calibrateValue = (
          props.sensorCalibrate as unknown as variantNumber
        )[i.toString()];
        if (sensorValue !== calibrateValue) {
          const radius = calculateRadius(sensorValue, calibrateValue);
          const angle = angleUnit * i + sensorNo * 5;
          const pointPos = calcPos(radius, angle);
          tmpPositions.push({ x: pointPos.x + center.x, y: pointPos.y + center.y });
          g.lineTo(pointPos.x + center.x, pointPos.y + center.y);
        }
      }
      setPoints(tmpPositions);
    },
    [
      angleUnit,
      calculateRadius,
      center.x,
      center.y,
      props.lineWidth,
      props.sensorCalibrate,
      props.sensorData,
    ],
  );

  const drawSensorA = useCallback(
    (g: graphics) => {
      if (
        props.sensorData &&
        (props.sensorData as unknown as variant)["s"] === 1
      ) {
        drawLine(g, 0xffd900, 1);
      }
    },
    [props.sensorData, drawLine],
  );

  const drawSensorB = useCallback(
    (g: graphics) => {
      if (
        props.sensorData &&
        (props.sensorData as unknown as variant)["s"] === 2
      ) {
        drawLine(g, 0x5f4bb6, 2);
      }
    },
    [props.sensorData, drawLine],
  );

  return (
    <>
      <Graphics draw={drawSensorA}></Graphics>
      <Graphics draw={drawSensorB}></Graphics>
      {points?.map((point, idx) => (
        <Persistent key={`point-${idx}`} position={point} size={5} />
      ))}
    </>
  );
}

export default Pompon;
