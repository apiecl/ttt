import MockData from "./MockData";
import Quilt from "./Quilt";
import { useState, useEffect } from "react";

function TTT() {
  const [sensor, setSensor] = useState<sensorData>({
    "0": 100,
    "1": 100,
    "2": 100,
    "3": 100,
    "4": 100,
    "5": 100,
    "6": 100,
    "7": 100,
    "8": 100,
    "9": 100,
    "10": 100,
    "11": 100,
    s: 1,
    c: false,
  });

  function detectChange(value, channel) {
    const curChannel = channel.toString();

    setSensor({
      ...sensor,
      [curChannel]: parseInt(value),
    });
  }

  function changeSensor(value) {
    console.log(value);
    setSensor({
      ...sensor,
      s: value,
    });
  }

  function changeCalibrate(value) {
    console.log(value);
    setSensor({
      ...sensor,
      c: value,
    });
  }

  return (
    <div className="main-ttt">
      <div className="control-debugger">
        <h2>Sensor {sensor.s}</h2>
        <MockData
          sensor={sensor}
          onchangeValues={detectChange}
          onchangeSensor={changeSensor}
          onchangeCalibration={changeCalibrate}
        />
        <pre>{JSON.stringify(sensor)}</pre>
      </div>
      
      <Quilt sensorData={sensor} />
    </div>
  );
}

export default TTT;
