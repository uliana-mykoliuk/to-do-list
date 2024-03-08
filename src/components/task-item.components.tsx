import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Dispatch } from "redux";

import { Task } from "@/types";
import { openDeleteModal, openEditModal } from "@/store/modals/reducers";

import MenuIcon from "../assets/menu.svg";
import CloseIcon from "../assets/close.svg";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = () => {
    dispatch(openEditModal(task));
  };

  const handleDeleteClick = () => {
    dispatch(openDeleteModal(task.id));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative grid grid-cols-[1fr_15px] bg-white rounded-[5px] p-[10px] shadow-md">
        <p>{task.task}</p>
        <button type="button" onClick={toggleDropdown} className="">
          <Image src={MenuIcon} alt="Menu" />
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute grid grid-cols-[1fr_20px] gap-x-[5px] items-start right-0 mt-[5px] w-48 bg-white py-[5px] px-[5px] border rounded-md shadow-lg z-[100]"
          >
            <div>
              <button
                className="block px-[10px] py-[5px] text-sm text-gray-700 hover:text-[#6528F7] w-full text-left"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="block px-[10px] py-[5px] text-sm text-red-700 hover:text-red-500 w-full text-left"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
            <button
              type="button"
              onClick={toggleDropdown}
              className="justify-self-end"
            >
              <Image src={CloseIcon} alt="Close" className="w-[20px]" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskItem;
