import {ITask} from "./task";

export interface ISprint {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  project_id: string;
  tasks: ITask[];
}
