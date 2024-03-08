export type Status = "not completed" | "in progress" | "completed";

export type Task = {
  id: string;
  task?: string;
  status: Status;
};

export type BoardSections = {
  [name: string]: Task[];
};
