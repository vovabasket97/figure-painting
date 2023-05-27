interface IProject {
  id: string; // unikatowe id projektu
  name: string; // nazwa projektu
}

interface IShape {
  id: string; // unikatowe id elementu
  type: 'rectange' | 'ellipse'; //typ obiektu
  color: string; // color elementu w formacie '#RRGGBB'
  rotation: number; // kat obrotu elementu [0°, 360°]
  x: number; // wspolrzedna X srodka elementu
  y: number; // wspolrzedna Y srodka elementu
  width: number; // szerokosc elementu (>0)
  height: number; // wysokosc elementu (>0)
}

export interface IProjectBaseData extends IProject {
  modified: number; // timestamp
}

export interface IExtendedProject extends IProject {
  width: number; // szerokosc płotna projektu
  height: number; // wysokosc płotna projektu
  items: IShape[]; // tablica elementów umieszczonych na plotnie
}

export interface IProjectData {
  id: string; //unikatowe id projektu jak podane w parametrach
  project: IExtendedProject;
}
