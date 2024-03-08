import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import {
  useSensors,
  useSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
  MouseSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import BoardSection from "./board-section.component";
import TaskItem from "./task-item.components";
import { BoardSections, Status, Task } from "../types";
import { getTaskById } from "@/utils/tasks";
import { findBoardSectionContainer, initializeBoard } from "../utils/board";
import { updateTaskStatus } from "@/store/tasks/reducers";

const BoardSectionList: React.FC = () => {
  const error = useSelector((state: any) => state.tasks.error);
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const dispatch: Dispatch<any> = useDispatch();
  const [boardSections, setBoardSections] = useState<BoardSections | undefined>(
    undefined
  );

  useEffect(() => {
    if (tasks) {
      setBoardSections(initializeBoard(tasks));
    }
  }, [tasks]);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections!,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections!,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection![activeContainer];
      const overItems = boardSection![overContainer];

      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection!,
        [activeContainer]: [
          ...boardSection![activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection![overContainer].slice(0, overIndex),
          boardSections![activeContainer][activeIndex],
          ...boardSection![overContainer].slice(
            overIndex,
            boardSection![overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections!,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections!,
      over?.id as Status
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections![activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections![overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection!,
        [overContainer]: arrayMove(
          boardSection![overContainer],
          activeIndex,
          overIndex
        ),
      }));

      const taskToUpdate = boardSections![activeContainer][activeIndex];
      dispatch(updateTaskStatus(taskToUpdate.id, overContainer));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
    <div className="container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-x-[30px]">
          {boardSections &&
            Object.keys(boardSections).map((boardSectionKey) => (
              <div className="grid" key={boardSectionKey}>
                <BoardSection
                  id={boardSectionKey}
                  title={boardSectionKey}
                  tasks={tasks.filter(
                    (task: Task) => task.status === boardSectionKey
                  )}
                />
              </div>
            ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;
