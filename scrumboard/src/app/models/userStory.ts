export interface IUserStory {
  id?: string;
  title: string;
  description: string;
  status: string;
  owner: string;
  projectId: string;
  points: number;
}
