import {IProjectMember} from "./projectMember";

export interface IProject {
  id?: string;
  title: string;
  description: string;
  status: string;
  members: [];
  member_info: [IProjectMember];
}
