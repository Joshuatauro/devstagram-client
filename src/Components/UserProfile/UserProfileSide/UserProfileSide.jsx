import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { Avatar } from '@chakra-ui/react'
import './UserProfileSide.css'

const UserProfileSide = () => {
  const { BASE_URL } = useContext(AuthContext)
  const { username } = useParams()

  const [bio, setBio] = useState()


  useEffect(() => {
    const fetchUser = async() => {
      const userData = await axios.get(`${BASE_URL}/user/details/${username}`)
      console.log(userData.data.data.userDetails[0].bio)
      setBio(userData.data.data.userDetails[0].bio)
    }

    fetchUser()
  })
  return (
    <div className="user-profile-aside">
      <div className="user-profile-aside__container">
        <div className="user-profile-aside__img">
          <Avatar name={username} size='md'/>
        </div>
        <h1 className="user-profile-aside__username">
          {username}
        </h1>
        <p className="user-profile-aside__bio">
          {bio}
        </p>
      </div>
    </div>
  )
}

export default UserProfileSide