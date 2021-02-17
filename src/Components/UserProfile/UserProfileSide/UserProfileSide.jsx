import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { Avatar } from '@chakra-ui/react'
import './UserProfileSide.css'
import { ActionButton, LinkButton } from '../../Reusable/Buttons/Buttons'
import { Link } from 'react-router-dom'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react"


const UserProfileSide = () => {
  const { BASE_URL } = useContext(AuthContext)
  const { username } = useParams()

  const [bio, setBio] = useState()
  const [subreddits, setSubreddits] = useState([])
  const [imgURL, setImgURL] = useState()

  const { isOpen, onOpen, onClose } = useDisclosure()

  // const btnRef = React.useRef()

  useEffect(() => {
    const fetchUser = async() => {
      const userData = await axios.get(`${BASE_URL}/user/details/${username}`)
      setSubreddits(userData.data.data.userDetails.followed_subreddits)
      setBio(userData.data.data.userDetails.bio)
      setImgURL(userData.data.data.userDetails.profile_url)
    }

    fetchUser()
  }, [])
  return (
    <div className="user-profile-aside">
      <div className="user-profile-aside__container">
        <div className="user-profile-aside__img">
          <Avatar name={username} src={imgURL} size='lg'/>
        </div>
        <div className="user-profile-aside__content">
          <div className="user-profile-aside__col">
            <h1 className="user-profile-aside__username">
              {username}
            </h1>
            <p className="user-profile-aside__bio">
              {bio}
            </p>
          </div>
          <div className="user-profile-aside__following" onClick={ onOpen }>
            <ActionButton  buttonText={`Following:  ${subreddits?.length ? subreddits.length : 0}`} buttonColor='blue' buttonSize='sm' buttonVariant='filled' />
          </div>
        </div>
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay colorScheme='facebook'>
          <DrawerContent backgroundColor='#1A202C'>
            <DrawerCloseButton />
            <DrawerHeader color='#4FD1C5' fontFamily='jetbrains mono'>{username} follows</DrawerHeader>

            <DrawerBody>
              {subreddits?.map(subreddit => {
                return(
                  <Link to={`/subreddit/${subreddit}`}>
                    <LinkButton buttonVariant='filled' buttonSize='lg' buttonText={subreddit} m='mx-0' />
                  </Link>
                )
              })}
            </DrawerBody>

            <DrawerFooter>
              {/* <ActioButton variant="outline" mr={3} onClick={onClose}>
                Cancel
              </ActioButton> */}
              <div onClick={onClose}>
                <ActionButton buttonColor='blue' buttonSize='sm'buttonText='Cancel' buttonVariant='filled' />
              </div>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      </div>
      
    </div>
  )
}

export default UserProfileSide