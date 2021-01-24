import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useToast } from '@chakra-ui/react'
import './LikeButton.css'

const LikeButton = ({postID}) => {
  const toast = useToast()
  const {currentUser} = useContext(AuthContext)
  const [didUSerLike, setDidUserLike] = useState()
  const [numOfLikes, setNumOfLikes] = useState()


  const likePost = async() => {
    console.log(currentUser)
    if(currentUser){

      const formattedDetails = {
        userName: await currentUser.displayName,
        postID
      }
      console.log(formattedDetails)
  
      axios.post('http://localhost:5000/likes/add',formattedDetails)
      setNumOfLikes(numOfLikes+1)
      setDidUserLike(true)
    } else {
      toast({
        title: "Cannot cast vote",
        description: "You need to create an account to like posts",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

  }

  const dislikePost = async() => {
    const formattedDetails = {
      userName: await currentUser.displayName,
      postID
    }
    const userName = await currentUser.displayName
    console.log(formattedDetails)
    axios.post('http://localhost:5000/likes/dislike',formattedDetails)
    setNumOfLikes(numOfLikes-1)
    setDidUserLike(false)

  }

  useEffect(() => {
    if(currentUser){

      const fetchLikes = async() => {
        const fetch = await axios.get(`http://localhost:5000/likes/${postID}`)
        const likeArr = fetch.data.data.likedBy.map(like => like.username)
        setDidUserLike(likeArr.includes(currentUser.displayName))
        setNumOfLikes(fetch.data.data.numOfLikes)
      }
      fetchLikes()
    } else {

    }
  }, [])


  return (
    <>
      {didUSerLike && didUSerLike !== undefined ? (

        <button className="like__btn" onClick={dislikePost}>
          <BsHeartFill className="heart" />
          <span className="counter">
            {numOfLikes}
          </span>
        </button>
      ) : (
        <button className="like__btn " onClick={likePost}>
          <BsHeart className="heart" />
          <span className="counter">
            {numOfLikes}
          </span>
        </button>
      )}
    </>
  )
}

export default LikeButton