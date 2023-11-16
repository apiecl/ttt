interface mockrangeinputprops {
  min: number,
  max: number,
  onchange: (value:number, channel:number) => void;
  value: number,
  channel: number
}

function MockRangeInput(props:mockrangeinputprops) {
  return (
    <div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        onChange={(e) => props.onchange(parseInt(e.target.value), props.channel)}
        value={props.value}
      />
    </div>
  );
}

export default MockRangeInput;
