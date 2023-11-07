function MockRangeInput({ min, max, onchange, channel, value }) {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        onChange={(e) => onchange(e.target.value, channel)}
        value={value}
      />
    </div>
  );
}

export default MockRangeInput;
