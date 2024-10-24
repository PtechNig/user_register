import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

function Create() {
  let [name, setName] = useState('')
  let [phone, setPhone] = useState('')
  let [email, setEmail] = useState('')
  let [error, setError] = useState()



  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const user =  {
      username: name,
      tel: phone,
      email: email
    }
    axios.post('https://user-register-8rjx.onrender.com/users/create', user)
     .then(res => {
       console.log(res.data)
       alert('User created Sucessfully')
       navigate('/')
     })
    .catch(err => {
      console.log(err.response.data.message)
      setError(err.response.data.message)
     
      alert(err.response.data.message)
      
  })


  }

  return (
    <div className='form'>
     <div className='title'> <h1>Create User</h1></div>
     {console.log(error)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' name='username' onChange={e => setName(e.target.value)}/>
          </div>

          <div>
          <label htmlFor='name'>Telephone</label>
          <input type='text' name='tel' onChange={e =>setPhone(e.target.value)}/>
          </div>

          <div>
          <label htmlFor='name'>Email</label>
          <input type='email' name='email' onChange={e =>setEmail( e.target.value)}/>
          </div>

          <div className='btn'>
            <button type='submit'>Submit</button>
            <Link to='/'>Back</Link>
          </div>
      </form>
    </div>
  )
}

export default Create
