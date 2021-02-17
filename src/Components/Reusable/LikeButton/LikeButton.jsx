import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { useToast } from '@chakra-ui/react'
import './LikeButton.css'

const LikeButton = () => {
  const {postID} = useParams()
  const toast = useToast()
  const {currentUser, BASE_URL } = useContext(AuthContext)
  const [didUSerLike, setDidUserLike] = useState()
  const [numOfLikes, setNumOfLikes] = useState()


  const likePost = async() => {
    if(await currentUser){

      const formattedDetails = {
        userName: await currentUser.displayName,
        postID
      }
  
      axios.post(`${BASE_URL}/likes/add`,formattedDetails)
      setNumOfLikes(numOfLikes+1)
      setDidUserLike(true)
    } else {
      toast({
        title: "Cannot cast vote",
        description: "You need to create an account to like/dislike a post",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

  }

  const dislikePost = async() => {
    if(currentUser){  
      const formattedDetails = {
        userName: await currentUser.displayName,
        postID
      }
      const userName = await currentUser.displayName
      console.log(formattedDetails)
      axios.post(`${BASE_URL}/likes/dislike`,formattedDetails)
      setNumOfLikes(numOfLikes-1)
      setDidUserLike(false)
    } else {
      toast({
        title: "Cannot cast vote",
        description: "You need to create an account to like post",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if(currentUser){

      const fetchLikes = async() => {
        const fetch = await axios.get(`${BASE_URL}/likes/${postID}`)
        const likeArr = fetch.data.data.likedBy.map(like => like.username)
        setDidUserLike(likeArr.includes(currentUser.displayName))
        setNumOfLikes(fetch.data.data.numOfLikes)
      }
      fetchLikes()
    } else {
      const fetchLikes = async() => {
        const fetch = await axios.get(`${BASE_URL}/likes/${postID}`)
        setNumOfLikes(fetch.data.data.numOfLikes)
      }
      fetchLikes()
    }
  }, [currentUser])
  
  


  return (
    <>
      {didUSerLike && didUSerLike !== undefined ? (

        <button className="like__btn" onClick={dislikePost}>
          <div className={`heart liked ${didUSerLike ? "is_animating" : ""}`}/>
          
          <span className="counter">
            {numOfLikes}
          </span>
        </button>
      ) : (
        <button className="like__btn " onClick={likePost}>
          <div className="heart"/>
          <span className="counter">
            {numOfLikes}
          </span>
        </button>
      )}
    </>
  )
}

export default LikeButton
