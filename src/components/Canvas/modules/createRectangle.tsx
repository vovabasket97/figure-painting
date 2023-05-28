import React, { memo, useEffect, useState } from 'react';
import { Circle, Group, Rect, Text } from 'react-konva';
import { Rect as RectType } from 'konva/lib/shapes/Rect';
import { Node, NodeConfig } from 'konva/lib/Node';

const rectParams = {
  stroke: '#00000050',
  strokeWidth: 0.5
};

interface IShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
}

interface IRectangle {
  shapeProps: IShapeProps;
  onSelect: () => void;
}

interface IShapeClientBox extends Omit<IShapeProps, 'rotation' | 'color'> {
  centralX: number;
  centralY: number;
}

export const Rectangle = memo(({ shapeProps, onSelect }: IRectangle) => {
  const shapeRef = React.useRef<RectType>(null);
  const groupRef = React.useRef(null);

  const [shapeClientRect, setShapeClientRect] = useState<IShapeClientBox | null>(null);

  useEffect(() => {
    if (!shapeRef.current || !groupRef.current) return;
    const shapeRefclientRect = shapeRef.current.getClientRect({ relativeTo: groupRef.current as unknown as Node<NodeConfig> });

    setShapeClientRect({
      x: shapeRefclientRect?.x,
      y: shapeRefclientRect?.y,
      width: shapeRefclientRect?.width,
      height: shapeRefclientRect?.height,
      centralX: shapeRefclientRect?.x + shapeRefclientRect?.width / 2,
      centralY: shapeRefclientRect?.y + shapeRefclientRect?.height / 2
    });
  }, [shapeRef]);

  return (
    <Group ref={groupRef} draggable={false}>
      <Rect {...rectParams} {...shapeClientRect} stroke='red' draggable={false} />
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        fill={shapeProps.color}
        {...shapeProps}
        offsetX={shapeProps.width / 2}
        offsetY={shapeProps.height / 2}
        draggable={false}
      />
      {shapeClientRect !== null && (
        <>
          <Text x={shapeClientRect.x} y={shapeClientRect.y} fontSize={17} text={`${Math.round(shapeProps.width)}`} />
          <Text
            x={shapeClientRect.x}
            y={shapeClientRect.y + shapeClientRect.height}
            fontSize={17}
            rotation={-90}
            text={`${Math.round(shapeProps.height)}`}
          />
          <Circle height={15} fill='white' width={15} x={shapeClientRect.centralX} y={shapeClientRect.centralY} />
          <Text
            fill='white'
            x={shapeClientRect.centralX + 10}
            y={shapeClientRect.centralY - 20}
            fontSize={17}
            text={`${shapeProps.rotation}°`}
          />
        </>
      )}
    </Group>
  );
});
