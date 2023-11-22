import { baseconfig } from "./conf/baseconfig";
import { useState, useEffect, ReactNode } from "react";
import MockRangeInput from "./mock/MockRangeInput";
import Toggle from "./Toggle.tsx";
import { sensorData, variantNumber } from "./types/types.ts";

interface mockDataProps {
  onchangeValues: (value:number, channel:number) => void;
  onchangeSensor: (value:number) => void;
  onchangeCalibration: (value:boolean) => void;
  sensor: sensorData;
  calibrateSensor: sensorData;
}

export default function MockData(dataProps:mockDataProps) {
  const [rangeInputs, setRangeInputs] = useState<ReactNode[]>();

  useEffect(() => {
    const tmpinputs = [];
    for (let i = 0; i < baseconfig.noChannels; i++) {
      const tmpValue:number = (dataProps.sensor as unknown as variantNumber)[i.toString()];
      tmpinputs.push(
        <MockRangeInput
          key={`channel-${i}`}
          min={0}
          max={209}
          onchange={dataProps.onchangeValues}
          channel={i}
          value={tmpValue}
        />
      );
    }
    setRangeInputs(tmpinputs);
  }, [dataProps.onchangeValues, dataProps.sensor]);

  return (
    <div className="controls">
      {rangeInputs}
      <fieldset>
        Select sensor
        <div>
          <input
            onChange={() => dataProps.onchangeSensor(1)}
            type="radio"
            id="sensor-1"
            name="sensor_number"
            value={1}
          />
          <label htmlFor="1">Sensor 1</label>
        </div>
        <div>
          <input
            onChange={() => dataProps.onchangeSensor(2)}
            type="radio"
            id="sensor-2"
            name="sensor_number"
            value={2}
          />
          <label htmlFor="sensor-2">Sensor 2</label>
        </div>
      </fieldset>
      <div>
        <Toggle name="togglecalibrate" onToggle={dataProps.onchangeCalibration} />
      </div>
    </div>
  );
}
