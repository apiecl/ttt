import { useState, useEffect } from "react";

export default function Toggle({ onToggle, name }) {
  const [checked, setChecked] = useState(false);

  const toggleChange = (value) => {
    setChecked(value);
  }

  useEffect(() => {
    onToggle(checked);
  }, [checked])

  return (
    <div>
    <input
      name={name}
      type="checkbox"
      value={false}
      defaultChecked={checked}
      onChange={() => toggleChange(!checked)}
    />
    <label htmlFor={name}>{name}</label>
    </div>
  );
}
