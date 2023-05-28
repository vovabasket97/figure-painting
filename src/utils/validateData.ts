import { IShape } from 'shared/project/projectData.types';

interface IRoutesMap {
  [index: string]: string | string[];
}

const fieldByType: IRoutesMap = {
  id: 'string',
  type: ['rectangle', 'ellipse'],
  color: 'string',
  rotation: 'number',
  x: 'number',
  y: 'number',
  width: 'number',
  height: 'number'
};

export const validateData = (items: IShape[]) => {
  return items.every(item => {
    const value = Object.entries(item).every(([key, value]) => {
      const field = fieldByType[key];
      if (Array.isArray(field)) {
        return field.includes(value);
      } else if (value == 'NaN') {
        return false;
      } else {
        return field == typeof value;
      }
    });

    return value;
  });
};
