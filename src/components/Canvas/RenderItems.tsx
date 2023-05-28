import { FC, memo } from 'react';
import { Rectangle } from './modules/createRectangle';
import { Ellipse } from './modules/createEllipse';

import { IShape } from 'shared/project/projectData.types';

interface IItems {
  data: IShape[];
}

const RenderItems: FC<IItems> = ({ data }) => {
  return data.length ? (
    <>
      {data.map(({ type, ...another }, index) => {
        if (type === 'rectangle') {
          return <Rectangle key={another.id} shapeProps={another} />;
        } else if (type === 'ellipse') {
          return <Ellipse key={another.id} shapeProps={another} />;
        }
      })}
    </>
  ) : (
    <div>No elements for render.</div>
  );
};

export default memo(RenderItems);
