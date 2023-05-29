import React, { useEffect, useRef, useCallback, memo } from 'react';

import { Stage, Layer } from 'react-konva';

import RenderItems from './RenderItems';

import { IShape } from 'shared/project/projectData.types';
import { useWindowEvent } from '@mantine/hooks';
import { Layer as LayerType } from 'konva/lib/Layer';
import { Stage as StageType } from 'konva/lib/Stage';

interface ICanvas {
  data: IShape[];
  canvasId: string;
  stageDimensions: {
    width: number;
    height: number;
  };
}

const CreateCanvas = ({ data, canvasId, stageDimensions }: ICanvas) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<LayerType>(null);
  const [width, setWidth] = React.useState(300);
  const [height, setHeight] = React.useState(300);
  const [scale, setScale] = React.useState(1);

  const reponsiveFunc = useCallback(() => {
    const availableWidth = window.screen.width - 40;
    const availableHeight = window.screen.height - 99;

    setWidth(availableWidth);
    setHeight(availableHeight);
    setScale(Math.min(availableWidth / stageDimensions.width, availableHeight / stageDimensions.height));
  }, [stageDimensions, window.innerWidth, window.innerHeight]);

  useEffect(() => {
    reponsiveFunc();
  }, [stageDimensions, canvasId]);

  useWindowEvent('resize', reponsiveFunc);
  useWindowEvent('orientationchange', reponsiveFunc);

  return (
    <div
      ref={parentRef}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content',
        border: '1px solid black',
        maxWidth: '100%'
      }}
    >
      <Stage id={canvasId} width={width} height={height} ref={stageRef} scaleX={scale} scaleY={scale}>
        <Layer ref={layerRef}>
          <RenderItems data={data} />
        </Layer>
      </Stage>
    </div>
  );
};

export default memo(CreateCanvas);
