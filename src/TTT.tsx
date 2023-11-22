import MockData from "./MockData";
import Pompon from "./Pompon";
import { useState, useEffect } from "react";
//import { socket } from "./socket";
import axios from "axios";

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

  //const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // function onConnect() {
    //   setIsConnected(true);
    // }

    // function onDisconnect() {
    //   setIsConnected(false);
    //   setOutput({...initialValues,s:sensorNumber,c:calibrate});
    // }

    // function onDataReceived(value:sensorOutput) {
    //   setOutput(value);
    // }

    // socket.on('connect', onConnect);
    // socket.on('disconnect', onDisconnect);
    // socket.on('data-processed', onDataReceived);
    // socket.on('data-random', onDataReceived);

    // return () => {
    //   socket.off('connect', onConnect);
    //   socket.off('disconnect', onDisconnect);
    //   socket.off('data-processed', onDataReceived);
    //   socket.off('data-random', onDataReceived);
    // }
    setInterval(() => {
      axios.get('http://localhost:3000').then((res) => {
      setOutput(res.data);
    });
    }, 16.6);
    
  }, []);

  const initialValues:sensorData = {
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
  }

  const [sensor, setSensor] = useState<sensorData>(initialValues);

  const [calibrateSensor, setCalibrateSensor] = useState<sensorData>(initialValues);

  const [calibrate, setCalibrate] = useState<boolean>(false);
  const [sensorNumber, setSensorNumber] = useState<sensorNumber>(1);
  const [output, setOutput] = useState<sensorOutput>({
    ...initialValues,
    s: sensorNumber,
    c: calibrate,
  });
  
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

  useEffect(() => {
    setOutput({ ...sensor, s: sensorNumber, c: calibrate });
  }, [sensor, calibrate, sensorNumber]);



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
            
            <MockData
              sensor={sensor}
              calibrateSensor={calibrateSensor}
              onchangeValues={detectChange}
              onchangeSensor={changeSensor}
              onchangeCalibration={changeCalibrate}
            />
            <pre>{JSON.stringify(output)}</pre>
          </div>
        )}
        <TTTStage size={size}>
          <Pompon
            lineWidth={8}
            timeAlive={1000}
            size={size}
            sensorCalibrate={calibrate}
            sensorData={output}
          />
          <Pompon
            lineWidth={10}
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
