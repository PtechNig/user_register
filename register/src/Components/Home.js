import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



function Home() {
    let [data, setData] = useState([])
    let [query, setQuery] = useState([])

    useEffect(()=>{
        axios.get('http://127.0.0.1:8080/users')
        .then(response => {
            setData( response.data.data);
            console.log(response)
        })
        .catch(error => console.log(error))
    },[]);

    const handleDelete = (id) => {
      const confirm = window.confirm('Would you like to Delete?')

      if(confirm) {
        axios.delete(`http://127.0.0.1:8080/users/${id}`)
       .then(response => {
        console.log(response.data)
        alert("User deleted Successfully")
        window.location.reload()
       })
      }
    }
  return (  
    <div className='container'>
      <div className='top'>
        <h1>User Register</h1>
        <input type="search" className='search' placeholder='Search...' onChange={(e)=> {setQuery(e.target.value)}} />
        <Link to='/Create'>Register Users</Link>
      </div>
      <div className='base'>
        <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Telephone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  
                  data.filter(user => user.username.toLowerCase().includes(query)).map(item => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.username}</td>
                      <td>{item.tel}</td>
                      <td>{item.email}</td>
                      <td className='action'>
                        <Link to={`/Update/${item._id}`}>Edit</Link>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                      </td>
                    </tr>
              ))



                }
              


            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
