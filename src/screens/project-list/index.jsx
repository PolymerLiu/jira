import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import qs from "qs"
import { cleanObject } from "../../utils"

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () =>{
  const [param,setParam] = useState({
    name:'',
    personId:''
  })
  const [users,setUsers] = useState([])
  const [list,setList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  },[param])
  useEffect(() => {
    fetch(`http://localhost:3001/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  },[])
  return <div>
    <SearchPanel param={param} setParam={setParam} users={users}/>
    <List list={list} users={users}/>
  </div>
}