import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App(){
  const [result,setresult]=useState([])

  const serverdata=()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>{
      console.log(res.data);
      setresult(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    serverdata()
  },[result])

  return(
    <>
      <h3>App</h3>
      {
        result?.map((data,index)=>{
          return(
            <div key={index} className='border'>
              <h3>{data.userId}</h3>       
              <h3>{data.title}</h3>       
              <h3>{data.id}</h3>       
              <h3>{data.body}</h3>       
            </div>
          )
        })
      }
    </>
  )
}

export default App;
