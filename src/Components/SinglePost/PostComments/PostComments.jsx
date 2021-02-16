import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Comment from '../../Reusable/Comment/Comment'

import './PostComments.css'
import { CommentContext } from '../../Context/CommentContext'
import { AuthContext } from '../../Context/AuthContext'

const PostComments = () => {
  const { BASE_URL } = useContext(AuthContext)
  const { comments, storeComments } = useContext(CommentContext)
  const { postID } = useParams()

  // const [comments, setComments] = useState([])

  useEffect(() => {
    const getComments = async() => {
      const fetchComments = await axios.get(`${BASE_URL}/comments/${postID}`)
      storeComments([...fetchComments.data.data.comments])
    }
    getComments()
  }, [])  
  return (
    <section className="post-comments">
      <div className="post-comments__container">
        <h1 className="post-comments__title">Comments</h1>
        {
          comments.map(comment => {

            return(
              <Comment key={comment.comment_id} profileURL={comment.profile_url} userName={comment.username} createdAt={comment.createdAt} content={comment.content} commentID={comment.comment_id} />
            )
          })
        } 
      </div>
    </section>
  )
}

export default PostComments
