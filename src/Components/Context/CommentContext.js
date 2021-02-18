import React,{ createContext, useReducer, useState } from 'react'
import axios from 'axios'

export const CommentContext = createContext()
const BASE_URL = 'http://localhost:5000'
export const CommentContextProvider = ({children}) => {

  const [comments, setComments] = useState([])

  const deleteComment = async(commentID) => {
    const deleteComment = await axios.delete(`${BASE_URL}/comments/${commentID}`) 
    setComments(comments.filter(comment => commentID !== comment.comment_id))
  }

  const updateComment = async(commentID, content, imageURL) => {
    const formatted = {
      imageURL,
      commentID,
      content
    }
    const updatedComment = await axios.put(`${BASE_URL}/comments/${commentID}`, formatted)
    setComments([...comments, comments.map(comment => comment.comment_id === commentID ? comment.content = content : comment)])
  } 

  const addComment = (comment) => {
    setComments([comment,...comments])
  }

  const storeComments = commentsArray => {
    setComments(commentsArray)
  } 

  

  return(
    <CommentContext.Provider value={
      {
        comments,
        storeComments,
        deleteComment,
        addComment,
        updateComment
      }
    }>
      {children}
    </CommentContext.Provider>
  )
}