import { useState, useEffect } from "react";

export default function ToggleCalibrate({ onchangeCalibration }) {
  const [checked, setChecked] = useState(false);

  const toggleChange = (value) => {
    setChecked(value);
  }

  useEffect(() => {
    onchangeCalibration(checked);
  }, [checked])

  return (
    <div>
    <input
      name="togglecalibrate"
      type="checkbox"
      value={false}
      defaultChecked={checked}
      onChange={() => toggleChange(!checked)}
    />
    <label htmlFor="togglecalibrate">Toggle calibration</label>
    </div>
  );
}
