import styled from "@emotion/styled"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import { Row } from './components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */
export const AuthenticatedApp = () => {
  return <Container>
    <PageHeader />
    <Main>
      <BrowserRouter>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
        </Routes>
      </BrowserRouter>
    </Main>
  </Container>
}

const PageHeader = () => {
  const { user, logout } = useAuth()
  return <Header between={true}>
    <HeaderLeft gap={2}>
      {/* <img src={softwareLogo} /> */}
      <Button type="link" onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color={"rgb(38, 132, 255)"} />
      </Button>
      <h3>项目</h3>
      <h3>用户</h3>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={<Menu>
        <Menu.Item><Button type="link" onClick={logout}>登出</Button></Menu.Item>
      </Menu>}>
        <Button type="link" onClick={e => e.preventDefault()}>Hi,{user?.name}</Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-areas: 
  "header header header"
  "main main main"
  ;
  height: 100vh;
`
const Header = styled(Row)`
grid-area:header;
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`grid-area:main`
