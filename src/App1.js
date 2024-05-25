import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App1 = () => {
    const [data, setdata] = useState([])
    const [view,setview]=useState({})

    const serverdata = () => {
        axios.get(`http://localhost:3001/posts`).then((res) => {
            console.log(res.data);
            setdata(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const input_handler=(e)=>{
        setview({...view,[e.target.name]:e.target.value})
    }

    const submit_handler=async()=>{
      await axios.post(`http://localhost:3001/posts`,view)
    }

    const delete_handler=async(id)=>{
        await axios.delete(`http://localhost:3001/posts/${id}`).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const view_handler=(value,index)=>{
        setview(value)
    }

    const update_handler=()=>{
         axios.put(`http://localhost:3001/posts/${view.id}`,view).then((res)=>{
            console.log('update res',res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        serverdata()
    }, [data])
    return (
        <>
            {/* <h3>App1</h3> */}
            <div className='text-center my-5'>
                <h4 className='pb-2'>Add Title And Author </h4>
                <div className='mb-3 '>
                    <label className='me-3 fs-4'>Enter Your Title</label>
                    <input name='title' value={view.title} onChange={input_handler}></input>
                </div>
                <div className='mb-3 '>
                    <label className='me-3 fs-4'>Enter Your Title</label>
                    <input name='author' value={view.author} onChange={input_handler}></input>
                </div>
                <button className='btn btn-success me-4' onClick={submit_handler}>
                    Submit Data
                </button>
                <button className='btn btn-info' onClick={()=>{update_handler(view.id)}}>Update Data</button>
            </div>
            {
                data?.map((value, index) => {
                    return (
                        <div key={index} className=' w-25 m-3 mx-auto'>
                           <div className='border text-center py-3 '>
                           <h3>{value.title}</h3>
                            <h3>{value.author}</h3>
                            <button className='btn btn-secondary me-4' onClick={()=>{view_handler(value,index)}}>View Data</button>
                            <button className='btn btn-danger' onClick={()=>{delete_handler(value.id)}}>Delete</button>
                           </div>
                        </div>
                    )
                })
            }


        </>
    )
}

export default App1