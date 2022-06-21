export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: string;
  owner: string;
  project_id: string;
  assigned_sprint?: string;
  assigned_to: string | null;
  points: number;
  created_at: Date;
  updated_at: Date;
}
