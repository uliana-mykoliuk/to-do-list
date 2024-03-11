import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { BOARD_SECTIONS } from "@/constants";
import { openDeleteModal, openEditModal } from "@/store/modals/reducers";
import { updateTaskStatus } from "@/store/tasks/reducers";

import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/delete.svg";
import { Dispatch } from "redux";
import { Task } from "@/types";

const TableView: React.FC = () => {
  const tasks: Task[] = useSelector((state: any) => state.tasks.tasks);
  const [shownTasks, setShownTasks] = useState<Task[]>(tasks);
  const [status, setStatus] = useState<string>("all");
  const dispatch: Dispatch<any> = useDispatch();

  const handleFilterByStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setStatus(status);
  };

  const handleChangeStatus = (
    e: React.ChangeEvent<HTMLSelectElement>,
    task: Task
  ) => {
    const status = e.target.value as string;
    dispatch(updateTaskStatus(task.id, status));
  };

  const handleEdit = (task: Task) => {
    dispatch(openEditModal(task));
  };

  const handleDelete = (taskId: string) => {
    dispatch(openDeleteModal(taskId));
  };

  useEffect(() => {
    if (tasks) {
      switch (status) {
        case BOARD_SECTIONS["not completed"]:
          setShownTasks(
            tasks.filter(
              (task) => task.status === BOARD_SECTIONS["not completed"]
            )
          );
          break;
        case BOARD_SECTIONS["in progress"]:
          setShownTasks(
            tasks.filter(
              (task) => task.status === BOARD_SECTIONS["in progress"]
            )
          );
          break;
        case BOARD_SECTIONS["completed"]:
          setShownTasks(
            tasks.filter((task) => task.status === BOARD_SECTIONS["completed"])
          );
          break;
        case "all":
        default:
          setShownTasks(tasks);
      }
    }
  }, [tasks, status]);

  return (
    <div className="table-view">
      <table className="rounded-[5px] bg-[#EDE4FF] min-h-[60vh] w-full">
        <thead>
          <tr className="grid grid-cols-[1fr_205px_63px] gap-x-[30px] px-[16px] py-[8px]">
            <th className="text-start">Task</th>
            <th className="text-start">
              <span>Status &nbsp;</span>
              <select
                value={status}
                onChange={(e) => handleFilterByStatus(e)}
                className="capitalize"
              >
                <option value={"all"}>All</option>
                {Object.entries(BOARD_SECTIONS).map(([key, value]) => (
                  <option key={key} value={key} className="capitalize">
                    {value}
                  </option>
                ))}
              </select>
            </th>
            <th className="text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shownTasks && shownTasks.length > 0 ? (
            shownTasks.map((task) => (
              <tr
                className="bg-white rounded-[5px] grid grid-cols-[1fr_205px_63px] gap-x-[30px] px-[10px] py-[8px] my-[5px] mx-[6px]"
                key={task.id}
              >
                <td>{task.task}</td>
                <td className="justify-self-end">
                  <select
                    value={task.status}
                    onChange={(e) => handleChangeStatus(e, task)}
                    className="capitalize"
                  >
                    {Object.entries(BOARD_SECTIONS).map(([key, value]) => (
                      <option key={key} value={key} className="capitalize">
                        {value}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="grid grid-cols-2 gap-x-[15px] justify-self-end">
                  <button onClick={() => handleEdit(task)}>
                    <Image src={EditIcon} alt="" />
                  </button>
                  <button onClick={() => handleDelete(task.id)}>
                    <Image src={DeleteIcon} alt="" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center my-auto">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
