import { sensorData } from "./types/types";
import { baseconfig } from "./conf/baseconfig";
import { useState, useEffect } from "react";
import MockRangeInput from "./mock/MockRangeInput";
import ToggleCalibrate from "./ToggleCalibrate.tsx";

export default function MockData({
  onchangeValues,
  onchangeSensor,
  onchangeCalibration,
  sensor,
}) {
  const [mockData, setMockData] = useState<sensorData>();
  const [rangeInputs, setRangeInputs] = useState<MockRangeInput[]>();

  useEffect(() => {
    const tmpinputs = [];
    for (let i = 0; i < baseconfig.noChannels; i++) {
      tmpinputs.push(
        <MockRangeInput
          key={`channel-${i}`}
          min={0}
          max={209}
          onchange={onchangeValues}
          channel={i}
          value={sensor[i.toString()]}
        />
      );
    }
    setRangeInputs(tmpinputs);
  }, [onchangeValues]);

  return (
    <div className="controls">
      {rangeInputs}
      <fieldset>
        Select sensor
        <div>
          <input
            onChange={() => onchangeSensor(1)}
            type="radio"
            id="sensor-1"
            name="sensor_number"
            value={1}
          />
          <label htmlFor="1">Sensor 1</label>
        </div>
        <div>
          <input
            onChange={() => onchangeSensor(2)}
            type="radio"
            id="sensor-2"
            name="sensor_number"
            value={2}
          />
          <label htmlFor="sensor-2">Sensor 2</label>
        </div>
      </fieldset>
      <div>
        <ToggleCalibrate onchangeCalibration={onchangeCalibration} />
      </div>
    </div>
  );
}
