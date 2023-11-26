import { ReactNode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TTT } from "./TTT";
import type { sensorOutput } from "./types/types";
import { io } from "socket.io-client";

export function TTTConnect(): ReactNode {
  const socket = true;

  const initialMax: number = 204;


  const initialValues = useMemo(() => {
    const initialValues: sensorOutput = {
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
      s: 1,
      c: false,
    };
    return initialValues;
  }, [initialMax]);
  

  const [calValues, setCalValues] = useState<sensorOutput>({
    ...initialValues,
  });
  const [output, setOutput] = useState<sensorOutput>({
    ...initialValues,
  });
  const [oldOutput, setOldOutput] = useState<sensorOutput>({
    ...initialValues,
  });

  const [oldOutputs, setOldOutputs] = useState<sensorOutput[]>([{...initialValues}]);

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
      setOldOutput(output);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds])

  useEffect(() => {
    console.log(oldOutputs.length);
    if(oldOutputs.length < 20) {
      setOldOutputs(oldOutputs => [...oldOutputs,oldOutput]);
    } else {
      setOldOutputs([{...initialValues}]);
    }
  }, [initialValues,output]);

  useEffect(() => {
    if (!socket) {
      setInterval(() => {
        axios.get("http://localhost:3000").then((res) => {
          if (res.data.c === true) {
            setCalValues(res.data);
          } else {
            setOutput(res.data);
          }
        });
      }, 33.3);
    } else {
        console.log('client socket');
        const clientsocket = io('http://localhost:3000');
        clientsocket.on('data-parsed', (data) => {
            setOutput(data);
        });
    }
  }, [socket]);

  return (
    <TTT calValues={calValues} output={output} oldOutput={oldOutput} oldOutputs={oldOutputs}></TTT>
  );
}
