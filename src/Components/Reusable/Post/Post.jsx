import React from 'react'
import { Link } from 'react-router-dom'
import './Post.css'
import moment from 'moment'

import axios from 'axios'
import { Avatar } from '@chakra-ui/react'

const Post = ({postID,username,title,content,subreddit,createdAt, img, profileImg}) => {

  const [post, setPost] = React.useState('')

  React.useEffect(() => {
    setPost(content.replace(/\n/g, '\n'))
  }, [])
  return (
    <article className="post">
      <div className="post__container">
        <div className="post__row">
          <Link to={`/user/${username}`}>
            <Avatar src={profileImg} name={username} size='md' />
          </Link>
          <div className="post__column">
            <div className="post__subreddit">
              <Link to={`/subreddit/${subreddit}`}>
                <h1>TD/{subreddit}</h1>
              </Link>
            </div>
            <div className="post__user">
              <Link to={`/user/${username}`}>
                <h3>By u/{username} {moment(createdAt).fromNow()}</h3>
              </Link>
            </div>
          </div>
        </div>

        <>
          <div className="post__title">
            <Link to={`/post/${postID}`}>
              <h1>{title}</h1>
            </Link>
          </div>
          {
            img ? (
              <div className="post__img">
                <img src={img} alt=""/>
              </div>
            ): (
              <div className="post__content">
                <p>{post}</p>
              </div>
            )
          }
        </>
        <Link className="post__footer" to={`/post/${postID}`}>
          <h1>Comments</h1>
        </Link>
      </div>
    </article>
  )
}

export default Post
