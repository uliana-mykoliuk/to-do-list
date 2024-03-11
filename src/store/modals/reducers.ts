import * as types from "./types";
import { AppThunk } from "@/store/store";
import {
  openEditModalSuccess,
  closeEditModalSuccess,
  openDeleteModalSuccess,
  closeDeleteModalSuccess,
} from "./actions";
import { Task } from "@/types";

interface ModalState {
  editTask: any | null;
  deleteTaskId: string | null;
  editModalOpen: boolean;
  deleteModalOpen: boolean;
}

const INITIAL_STATE: ModalState = {
  editTask: null,
  deleteTaskId: null,
  editModalOpen: false,
  deleteModalOpen: false,
};

export const openEditModal =
  (task: Task): AppThunk =>
  (dispatch) => {
    dispatch(openEditModalSuccess(task));
  };

export const closeEditModal = (): AppThunk => (dispatch) => {
  dispatch(closeEditModalSuccess());
};

export const openDeleteModal =
  (taskId: string): AppThunk =>
  (dispatch) => {
    dispatch(openDeleteModalSuccess(taskId));
  };

export const closeDeleteModal = (): AppThunk => (dispatch) => {
  dispatch(closeDeleteModalSuccess());
};

const modalReducer = (state = INITIAL_STATE, action: any): ModalState => {
  switch (action.type) {
    case types.OPEN_EDIT_MODAL:
      return {
        ...state,
        editTask: action.payload,
        editModalOpen: true,
      };
    case types.CLOSE_EDIT_MODAL:
      return {
        ...state,
        editTask: null,
        editModalOpen: false,
      };
    case types.OPEN_DELETE_MODAL:
      return {
        ...state,
        deleteTaskId: action.payload,
        deleteModalOpen: true,
      };
    case types.CLOSE_DELETE_MODAL:
      return {
        ...state,
        deleteTaskId: null,
        deleteModalOpen: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
