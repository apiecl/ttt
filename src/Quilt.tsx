import { useCallback } from "react";
import { Graphics } from "@pixi/react";
import { sensorData, size, variant, variantNumber } from "./types/types";

interface quiltProps {
  sensorData: sensorData,
  sensorCalibrate: boolean,
  size: size
}

function Quilt(props:quiltProps) {

  const drawSensorA = useCallback(
    (g: { clear: () => void; beginFill: (arg0: number) => void; drawRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void; }) => {
      if (props.sensorData && (props.sensorData as unknown as variant)["s"] === 1) {
        g.clear();
        g.beginFill(0x4adb71);
        const nsensors = 12;
        const rectsize = props.size.w / nsensors;
        for (let i = 0; i < 12; i++) {
          const barHeight =
            ((props.sensorData as unknown as variantNumber)[i.toString()] * props.size.h) /
            (props.sensorCalibrate as unknown as variantNumber)[i.toString()];
          g.drawRect(rectsize * i, 0, rectsize, barHeight);
        }
      }
    },
    [props.sensorCalibrate, props.sensorData, props.size.h, props.size.w]
  );

  return (
    <>
      <Graphics draw={drawSensorA} />
    </>
  );
}

export default Quilt;
