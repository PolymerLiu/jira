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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

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