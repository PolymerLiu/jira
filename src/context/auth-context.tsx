import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from "../screens/project-list/search-panel";
import { http } from 'utils/http';
import { useMount } from 'utils';
import { useAsync } from 'utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null
  // 根据本地存的token去获取用户信息
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}
const AuthContext = React.createContext<{
  user: User | null,
  register: (form: AuthForm) => Promise<void>,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined)
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, setData: setUser, error, isLoading, isIdle, isError, run } = useAsync<User | null>()
  useMount(() => {
    run(bootstrapUser())
  })

  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
  const logout = () => auth.logout().then(user => setUser(null))

  if (isLoading || isIdle) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}