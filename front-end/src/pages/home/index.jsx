import { useEffect, useState, useRef } from 'react'
import './styles.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {

    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)

  }

  async function createUsers() {

    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

  }

  async function deletUser(id) {
    
    await api.delete(`/users/${id}`)
  
    getUsers()
  } 

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>

      <div className='container'>

        <form>
          <h1>User Registration</h1>
          <input name='name' placeholder='Name' type='text' ref={inputName} />
          <input name='age' placeholder='Age' type='number' ref={inputAge} />
          <input name='email' placeholder='Email' type='email' ref={inputEmail} />
          <button type='button' onClick={createUsers}>Register</button>
        </form>

        <div className='user-list'>

          {users.map(user => (
            <div key={user.id} className='card-user'>
              <div>
                <p>Name: <span>{user.name}</span></p>
                <p>Age: <span>{user.age} </span></p>
                <p>Email: <span>{user.email}</span></p>
              </div>
              <button onClick={() => deletUser(user.id)}>
                <img src={Trash} />
              </button>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Home
