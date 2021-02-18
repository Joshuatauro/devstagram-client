import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

import './UserProfileSettings.css'
import { AuthContext } from '../../Context/AuthContext'
import { Avatar } from '@chakra-ui/react'
import { storage } from '../../Firebase/firebase'
import { useHistory } from 'react-router-dom'

const UserProfileSettings = () => {
  const history = useHistory()
  const { currentUser, BASE_URL } = useContext(AuthContext)

  const [profileImg, setProfileImg] = useState(currentUser.photoURL)
  const [bio, setBio] = useState()
  const [portfolio, setPortfolio] = useState()

  useEffect(() => {
    const fetchData = async() => {
      const userProfileData = await axios.get(`${BASE_URL}/user/settings/${currentUser.uid}`)
      const { bio, portfolio } = userProfileData.data.data.userData
      setBio(bio)
      setPortfolio(portfolio)
    }

    fetchData()
  }, [])

  const handleProfileChange = async(e) => {
    e.preventDefault()
    if(currentUser.uid){
      console.log(e.target.files[0])
      const uploadToStorage = storage.ref(`profilePic/${currentUser.displayName}/${e.target.files[0].name}`).put(e.target.files[0])

        uploadToStorage.on(
          'state_changed',
          (snapshot) => {
            let progressImgCompleted = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progressImgCompleted)
          },
          (err) => {
            alert(err.message)
          },
          async() => {
            const imageDownloadURL = await uploadToStorage.snapshot.ref.getDownloadURL()

            const response = await axios.post(`${BASE_URL}/user/update/profile`, {imageDownloadURL,uid: currentUser.uid})
            setProfileImg(imageDownloadURL)
            currentUser.updateProfile({
              photoURL: await imageDownloadURL
            })
          }
        )
    } 
  }

  return (
    <form className='user-profile-settings'>
      <div className="user-profile-settings__container">
        <div className="user-profile-settings__avatar">
          <label htmlFor="myImageInput">
            <Avatar src={profileImg} name={currentUser.displayName} _hover={{
              opacity: 0.5,
              cursor:'pointer',
              transition: '0.3s ease-in-out'
            }} />
          </label>
            <input type="file" id='myImageInput' onChange={handleProfileChange}/>

        </div>
      </div>
    </form>
  )
}

export default UserProfileSettings
