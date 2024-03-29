import { useState } from 'react';
interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  const config = {
    ...defaultConfig,
    initialConfig
  }

  // 请求成功调用
  const setData = (data: D) => setState({
    data,
    stat: 'success',
    error: null
  })
  // 请求报错调用
  const setError = (error: Error) => setState({
    data: null,
    stat: 'error',
    error
  })
  // run用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise类型的数据')
    }
    setState({ ...state, stat: 'loading' })
    return promise
      .then(data => {
        setData(data)
        return data
      }).catch(err => {
        setError(err)
        if (config.throwOnError) {
          return Promise.reject(err)
        }
        return err
      })
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run, setData, setError,
    ...state
  }
}