import MockData from "./MockData";
import Quilt from "./Quilt";
import Pompon from "./Pompon";
import { useState, useEffect } from "react";
import type { sensorOutput, sensorData, sensorNumber } from "./types/types";
import TTTStage from "./TTTStage";

function TTT() {
  const initialMax: number = 204;
  const size = {
    w: window.innerWidth,
    h: window.innerHeight
  };

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
  const [randomize, setRandomize] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  function detectChange(value, channel) {
    const curChannel = channel.toString();

    setSensor({
      ...sensor,
      [curChannel]: parseInt(value),
    });
  }

  function changeSensor(value) {
    setSensorNumber(value);
  }

  function changeCalibrate(value) {
    setCalibrate(value);
  }

  function changeRandom(value) {
    setRandomize(value);
  }

  function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    setOutput({ ...sensor, s: sensorNumber, c: calibrate });
  }, [sensor, calibrate, sensorNumber]);

  useEffect(() => {
    if(randomize === true) {
      const timer = setInterval(() => {
        const tmpSensor = {};
        for(let i = 0; i < 12; i++) {
          tmpSensor[i.toString()] = randomInt(0, initialMax);
        }
        tmpSensor["s"] = randomInt(1, 2);
        console.log(tmpSensor["s"]);
        tmpSensor["c"] = false;
        setOutput(tmpSensor)
      }, 16.6 );
      return () => clearInterval(timer)
    } else {
      const tmpSensor = {};
      for(let i = 0; i < 12; i++) {
        tmpSensor[i.toString()] = initialMax;
      }
      tmpSensor["s"] = 1;
      tmpSensor["c"] = false;
      setOutput(tmpSensor);
    }
  }, [randomize]);

  return (
    <>
    <button id="toggleControls" onClick={()=> setShowControls(!showControls)}>controls</button>
    <div className="main-ttt">
      {showControls && <div className="control-debugger">
        <h2>Sensor {sensor.s}</h2>
        <MockData
          sensor={sensor}
          calibrateSensor={calibrateSensor}
          onchangeValues={detectChange}
          onchangeSensor={changeSensor}
          onchangeCalibration={changeCalibrate}
          onchangeRandom={changeRandom}
        />
        <pre>{JSON.stringify(output)}</pre>
      </div>}
      
      
      <TTTStage size={size}>
        <Quilt size={size} sensorCalibrate={calibrateSensor} sensorData={output} />
        <Pompon size={size} sensorCalibrate={calibrateSensor} sensorData={output} />
      </TTTStage>
    </div>
    </>
  );
}

export default TTT;
