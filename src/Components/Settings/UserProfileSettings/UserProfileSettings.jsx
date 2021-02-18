import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { ActionButton } from '../../Reusable/Buttons/Buttons'
import './UserProfileSettings.css'
import { AuthContext } from '../../Context/AuthContext'
import { Avatar, useToast } from '@chakra-ui/react'
import { storage } from '../../Firebase/firebase'

const UserProfileSettings = () => {
  const toast = useToast()
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
      const uploadToStorage = storage.ref(`profilePic/${currentUser.displayName}`).put(e.target.files[0])

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

  const handleSubmitBio = async(e) => {
    e.preventDefault()
    console.log(bio)
    const changeBio = await axios.post(`${BASE_URL}/user/update/bio`, {bio, uid: await currentUser.uid})

    if(changeBio.data.status === 'Success'){
      toast(
        {
          title: "Action completed",
          description: "Bio changed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        }
      )
    } else {
      toast(
        {
          title: "Action failed",
          description: "Bio could not be changed",
          status: "error",
          duration: 3000,
          isClosable: true,
        }
      )
    }
  
  }

  const handleSubmitPortfolio = async(e) => {
    e.preventDefault()
    
    const changePortfolio = await axios.post(`${BASE_URL}/user/update/portfolio`, {portfolio,  uid: await currentUser.uid})
  }

  return (
    <section className='user-profile-settings'>
      <form onSubmit={e => e.preventDefault()}>
        <div className="user-profile-settings__container">
          <div className="user-profile-settings__avatar">
            <label htmlFor="myImageInput">
              <Avatar src={profileImg} name={currentUser.displayName} size='lg' _hover={{
                opacity: 0.5,
                cursor:'pointer',
                transition: '0.3s ease-in-out'
              }} />
            </label>
            <input type="file" id='myImageInput' onChange={handleProfileChange}/>
            
            <h1 className="user-profile-settings__content">
              Profile Details
            </h1>

            
          </div>
        </div>  
      </form>
      <div className="user-profile-settings__form">
        <form className="user-profile-settings__bio" onSubmit={handleSubmitBio}>
          <textarea maxLength='200' required value={bio} onChange={e => setBio(e.target.value)}/>
          <label>Bio</label>
        <ActionButton  buttonColor='blue' buttonSize='lg' buttonText='Update' buttonVariant='filled ' />
        </form>

        <form className="user-profile-settings__bio" onSubmit={handleSubmitPortfolio}>
          <input maxLength='200' required value={portfolio} onChange={e => setBio(e.target.value)}/>
          <label>Portfolio</label>
        <ActionButton  buttonColor='blue' buttonSize='lg' buttonText='Update' buttonVariant='filled ' />
        </form>
      </div>

    </section>
  )
}

export default UserProfileSettings
