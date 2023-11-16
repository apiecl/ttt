import MockData from "./MockData";
import Pompon from "./Pompon";
import { useState, useEffect } from "react";
import type { sensorOutput, sensorData, sensorNumber, variant, size } from "./types/types";
import TTTStage from "./TTTStage";

function TTT() {
  const initialMax: number = 204;
  const size:size = {
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
  const [output, setOutput] = useState<sensorOutput>({
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
    "s": sensorNumber,
    "c": calibrate
  });
  const [randomize, setRandomize] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  function detectChange(value:number, channel:number):void {
    const curChannel = channel.toString();
    setSensor({
      ...sensor,
      [curChannel]: value,
    });
  }

  function changeSensor(value:number) {
    setSensorNumber(value);
  }

  function changeCalibrate(value:boolean) {
    setCalibrate(value);
    setCalibrateSensor(calibrateSensor);
  }

  function changeRandom(value:boolean) {
    setRandomize(value);
  }

  function randomInt(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    setOutput({ ...sensor, s: sensorNumber, c: calibrate });
  }, [sensor, calibrate, sensorNumber]);

  //Randomize
  useEffect(() => {
    const tmpSensor:sensorOutput = output;
    if(randomize === true) {
      const timer = setInterval(() => {
       
        for(let i = 0; i < 12; i++) {
          (tmpSensor as unknown as variant)[i.toString()] = randomInt(0, initialMax);
        }
        tmpSensor["s"] = randomInt(1, 2);
        tmpSensor["c"] = false;
        setOutput(tmpSensor)
      }, 10 );
      return () => clearInterval(timer)
    }
  }, [output, randomize]);

  return (
    <>
    <button id="toggleControls" onClick={()=> setShowControls(!showControls)}>controls</button>
    <div className="main-ttt">
      {showControls && <div className="control-debugger">
        <h2>Sensor {(sensor as unknown as variant)["s"]}</h2>
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
        <Pompon size={size} sensorCalibrate={calibrate} sensorData={output} />
      </TTTStage>
      
    </div>
    </>
  );
}

export default TTT;
