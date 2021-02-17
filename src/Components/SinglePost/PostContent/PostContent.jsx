import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link, useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import LikeButton from '../../Reusable/LikeButton/LikeButton'
import { AuthContext } from '../../Context/AuthContext'
import { ActionButton } from '../../Reusable/Buttons/Buttons'
import { Avatar, useToast } from '@chakra-ui/react'

import './PostContent.css'

const SinglePostContent = () => {
  const history = useHistory()
  const toast = useToast()

  const { currentUser } = useContext(AuthContext)
  const { BASE_URL } = useContext(AuthContext)

  const {postID} = useParams()
  const [username, setUserName] = useState('')
  const [subreddit, setSubreddit] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imgURL, setImgURL] = useState()
  const [profileURL, setProfileURL] = useState()

  const [isEditing, setIsEditing] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  const handleAction = async(type) => {
    switch (type) {
      case 'UPDATE':
        const formattedData = {
          postID,
          content
        }

        const details = await axios.put(`${BASE_URL}/posts/update/${postID}`, formattedData)
        toast(
          {
            title: details.data.message,
            status: "success",
            duration: 4000,
            isClosable: true,
          }
        )
        setIsEditing(false)
        break;
    
      case 'DELETE':
        axios.delete(`${BASE_URL}/posts/delete/${postID}`)
          .then(() => {
            history.push('/')
          })
        break
        
      default:
        setIsEditing(false)
        break;
    }

  }



  useEffect(() => {
    const getPostContent = async() => {
      const postContent = await axios.get(`${BASE_URL}/posts/${postID}`)

      const { subreddit,username,title,content,createdat,img_url,profile_url } = postContent.data.data.post
      setSubreddit(subreddit)
      setUserName(username)
      setTitle(title)
      setImgURL(img_url)
      setProfileURL(profile_url)
      setContent(content)
      setCreatedAt(createdat)
    }
    getPostContent()

    currentUser?.displayName === username ? setIsOwner(true) : setIsOwner(false) 
  }, [])

  return (
    <section className="single-post-content">
      <div className="single-post-content__container">
        <div className="single-post-content__row">
          <Avatar src={profileURL} name={username} size='md' />
          <div className="single-post-content__post-details">
            <Link to={`/subreddit/${subreddit}`}>
              <h2 className="single-post-content__subreddit">
                TP/{subreddit} {isOwner}
              </h2>
            </Link>
            <Link to={`/user/${username}`}>
              <h3 className="single-post-content__username">
                By u/{username} {moment(createdAt).fromNow()}
              </h3>
            </Link>
          </div>
        </div>
        <div className="single-post-content__post-content">
          <h1 className="single-post-content__title">
            {title}
          </h1>
          {
            isEditing ? (
              <div className='single-post-content__editing'>
                {imgURL ? (
                  <div className='single-post-content__img'>
                    <img src={imgURL} alt=""/>
                  </div>
                ) : (
                  <textarea className="single-post-content__textarea" value={content} onChange={e => setContent(e.target.value)}/>
                )
              }
                <div className="single-post-content__buttons">
                  {
                    imgURL ? (
                      ''
                    ) : (
                      <div onClick={() => handleAction('UPDATE')}>
                        <ActionButton buttonText='Update' buttonVariant='filled' buttonSize='md' />
                      </div>
                    )
                  }
                  
                  <div onClick={() => setIsEditing(false)}>
                    <ActionButton buttonText='Cancel' buttonVariant='filled' buttonSize='md'/>
                  </div>
                  <div onClick={() => handleAction('DELETE')}>
                  <ActionButton buttonText='Delete' buttonVariant='outlined' buttonSize='md' />
                  </div>

                </div>
              </div>
            ) : (
              <div className="single-post-content__not-editing">
                {
                  imgURL ? (
                    <div className='single-post-content__img'>
                      <img src={imgURL} alt=""/>
                    </div>
                  ) : (
                    <>
                      <p className="single-post-content__para">
                        {content}
                      </p>
                      
                    </>
                  )
                }
                {currentUser?.displayName === username || currentUser?.displayName === 'Joshua_45'? (
                        <button className="single-post-content__edit" onClick={() => setIsEditing(true)}>Edit</button>
                ) : ('')}
              </div>
            )
          }
          <LikeButton postID={postID}/>
        </div>
      </div>
    </section>
  )
}

export default SinglePostContent