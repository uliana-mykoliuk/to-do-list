import { Task } from "@/types";
import * as types from "./types";
import { Action } from "redux";

export const openEditModalSuccess = (
  task: Task
): Action<string> & {
  payload: { editTask: Task; editModalOpen: boolean };
} => ({
  type: types.OPEN_EDIT_MODAL,
  payload: {
    editTask: task,
    editModalOpen: true,
  },
});

export const closeEditModalSuccess = (): Action<string> & {
  payload: { editTask: null; editModalOpen: boolean };
} => ({
  type: types.CLOSE_EDIT_MODAL,
  payload: {
    editTask: null,
    editModalOpen: false,
  },
});

export const openDeleteModalSuccess = (
  taskId: string
): Action<string> & {
  payload: { deleteTaskId: string; deleteModalOpen: boolean };
} => ({
  type: types.OPEN_DELETE_MODAL,
  payload: {
    deleteTaskId: taskId,
    deleteModalOpen: true,
  },
});

export const closeDeleteModalSuccess = (): Action<string> & {
  payload: { deleteTaskId: null; deleteModalOpen: boolean };
} => ({
  type: types.CLOSE_DELETE_MODAL,
  payload: {
    deleteTaskId: null,
    deleteModalOpen: false,
  },
});
