import React, { useEffect, useRef, useCallback, memo } from 'react';

import { Stage, Layer } from 'react-konva';

import RenderItems from './RenderItems';

import { IShape } from 'shared/project/projectData.types';
import { useWindowEvent } from '@mantine/hooks';

interface ICanvas {
  data: IShape[];
  canvasId: string;
  stageDimensions: {
    width: number;
    height: number;
  };
}

const CreateCanvas = ({ data, canvasId, stageDimensions }: ICanvas) => {
  const parentRef = useRef(null);
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const [width, setWidth] = React.useState(300);
  const [height, setHeight] = React.useState(300);
  const [scale, setScale] = React.useState(1);

  const reponsiveFunc = useCallback(() => {
    const availableWidth = window.innerWidth - 40;
    const availableHeight = window.innerHeight - 99;
    const dimensionWidth = stageDimensions.width;
    const dimensionHeight = stageDimensions.height;

    const limitWidth = availableWidth / dimensionWidth < availableHeight / dimensionHeight;
    const width = dimensionWidth;
    const height = dimensionHeight;
    const scale = limitWidth ? availableWidth / dimensionWidth : availableHeight / dimensionHeight;
    setScale(scale);
    setWidth(width);
    setHeight(height);
  }, []);

  useEffect(() => {
    reponsiveFunc();
  }, [stageDimensions, canvasId]);

  useWindowEvent('resize', reponsiveFunc);

  return (
    <div
      ref={parentRef}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
        border: '1px solid black'
      }}
    >
      <Stage id={canvasId} width={width * scale} height={height * scale} ref={stageRef} scaleX={scale} scaleY={scale}>
        <Layer ref={layerRef}>
          <RenderItems data={data} />
        </Layer>
      </Stage>
    </div>
  );
};

export default memo(CreateCanvas);
