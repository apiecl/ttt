import { ReactNode, useEffect, useMemo, useState } from "react";
import { TTT } from "./TTT";
import type { sensorOutput } from "./types/types";
import { io } from "socket.io-client";
import { baseconfig } from "./conf/baseconfig";

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

  const [oldOutputs, setOldOutputs] = useState<sensorOutput[]>([
    { ...initialValues },
  ]);

  const [seconds, setSeconds] = useState(0);

  const [debug, setDebug] = useState<boolean>(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setOldOutput(output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    if (oldOutputs.length < baseconfig.noStore) {
      setOldOutputs((oldOutputs) => [oldOutput, ...oldOutputs]);
    } else {
      setOldOutputs([{ ...initialValues }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, output]);

  useEffect(() => {
      console.log("connecting client socket");
      const clientsocket = io("http://localhost:3000");
      clientsocket.on("data-parsed", (data) => {
        if(data.c === true) {
          setCalValues(data);
        } else {
          setOutput(data);
        }
      });
      clientsocket.on('data-debug', (data) => {
        setDebug(data);
      });
  }, [socket]);

  return (
    <>
      <TTT
        calValues={calValues}
        output={output}
        oldOutput={oldOutput}
        oldOutputs={oldOutputs}
      ></TTT>
      {debug === true && (
        <div className="debuginfo">
          {JSON.stringify(output)} - (storing {oldOutputs.length} values)
        </div>
      )}
    </>
  );
}
