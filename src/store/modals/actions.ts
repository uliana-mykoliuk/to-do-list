import { Task } from "@/types";
import * as types from "./types";
import { Action } from "redux";

export const openEditModalSuccess = (
  task: Task
): Action<string> & {
  payload: Task;
} => ({
  type: types.OPEN_EDIT_MODAL,
  payload: task,
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
  payload: string;
} => ({
  type: types.OPEN_DELETE_MODAL,
  payload: taskId,
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
