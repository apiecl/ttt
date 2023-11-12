import MockData from "./MockData";
import Quilt from "./Quilt";
import Pompon from "./Pompon";
import { useState, useEffect } from "react";
import type { sensorOutput, sensorData, sensorNumber } from "./types/types";
import TTTStage from "./TTTStage";

function TTT() {
  const initialMax: number = 204;

  const [sensor, setSensor] = useState<sensorData>({
    "0": initialMax,
    "1": initialMax,
    "2": initialMax,
    "3": initialMax,
    "4": initialMax,
    "5": initialMax,
    "6": initialMax,
    "7": initialMax,
    "8": initialMax,
    "9": initialMax,
    "10": initialMax,
    "11": initialMax,
  });

  const [calibrateSensor, setCalibrateSensor] = useState<sensorData>({
    "0": initialMax,
    "1": initialMax,
    "2": initialMax,
    "3": initialMax,
    "4": initialMax,
    "5": initialMax,
    "6": initialMax,
    "7": initialMax,
    "8": initialMax,
    "9": initialMax,
    "10": initialMax,
    "11": initialMax,
  });

  const [calibrate, setCalibrate] = useState<boolean>(false);
  const [sensorNumber, setSensorNumber] = useState<sensorNumber>(1);
  const [output, setOutput] = useState<sensorOutput>();

  function detectChange(value, channel) {
    const curChannel = channel.toString();

    setSensor({
      ...sensor,
      [curChannel]: parseInt(value),
    });
  }

  function changeSensor(value) {
    console.log(value);
    setSensorNumber(value);
  }

  function changeCalibrate(value) {
    console.log(value);
    setCalibrate(value);
  }

  useEffect(() => {
    setOutput({ ...sensor, s: sensorNumber, c: calibrate });
  }, [sensor, calibrate, sensorNumber]);

  return (
    <div className="main-ttt">
      <div className="control-debugger">
        <h2>Sensor {sensor.s}</h2>
        <MockData
          sensor={sensor}
          calibrateSensor={calibrateSensor}
          onchangeValues={detectChange}
          onchangeSensor={changeSensor}
          onchangeCalibration={changeCalibrate}
        />
        <pre>{JSON.stringify(output)}</pre>
      </div>

      <TTTStage>
        <Pompon sensorCalibrate={calibrateSensor} sensorData={output} />
      </TTTStage>
    </div>
  );
}

export default TTT;
