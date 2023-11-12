import { Stage } from "@pixi/react";

function TTTStage({ children, size }) {
  return (
    <Stage width={size.w} height={size.h} options={{ backgroundColor: 0x000000 }}>
      {children}
    </Stage>
  );
}

export default TTTStage;
