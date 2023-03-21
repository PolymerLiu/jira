import { useSearchParams } from "react-router-dom"

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  console.log('++++keys', keys);

  const [searchParams, setSearchParams] = useSearchParams()
  return [
    keys.reduce((prev: { [p: string]: string }, key: K) => {
      return { ...prev, [key]: searchParams.get(key) || '' }
    }, {} as { [key in K]: string }),
    setSearchParams
  ] as const
}