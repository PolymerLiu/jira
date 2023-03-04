import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"

export const AuthenticatedApp = () => {
  const { user, logout } = useAuth()
  return <div>
    {user ? <button onClick={logout}>登出</button> : null}
    <ProjectListScreen />
  </div>
}