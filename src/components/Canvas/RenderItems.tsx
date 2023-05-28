import { IShape } from 'shared/project/projectData.types';
import { Rectangle } from './modules/createRectangle';
import { FC } from 'react';

interface IItems {
  data: IShape[];
}

const RenderItems: FC<IItems> = ({ data }) => {
  return data.length ? (
    <>
      {data
        .filter(el => el.type === 'rectangle')
        .map(({ type, ...another }, index) => {
          if (index !== 0) return;
          if (type === 'rectangle') {
            return <Rectangle key={another.id} shapeProps={another} onSelect={() => {}} />;
          } else return null;
        })}
    </>
  ) : (
    <div>No elements for render.</div>
  );
};

export default RenderItems;
