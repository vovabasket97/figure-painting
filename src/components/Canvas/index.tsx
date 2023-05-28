import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

import { Stage, Layer } from 'react-konva';
import { useDetection } from './hooks/useDetection';

import RenderItems from './RenderItems';
import Transformers from './modules/transformers';

import { IShape } from 'shared/project/projectData.types';
import { KonvaEventObject } from 'konva/lib/Node';

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
  const [selectedId, selectShape] = useState(null);
  const [width, setWidth] = React.useState(stageDimensions.width);
  const [height, setHeight] = React.useState(stageDimensions.height);
  const [scale, setScale] = React.useState(1);
  //   const selectedItem = useMemo(() => data.find(el => el.id == selectedId), [selectedId, data]);
  const { checkDeselect } = useDetection();

  const onMouseDownHandler = useCallback((evt: KonvaEventObject<MouseEvent>) => checkDeselect(evt, selectShape), [checkDeselect]);
  const onTouchStart = useCallback((evt: KonvaEventObject<TouchEvent>) => checkDeselect(evt, selectShape), [checkDeselect]);

  useEffect(() => selectShape(null), [data]);

  // useEffect(() => {
  //   const availableWidth = window.innerWidth - 40;
  //   const availableHeight = window.innerHeight - 99;
  //   const dimensionWidth = stageDimensions.width;
  //   const dimensionHeight = stageDimensions.height;

  //   const limitWidth = availableWidth / dimensionWidth < availableHeight / dimensionHeight;
  //   const width = dimensionWidth;
  //   const height = dimensionHeight;
  //   const scale = limitWidth ? availableWidth / dimensionWidth : availableHeight / dimensionHeight;
  //   setScale(scale);
  //   setWidth(width);
  //   setHeight(height);
  // }, [stageDimensions]);

  return (
    <div
      ref={parentRef}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'fit-content'
      }}
    >
      <Stage
        id={canvasId}
        width={width * scale}
        height={height * scale}
        onMouseDown={onMouseDownHandler}
        onTouchStart={onTouchStart}
        ref={stageRef}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer ref={layerRef}>
          <RenderItems data={data} />
        </Layer>
        <Transformers selectedId={selectedId} layer={layerRef} />
      </Stage>
    </div>
  );
};

export default memo(CreateCanvas);
