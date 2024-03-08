import { Task } from "@/types";
import { Action } from "redux";
import * as types from "./types";

interface ErrorPayload {
  message: string;
}

export const addTaskRequest = (): Action<string> => ({
  type: types.ADD_TASK_REQUEST,
});

export const addTaskSuccess = (
  task: Task
): Action<string> & { payload: Task } => ({
  type: types.ADD_TASK_SUCCESS,
  payload: task,
});

export const addTaskFailure = (
  error: ErrorPayload
): Action<string> & { payload: ErrorPayload } => ({
  type: types.ADD_TASK_FAILURE,
  payload: error,
});

export const editTaskRequest = (): Action<string> => ({
  type: types.EDIT_TASK_REQUEST,
});

export const editTaskSuccess = (
  taskId: string,
  updatedTask: Task
): Action<string> & { payload: { taskId: string; updatedTask: Task } } => ({
  type: types.EDIT_TASK_SUCCESS,
  payload: { taskId, updatedTask },
});

export const editTaskFailure = (
  error: ErrorPayload
): Action<string> & { payload: ErrorPayload } => ({
  type: types.EDIT_TASK_FAILURE,
  payload: error,
});

export const deleteTaskRequest = (): Action<string> => ({
  type: types.DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (
  taskId: string
): Action<string> & { payload: string } => ({
  type: types.DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const deleteTaskFailure = (
  error: ErrorPayload
): Action<string> & { payload: ErrorPayload } => ({
  type: types.DELETE_TASK_FAILURE,
  payload: error,
});

export const updateTaskStatusRequest = (
  taskId: string,
  newStatus: string
): Action<string> & { payload: { taskId: string; newStatus: string } } => ({
  type: types.UPDATE_TASK_STATUS_REQUEST,
  payload: {
    taskId,
    newStatus,
  },
});

export const updateTaskStatusSuccess = (
  task: Task
): Action<string> & { payload: { task: Task } } => ({
  type: types.UPDATE_TASK_STATUS_SUCCESS,
  payload: {
    task,
  },
});

export const updateTaskStatusFailure = (
  error: ErrorPayload
): Action<string> & { payload: { error: ErrorPayload } } => ({
  type: types.UPDATE_TASK_STATUS_FAILURE,
  payload: {
    error,
  },
});
