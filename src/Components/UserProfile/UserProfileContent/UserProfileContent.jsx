import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Post from '../../Reusable/Post/Post'
import './UserProfileContent.css'
import { AuthContext } from '../../Context/AuthContext'


const UserProfileContent = () => {
  const { BASE_URL } = useContext(AuthContext)
  const { username } = useParams()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async() => {
      const posts = await axios.get(`${BASE_URL}/posts/user/${username}`)
      console.log(posts)
      setPosts(posts.data.data.posts)
    }

    getPosts()
  }, [])


  return (
    <section className="user-profile">
      <div className="user-profile__container">
        {
          posts.map(post => {

            return(
              <Post postID={post.postid} img={post.img_url} content={post.content} username={post.username} title={post.title} createdAt={post.createdat} subreddit={post.subreddit} />
            )
          })
        }
      </div>
    </section>
  )
}

export default UserProfileContent
