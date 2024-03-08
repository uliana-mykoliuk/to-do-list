import { Task } from "@/types";
import * as types from "./types";
import { Action } from "redux";

interface ErrorPayload {
  message: string;
}

export const openEditModalRequest = (): Action<string> => ({
  type: types.OPEN_EDIT_MODAL_REQUEST,
});

export const openEditModalSuccess = (
  task: Task
): Action<string> & {
  payload: { editTask: Task; editModalOpen: boolean };
} => ({
  type: types.OPEN_EDIT_MODAL_SUCCESS,
  payload: {
    editTask: task,
    editModalOpen: true,
  },
});

export const openEditModalFailure = (
  error: ErrorPayload
): Action<string> & { payload: ErrorPayload } => ({
  type: types.OPEN_EDIT_MODAL_FAILURE,
  payload: error,
});

export const closeEditModalRequest = (): Action<string> => ({
  type: types.CLOSE_EDIT_MODAL_REQUEST,
});

export const closeEditModalSuccess = (): Action<string> & {
  payload: { editTask: null; editModalOpen: boolean };
} => ({
  type: types.CLOSE_EDIT_MODAL_SUCCESS,
  payload: {
    editTask: null,
    editModalOpen: false,
  },
});

export const closeEditModalFailure = (
  error: ErrorPayload
): Action<string> & { payload: ErrorPayload } => ({
  type: types.CLOSE_EDIT_MODAL_FAILURE,
  payload: error,
});

export const openDeleteModalRequest = (): Action<string> => ({
  type: types.OPEN_DELETE_MODAL_REQUEST,
});

export const openDeleteModalSuccess = (
  taskId: string
): Action<string> & {
  payload: { deleteTaskId: string; deleteModalOpen: boolean };
} => ({
  type: types.OPEN_DELETE_MODAL_SUCCESS,
  payload: {
    deleteTaskId: taskId,
    deleteModalOpen: true,
  },
});

export const openDeleteModalFailure = (
  error: ErrorPayload
): Action<string> & { payload: ErrorPayload } => ({
  type: types.OPEN_DELETE_MODAL_FAILURE,
  payload: error,
});

export const closeDeleteModalRequest = (): Action<string> => ({
  type: types.CLOSE_DELETE_MODAL_REQUEST,
});

export const closeDeleteModalSuccess = (): Action<string> & {
  payload: { deleteTaskId: null; deleteModalOpen: boolean };
} => ({
  type: types.CLOSE_DELETE_MODAL_SUCCESS,
  payload: {
    deleteTaskId: null,
    deleteModalOpen: false,
  },
});

export const closeDeleteModalFailure = (
  error: ErrorPayload
): Action<string> & { payload: ErrorPayload } => ({
  type: types.CLOSE_DELETE_MODAL_FAILURE,
  payload: error,
});
