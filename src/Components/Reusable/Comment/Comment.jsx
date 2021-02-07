import React, {useContext, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { CommentContext } from '../../Context/CommentContext'
import { AuthContext } from '../../Context/AuthContext'
import {ActionButton } from '../Buttons/Buttons'

import './Comment.css'

const Comment = ({userName, createdAt, content, commentID}) => {
  const { currentUser } = useContext(AuthContext)
  const { deleteComment, updateComment } = useContext(CommentContext)

  const [paraContent, setParaContent] = useState(content)
  
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = () => {
    updateComment(commentID, paraContent)
    
    setIsEditing(false)
  }
  return (
    <article className="comment" s3>
    
      <div className="comment__column">

        <div className="comment__details">
          <Link>
            <h1 className="comment__username">{userName} posted this {moment(createdAt).fromNow()}</h1>
          </Link>
        </div>
        <div className="comment__content">
          {isEditing ? (
            <>
              <textarea className="comment__textarea" value={paraContent} onChange={e => setParaContent(e.target.value)} ></textarea>
              <div className="comment__buttons">
                <div onClick={handleUpdate}>
                  <ActionButton buttonText="Update" buttonVariant="filled" buttonSize="md" />
                </div>
                <div onClick={() => setIsEditing(false)}>
                  <ActionButton buttonText="Cancel" buttonVariant="filled" buttonSize="md"/>
                </div>
                <div  onClick={() => deleteComment(commentID)} >
                  <ActionButton buttonText="Delete" buttonVariant="outlined" buttonSize="md"/>
                </div>

              </div>
            </>
          ) : (
            <p className="comment__para">
              {paraContent}
            </p>
          )}
          
        </div>
      </div>
      <>
        {
          currentUser?.displayName === userName ? (
            isEditing ? "" : (
              <button className="comment__edit" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )
          ) : (
            ""
          )
        }
      </>
    </article>
  )
}

export default Comment