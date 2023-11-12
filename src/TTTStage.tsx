import { Stage } from "@pixi/react";

function TTTStage({ children }) {
  return (
    <Stage width={500} height={500} options={{ backgroundColor: "#000000" }}>
      {children}
    </Stage>
  );
}

export default TTTStage;
