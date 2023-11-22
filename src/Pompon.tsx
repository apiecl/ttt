import { useCallback, useState, useEffect } from "react";
import { Graphics } from "@pixi/react";
import {
  position,
  sensorData,
  size,
  variant,
  variantNumber,
} from "./types/types";
import { Persistent } from "./Persistent";

interface pomponProps {
  sensorData: sensorData;
  sensorCalibrate: boolean;
  size: size;
  lineWidth: number;
  timeAlive: number;
}

type graphics = {
  clear: () => void;
  lineStyle: (arg0: number, arg1: number, arg2: number) => void;
  moveTo: (arg0: number, arg1: number) => void;
  lineTo: (arg0: number, arg1: number) => void;
};

function Pompon(props: pomponProps) {
  const maxRadius = props.size.h / 2;
  const maxCalibrate = 200;
  const lineWidth = props.lineWidth;
  //Time alive in miliseconds
  const timeAlive = props.timeAlive;
  const nsensors = 12;
  const angleUnit = 360 / nsensors;
  const center = { x: props.size.w / 2, y: props.size.h / 2 };

  const calculateRadius = useCallback(
    (channelData: number) => {
      const unit = maxRadius / maxCalibrate;
      return maxRadius - channelData * unit;
    },
    [maxRadius],
  );

  const [store, setStore] = useState<number>(timeAlive);
  const [points, setPoints] = useState<position[]>();

  useEffect(() => {
    setTimeout(() => {
      if (store > 0) {
        setStore(store - 1);
      } else {
        setStore(timeAlive);
      }
    }, 16.6);
  }, [store, timeAlive]);

  useCallback(
    (g: graphics) => {
      if (store === 0) {
        g.clear();
      }
    },
    [store],
  );

  const drawLine = useCallback(
    (g: graphics, color: number, sensorNo: number) => {
      g.clear();
      const tmpPositions: position[] = [];
      for (let i = 0; i < 12; i++) {
        g.lineStyle(lineWidth, color, store * 0.01);
        g.moveTo(center.x, center.y);
        const sensorValue = (props.sensorData as unknown as variantNumber)[
          i.toString()
        ];
        const calibrateValue = (
          props.sensorCalibrate as unknown as variantNumber
        )[i.toString()];
        if (sensorValue !== calibrateValue) {
          const radius = calculateRadius(sensorValue);
          const angle = angleUnit * i + sensorNo * 5;
          const pointToX = radius * Math.sin(angle);
          const pointToY = radius * Math.cos(angle);

          const posX = radius * Math.sin(angle);
          const posY = radius * Math.cos(angle);
          tmpPositions.push({ x: posX + center.x, y: posY + center.y });
          g.lineTo(pointToX + center.x, pointToY + center.y);
        }
      }
      setPoints(tmpPositions);
    },
    [
      angleUnit,
      calculateRadius,
      center.x,
      center.y,
      lineWidth,
      props.sensorCalibrate,
      props.sensorData,
      store,
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
        <Persistent key={`point-${idx}`} position={point} size={20} />
      ))}
    </>
  );
}

export default Pompon;
