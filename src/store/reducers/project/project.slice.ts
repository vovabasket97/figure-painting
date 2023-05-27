import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectService } from 'services/project.service';
import { notifications } from '@mantine/notifications';
import { IExtendedProject } from 'shared/project/projectData.types';

interface IInitialState {
  projectId: null | string;
  error: null | string;
  projectData: IExtendedProject | null;
}

export const getProjectId = createAsyncThunk('step1/getProjectId', async (_, thunkAPI) => {
  const req = await ProjectService.getProjectId()
    .then(res => {
      return res.data.id;
    })
    .catch(() => {
      return thunkAPI.rejectWithValue('Something was wrong on getting project id! Try please later.');
    });

  return req;
});

export const getProjectById = createAsyncThunk('step1/getProjectById', async (id: string | number, thunkAPI) => {
  const req = await ProjectService.getProjectByID(id)
    .then(res => {
      return res.data.project;
    })
    .catch(() => {
      return thunkAPI.rejectWithValue('Something was wrong on getting project data! Try please later or another id.');
    });

  return req;
});

const ProjectSlice = createSlice({
  name: 'projects',
  initialState: {
    projectId: null,
    error: null
  } as IInitialState,
  reducers: {},
  extraReducers: builder => {
    // getting project id
    builder.addCase(getProjectId.pending, () => {
      notifications.show({
        id: 'loading-project',
        withCloseButton: false,
        title: 'Loading',
        message: 'Getting project id!',
        loading: true
      });
    });
    builder.addCase(getProjectId.fulfilled, (state, action) => {
      state.projectId = action.payload;
    });
    builder.addCase(getProjectId.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // getting project data by id
    builder.addCase(getProjectById.pending, () => {
      notifications.show({
        id: 'loading-data-by-id',
        withCloseButton: false,
        title: 'Loading',
        message: 'Getting project data!',
        loading: true
      });
    });
    builder.addCase(getProjectById.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
    builder.addCase(getProjectById.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  }
});

export const ProjectSliceActions = ProjectSlice.actions;

export default ProjectSlice.reducer;
