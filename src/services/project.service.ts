import axios from 'axios';
import { IProjectBaseData, IProjectData } from 'shared/project/projectData.types';

export const axiosClassic = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const ProjectService = {
  async getProjectId() {
    return axiosClassic.get<IProjectBaseData>('/init');
  },
  async getProjectByID(id: string | number) {
    return axiosClassic.get<IProjectData>('/project/' + id);
  }
};
