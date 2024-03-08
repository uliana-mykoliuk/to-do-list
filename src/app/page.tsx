"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";

import BoardSectionList from "@/components/board-list-section.components";
import Modal from "@/components/modal.component";
import TaskForm from "@/components/task-form.components";
import Button from "@/components/button.components";
import TableView from "@/components/table-view.components";

import store from "@/store/store";
import { addTask, deleteTask, editTask } from "@/store/tasks/reducers";
import { closeDeleteModal, closeEditModal } from "@/store/modals/reducers";
import { Task } from "@/types";
import { Dispatch } from "redux";

function AppContainer() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"table" | "board">("table");
  const isEditModalOpen = useSelector(
    (state: any) => state.modals.editModalOpen
  );
  const taskToUpdate = useSelector(
    (state: any) => state.modals.editTask
  ) as Task | null;
  const isDeleteModalOpen = useSelector(
    (state: any) => state.modals.deleteModalOpen
  );
  const deleteTaskId = useSelector((state: any) => state.modals.deleteTaskId);
  const dispatch: Dispatch<any> = useDispatch();

  const closeEdit = () => {
    dispatch(closeEditModal());
  };

  const closeDelete = () => {
    dispatch(closeDeleteModal());
  };

  const handleSubmit = (values: { message: string }) => {
    dispatch(addTask(values.message));
    setIsModalOpen(false);
  };

  const handleEditSubmit = (values: { message: string }) => {
    if (taskToUpdate) {
      dispatch(
        editTask(taskToUpdate.id, { ...taskToUpdate, task: values.message })
      );
      closeEdit();
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(deleteTaskId));
    closeDelete();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "board" ? "table" : "board"));
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add Task">
        <TaskForm onSubmit={handleSubmit} onClose={closeModal} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={closeEdit} title="Edit Task">
        <TaskForm
          onSubmit={handleEditSubmit}
          title={taskToUpdate?.task || ""}
          onClose={closeEdit}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDelete}
        title="Delete Task"
      >
        <p>Are you sure you want to delete this task?</p>
        <div className="grid grid-cols-2 gap-x-[15px]">
          <Button type="button" variant="secondary" onClick={closeDelete}>
            Cancel
          </Button>
          <Button type="button" onClick={handleDelete}>
            Yes
          </Button>
        </div>
      </Modal>
      <div className="grid container max-w-[1000px] mx-auto">
        <div className="flex items-center justify-end">
          <Button type="button" onClick={toggleMode} classes="mr-[30px]">
            Switch to {mode === "board" ? "Table" : "Board"} Mode
          </Button>
          <Button
            type="button"
            onClick={openModal}
            classes="justify-self-end my-[30px]"
          >
            + Add task
          </Button>
        </div>
        {mode === "board" ? <BoardSectionList /> : <TableView />}
      </div>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
