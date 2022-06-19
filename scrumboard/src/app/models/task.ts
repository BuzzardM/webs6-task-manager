export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: string;
  owner: string;
  project_id: string;
  points: number;
}
