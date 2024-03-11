import { v4 as uuidv4 } from "uuid";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { Task } from "@/types";
import {
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  editTaskRequest,
  editTaskSuccess,
  editTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  updateTaskStatusRequest,
  updateTaskStatusSuccess,
  updateTaskStatusFailure,
} from "./actions";
import * as types from "./types";
import { INITIAL_TASKS } from "@/constants";

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: TasksState = {
  tasks: INITIAL_TASKS,
  isLoading: false,
  error: null,
};

export const addTask =
  (task: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(addTaskRequest());

      const newTask: Task = {
        id: uuidv4(),
        task,
        status: "not completed",
      };

      dispatch(addTaskSuccess(newTask));
    } catch (error: any) {
      dispatch(addTaskFailure(error.message));
    }
  };

export const editTask =
  (
    taskId: string,
    updatedTask: Task
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch) => {
    dispatch(editTaskRequest());
    try {
      dispatch(editTaskSuccess(taskId, updatedTask));
    } catch (error: any) {
      dispatch(editTaskFailure(error.message));
    }
  };

export const deleteTask =
  (taskId: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch) => {
    dispatch(deleteTaskRequest());
    try {
      dispatch(deleteTaskSuccess(taskId));
    } catch (error: any) {
      dispatch(deleteTaskFailure(error.message));
    }
  };

export const updateTaskStatus =
  (
    taskId: string,
    newStatus: string
  ): ThunkAction<void, RootState, null, Action<string>> =>
  (dispatch) => {
    dispatch(updateTaskStatusRequest(taskId, newStatus));
    try {
      const updatedTask: Task = {
        id: taskId,
        status: newStatus,
      };
      dispatch(updateTaskStatusSuccess(updatedTask));
    } catch (error: any) {
      dispatch(updateTaskStatusFailure(error.message));
    }
  };

const tasksReducer = (state = INITIAL_STATE, action: any): TasksState => {
  switch (action.type) {
    case types.ADD_TASK_REQUEST:
    case types.EDIT_TASK_REQUEST:
    case types.DELETE_TASK_REQUEST:
    case types.UPDATE_TASK_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.UPDATE_TASK_STATUS_SUCCESS:
      const updatedTask: Task = action.payload.task;
      const updatedTasks: Task[] = state.tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        isLoading: false,
        error: null,
      };
    case types.UPDATE_TASK_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case types.ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: false,
      };
    case types.EDIT_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId ? action.payload.updatedTask : task
        ),
        isLoading: false,
      };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        isLoading: false,
      };
    case types.ADD_TASK_FAILURE:
    case types.EDIT_TASK_FAILURE:
    case types.DELETE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;
