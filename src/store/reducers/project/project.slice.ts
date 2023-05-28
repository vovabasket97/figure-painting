import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectService } from 'services/project.service';
import { notifications } from '@mantine/notifications';
import { IExtendedProject, IProjectData } from 'shared/project/projectData.types';
import { notificationConfig } from 'config/notification';
import { validateData } from 'utils/validateData';

interface IInitialState {
  projectId: null | string;
  error: null | string;
  projectData: IExtendedProject | null;
}

const message = 'Something was wrong on getting project id! Try please later.';

export const getProjectId = createAsyncThunk('step1/getProjectId', async (_, thunkAPI): Promise<string> => {
  return await ProjectService.getProjectId()
    .then(res => {
      return res.data.id;
    })
    .catch(() => {
      thunkAPI.rejectWithValue(message);
      return message;
    });
});

export const getProjectById = createAsyncThunk('step1/getProjectById', async (id: string | number, thunkAPI) => {
  return await new Promise<IProjectData>((resolve, req) => {
    ProjectService.getProjectByID(id)
      .then(res => {
        const check = validateData(res.data.project.items);

        if (!check) req(message);

        resolve(res.data);
      })
      .catch(() => {
        req(message);
      });
  })
    .then(res => {
      return thunkAPI.fulfillWithValue(res.project);
    })
    .catch(() => {
      return thunkAPI.rejectWithValue(message);
    });
});

const ProjectSlice = createSlice({
  name: 'projects',
  initialState: {
    projectId: null,
    error: null,
    projectData: null
  } as IInitialState,
  reducers: {},
  extraReducers: builder => {
    // getting project id
    builder.addCase(getProjectId.pending, () => {
      notifications.show(
        notificationConfig.pending({
          id: 'loading-project',
          message: 'Getting project id!'
        })
      );
    });
    builder.addCase(getProjectId.fulfilled, (state, action) => {
      state.projectId = action.payload;
      notifications.update(
        notificationConfig.success({
          id: 'loading-project',
          message: 'Project Id has been get!'
        })
      );
    });
    builder.addCase(getProjectId.rejected, (state, action) => {
      state.error = action.payload as string;
      notifications.update(
        notificationConfig.error({
          id: 'loading-project',
          message: 'Please, try another time.'
        })
      );
    });

    // getting project data by id
    builder.addCase(getProjectById.pending, () => {
      notifications.show(
        notificationConfig.pending({
          id: 'loading-data-by-id',
          message: 'Getting project data!'
        })
      );
    });
    builder.addCase(getProjectById.fulfilled, (state, action) => {
      state.projectData = action.payload as IExtendedProject;
      state.projectId = state.projectData.id;
      notifications.update(
        notificationConfig.success({
          id: 'loading-data-by-id',
          message: 'Let me a one moment for generate image'
        })
      );
    });
    builder.addCase(getProjectById.rejected, (state, action) => {
      state.error = action.payload as string;
      notifications.update(
        notificationConfig.error({
          id: 'loading-data-by-id',
          message: 'Please, try another time. Or another Id.'
        })
      );
    });
  }
});

export const ProjectSliceActions = ProjectSlice.actions;

export default ProjectSlice.reducer;
