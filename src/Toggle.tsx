import { useState, useEffect } from "react";

interface toggleProps {
  onToggle: (value:boolean) => void;
  name: string
}

export default function Toggle(props:toggleProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const toggleChange = (value:boolean) => {
    setChecked(value);
  }

  useEffect(() => {
    props.onToggle(checked);
  }, [checked, props])

  return (
    <div>
    <input
      name={props.name}
      type="checkbox"
      value={0}
      defaultChecked={checked}
      onChange={() => toggleChange(!checked)}
    />
    <label htmlFor={props.name}>{props.name}</label>
    </div>
  );
}
