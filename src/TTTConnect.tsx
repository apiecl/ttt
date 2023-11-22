import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { TTT } from "./TTT";
import type { sensorOutput } from "./types/types";

export function TTTConnect(): ReactNode {
  const conntype = "fetch";

  const initialMax: number = 204;

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

  const [calValues, setCalValues] = useState<sensorOutput>({
    ...initialValues,
  });
  const [output, setOutput] = useState<sensorOutput>({
    ...initialValues,
  });
  const [oldOutput, setOldOutput] = useState<sensorOutput>({
    ...initialValues,
  });

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
    if (conntype === "fetch") {
      setInterval(() => {
        axios.get("http://localhost:3000").then((res) => {
          if (res.data.c === true) {
            setCalValues(res.data);
          } else {
            setOutput(res.data);
          }
        });
      }, 33.3);
    }
  }, [conntype]);

  return (
    <TTT calValues={calValues} output={output} oldOutput={oldOutput}></TTT>
  );
}
