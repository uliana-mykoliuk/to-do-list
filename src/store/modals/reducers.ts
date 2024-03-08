import * as types from "./types";
import { AppThunk } from "@/store/store";
import {
  openEditModalRequest,
  openEditModalSuccess,
  openEditModalFailure,
  closeEditModalRequest,
  closeEditModalSuccess,
  closeEditModalFailure,
  openDeleteModalRequest,
  openDeleteModalSuccess,
  openDeleteModalFailure,
  closeDeleteModalRequest,
  closeDeleteModalSuccess,
  closeDeleteModalFailure,
} from "./actions";
import { Task } from "@/types";

interface ModalState {
  editTask: any | null;
  deleteTaskId: string | null;
  editModalOpen: boolean;
  deleteModalOpen: boolean;
  error: string | null;
  isLoading: boolean;
}

const INITIAL_STATE: ModalState = {
  editTask: null,
  deleteTaskId: null,
  editModalOpen: false,
  deleteModalOpen: false,
  error: null,
  isLoading: false,
};

export const openEditModal =
  (task: Task): AppThunk =>
  async (dispatch) => {
    dispatch(openEditModalRequest());
    try {
      dispatch(openEditModalSuccess(task));
    } catch (error: any) {
      dispatch(openEditModalFailure(error.message));
    }
  };

export const closeEditModal = (): AppThunk => async (dispatch) => {
  dispatch(closeEditModalRequest());
  try {
    dispatch(closeEditModalSuccess());
  } catch (error: any) {
    dispatch(closeEditModalFailure(error.message));
  }
};

export const openDeleteModal =
  (taskId: string): AppThunk =>
  async (dispatch) => {
    dispatch(openDeleteModalRequest());
    try {
      dispatch(openDeleteModalSuccess(taskId));
    } catch (error: any) {
      dispatch(openDeleteModalFailure(error.message));
    }
  };

export const closeDeleteModal = (): AppThunk => async (dispatch) => {
  dispatch(closeDeleteModalRequest());
  try {
    dispatch(closeDeleteModalSuccess());
  } catch (error: any) {
    dispatch(closeDeleteModalFailure(error.message));
  }
};

const modalReducer = (state = INITIAL_STATE, action: any): ModalState => {
  switch (action.type) {
    case types.OPEN_EDIT_MODAL_REQUEST:
    case types.OPEN_DELETE_MODAL_REQUEST:
    case types.CLOSE_EDIT_MODAL_REQUEST:
    case types.CLOSE_DELETE_MODAL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.OPEN_EDIT_MODAL_SUCCESS:
      return {
        ...state,
        editTask: action.payload,
        isLoading: false,
      };
    case types.OPEN_EDIT_MODAL_FAILURE:
    case types.OPEN_DELETE_MODAL_FAILURE:
    case types.CLOSE_EDIT_MODAL_FAILURE:
    case types.CLOSE_DELETE_MODAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.CLOSE_EDIT_MODAL_SUCCESS:
      return {
        ...state,
        editTask: action.payload,
        isLoading: false,
      };
    case types.OPEN_DELETE_MODAL_SUCCESS:
      return {
        ...state,
        deleteTaskId: action.payload,
        isLoading: false,
      };
    case types.CLOSE_DELETE_MODAL_SUCCESS:
      return {
        ...state,
        deleteModalOpen: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
