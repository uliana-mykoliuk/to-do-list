export type Task = {
  id: string;
  task?: string;
  status: string;
};

export type BoardSections = {
  [name: string]: Task[];
};
