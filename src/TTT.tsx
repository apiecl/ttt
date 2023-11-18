import MockData from "./MockData";
import Pompon from "./Pompon";
import { useState, useEffect } from "react";
import { socket } from "./socket";

import type {
  sensorOutput,
  sensorData,
  sensorNumber,
  variant,
  size,
} from "./types/types";
import TTTStage from "./TTTStage";

function TTT() {
  const initialMax: number = 204;
  const size: size = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onDataReceived(value:sensorOutput) {
      console.log(value);
      setOutput(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('data', onDataReceived);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('data', onDataReceived);
    }
  }, []);

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
    s: sensorNumber,
    c: calibrate,
  });
  const [randomize, setRandomize] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  function detectChange(value: number, channel: number): void {
    const curChannel = channel.toString();
    setSensor({
      ...sensor,
      [curChannel]: value,
    });
  }

  function changeSensor(value: number) {
    setSensorNumber(value);
  }

  function changeCalibrate(value: boolean) {
    setCalibrate(value);
    setCalibrateSensor(calibrateSensor);
  }

  function changeRandom(value: boolean) {
    setRandomize(value);
  }

  function randomInt(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    setOutput({ ...sensor, s: sensorNumber, c: calibrate });
  }, [sensor, calibrate, sensorNumber]);

  //Randomize
  useEffect(() => {
    const tmpSensor: sensorOutput = output;
    if (randomize === true) {
      const timer = setInterval(() => {
        for (let i = 0; i < 12; i++) {
          (tmpSensor as unknown as variant)[i.toString()] = randomInt(
            0,
            initialMax,
          );
        }
        tmpSensor["s"] = randomInt(1, 2);
        tmpSensor["c"] = false;
        setOutput(tmpSensor);
      }, 10);
      return () => clearInterval(timer);
    }
  }, [output, randomize]);

  return (
    <>
      <button
        id="toggleControls"
        onClick={() => setShowControls(!showControls)}
      >
        controls
      </button>
      <div className="main-ttt">
        {showControls && (
          <div className="control-debugger">
            <h2>Sensor {(sensor as unknown as variant)["s"]}</h2>
            <p>Socket connection: {isConnected ? 'OFF' : 'ON'}</p>
            <MockData
              sensor={sensor}
              calibrateSensor={calibrateSensor}
              onchangeValues={detectChange}
              onchangeSensor={changeSensor}
              onchangeCalibration={changeCalibrate}
              onchangeRandom={changeRandom}
            />
            <pre>{JSON.stringify(output)}</pre>
          </div>
        )}
        <TTTStage size={size}>
          <Pompon
            lineWidth={20}
            timeAlive={1000}
            size={size}
            sensorCalibrate={calibrate}
            sensorData={output}
          />
          <Pompon
            lineWidth={4}
            timeAlive={3000}
            size={size}
            sensorCalibrate={calibrate}
            sensorData={output}
          />
        </TTTStage>
      </div>
    </>
  );
}

export default TTT;
