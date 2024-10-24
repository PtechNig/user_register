import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from'react-router-dom'
import axios from 'axios'
import './style.css'


function Update() {
  let [name, setName] = useState('')
  let [tel, setTel] = useState('')
  let [email, setEmail] = useState('')
  
  
  let {id} = useParams()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/users/${id}`)
   .then(res => {
     setName(res.data.data.username)
     setTel(res.data.data.tel)
     setEmail(res.data.data.email)
   })
   .catch(err => {
     console.error(err)
     alert('Error fetching user')
   })
  }, [id])
  
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirm = window.confirm("Do you want to update user?")

    if(confirm){
      axios.put(`http://127.0.0.1:8080/users/${id}`, {
        username: name,
        tel: tel,
        email: email
      })
      .then(res => {
        console.log(res.data)
        alert('User updated successfully')
        navigate('/')
      })
      .catch(err => {
        console.error(err)
        alert('Error updating user')
      })
    }
    }
    
  return (
    <div className='form container'>
           <div className='title'> <h1>Update User</h1></div>
            <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' name='username' value={name} onChange={e => setName(e.target.value)}/>
          </div>

          <div>
          <label htmlFor='name'>Telephone</label>
          <input type='text' name='tel' value={tel} onChange={e =>setTel(e.target.value)}/>
          </div>

          <div>
          <label htmlFor='name'>Email</label>
          <input type='email' name='email' value={email} onChange={e =>setEmail( e.target.value)}/>
          </div>

          <div className='btn'>
            <button type='submit'>Update</button>
            <Link to='/'>Back</Link>
          </div>















          
      </form>
    </div>
  )
}

export default Update
