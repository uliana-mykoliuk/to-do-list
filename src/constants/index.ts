import { Task } from "@/types";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    task: "Title 2",
    status: "not completed",
  },
  {
    id: "2",
    task: "Title 3",
    status: "not completed",
  },
  {
    id: "3",
    task: "Title 4",
    status: "completed",
  },
];

export const BOARD_SECTIONS = {
  "not completed": "not completed",
  "in progress": "in progress",
  completed: "completed",
};
