"use client";
import React, { useEffect, useState } from "react";
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
  const tasks = useSelector((state: any) => state.tasks.tasks);
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
      <div className="grid container max-w-[1000px] mx-auto px-[12px] md:px-[24px] py-[24px]">
        <h1 className="text-[32px] font-medium text-center text-[#6528F7]">
          To Do List
        </h1>
        <div className="grid sm:justify-items-center md:justify-items-stretch md:grid-cols-2 gap-y-[16px] items-center mb-[30px]">
          <div className="flex gap-x-[16px] justify-self-center md:justify-self-start">
            <div className="flex items-center">
              Completed tasks: &nbsp;
              <span className="text-[#6528F7] text-[24px]">
                {tasks
                  ? tasks.filter((task: Task) => task.status === "completed")
                      .length
                  : 0}
              </span>
            </div>
            <div className="flex items-center">
              Uncompleted tasks: &nbsp;
              <span className="text-[#6528F7] text-[24px]">
                {tasks
                  ? tasks.filter(
                      (task: Task) => task.status === "not completed"
                    ).length
                  : 0}
              </span>
            </div>
          </div>
          <div className="grid gap-y-[16px] sm:flex sm:items-center md:justify-self-end">
            <Button type="button" onClick={toggleMode} classes="sm:mr-[30px]">
              Switch to {mode === "board" ? "Table" : "Board"} Mode
            </Button>
            <Button type="button" onClick={openModal} classes="">
              + Add task
            </Button>
          </div>
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
