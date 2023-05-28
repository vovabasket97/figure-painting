import React, { memo, useEffect, useState } from 'react';
import { Group, Rect, Text, Ellipse as EllipseComp, Circle } from 'react-konva';
import { Node, NodeConfig } from 'konva/lib/Node';
import { IShapeClientBox, IShapeComponent } from 'shared/konva/konva.types';
import { Ellipse as EllipseType } from 'konva/lib/shapes/Ellipse';

const rectParams = {
  stroke: '#00000050',
  strokeWidth: 0.5
};

export const Ellipse = memo(({ shapeProps }: IShapeComponent) => {
  const shapeRef = React.useRef<EllipseType>(null);
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
      <EllipseComp
        radiusX={0}
        radiusY={0}
        ref={shapeRef}
        fill={shapeProps.color}
        {...shapeProps}
        width={shapeProps.width}
        height={shapeProps.height}
        // offsetX={shapeProps.width / 2}
        // offsetY={shapeProps.height / 2}
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
