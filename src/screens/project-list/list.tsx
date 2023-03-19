import { User } from "./search-panel";
import React from "react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export interface Project {
  id: string;
  name: string;
  personId: string;
  email: string;
  organization: string;
  created: string;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return <Table pagination={false} columns={[
    {
      title: '名称',
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      },
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      render(value, project) {
        return <span>{users.find((user) => user.id === project.personId)?.name}</span>
      }
    },
    {
      title: '创建时间',
      render(value, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      },
    },
  ]} {...props} />
};
