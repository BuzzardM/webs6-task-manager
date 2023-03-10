import {IProjectMember} from "./projectMember";

export interface IProject {
  id?: string;
  title: string;
  description: string;
  status: string;
  active_sprint: string;
  members: string[];
  member_info: [IProjectMember];
}
