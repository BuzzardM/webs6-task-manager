import {IProjectMember} from "./projectMember";

export interface IProject {
  title: string;
  description: string;
  status: string;
  members: [];
  member_info: [IProjectMember];
}
