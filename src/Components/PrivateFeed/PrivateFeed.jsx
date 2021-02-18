import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Skeleton, Stack } from '@chakra-ui/react'
import Post from '../Reusable/Post/Post'

import '../Home/Home.css'
import { AuthContext } from '../Context/AuthContext'

const PrivateFeed = () => {
  const { currentUser, BASE_URL } = useContext(AuthContext)

  const [posts, setPosts] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    //use axios to fetch data from backend
    const fetchData = async() => {
      const posts = await axios.get(`${BASE_URL}/posts/feed/${currentUser.displayName}`)
      setPosts(posts.data.data.posts) 
      isLoading(false)

    }

    fetchData()
  }, [])
  return (
    <section className="home">
      <div className="home__container">
        <div className="home__posts">
          {loading ? (
            <>
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />

              </Stack>
            </>
          ) : (
            <>
              {posts.map(post => {
                console.log(post)
                return(
                  
                  <Post postID={post.postid} profileImg={post.profile_url} img={post.img_url} username={post.username} title={post.title} content={post.content} subreddit={post.subreddit} createdAt={post.createdat}/>
                )
              })}
            </>
          )}
          
        </div>
      </div>
    </section>
  )
}

export default PrivateFeed