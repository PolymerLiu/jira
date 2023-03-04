import { useAuth } from './../context/auth-context';
import qs from 'qs'
import * as auth from 'auth-provider'
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string,
  data?: object,
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    methods: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'appplication/json' : ''
    },
    // customConfig可以传POST覆盖GET
    ...customConfig
  }
  if (config.methods.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  // axios和fetch不一样，axios可以直接在返回状态不为2XX的时候返回异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      // 手动抛出异常，服务端的异常fetch不会帮我们抛出，只有是网络之类的错误，才可以在catch捕获
      return Promise.reject(data)
    }
  })
}
// 统一封装http调用，在这里把token注入
// 不能在函数里面使用hook，只能在hook或react组件里面使用，所以要自定义一个hook
export const useHttp = () => {
  const { user } = useAuth()

  // return ([endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token })
  // Parameters获取和http方法一样的type, 不需要重新声明
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}