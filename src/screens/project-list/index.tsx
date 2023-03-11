import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject, useDebounce } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp()

  useEffect(() => {
    setIsLoading(true)
    client('projects', {
      data: cleanObject(debouncedParam)
    }).then(setList)
      .catch((err) => {
        setList([])
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);
  useEffect(() => {
    client('users').then(setUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : ''}
      <List dataSource={list} users={users} loading={isLoading} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`