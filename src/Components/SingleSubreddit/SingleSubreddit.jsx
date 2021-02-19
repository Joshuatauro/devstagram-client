import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Skeleton, Stack } from '@chakra-ui/react'
import Post from '../Reusable/Post/Post'
import { useParams } from 'react-router-dom'

import '../Home/Home.css'
import SubredditAbout from '../Reusable/SubredditAbout/SubredditAbout'
import { AuthContext } from '../Context/AuthContext'

const SingleSubreddit = () => {
  const { BASE_URL } = useContext(AuthContext)
  const { subreddit } = useParams()

  const [posts, setPosts] = useState([])
  const [loading, isLoading] = useState(true)
  const [numOfPosts, setNumOfPosts] = useState(0)

  useEffect(() => {
    //use axios to fetch data from backend
    const fetchData = async() => {
      const posts = await axios.get(`${BASE_URL}/posts/subreddit/${subreddit}`)
      const postArr = posts.data.data.posts
      setPosts(postArr) 
      setNumOfPosts(postArr.length)
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
            <div className="home__flex">
            
              <div className="home__column">
                {posts.map(post => {
                  return(
                    
                    <Post postID={post.postid} img={post.img_url} profileImg={post.profile_url} username={post.username} title={post.title} content={post.content} subreddit={post.subreddit} createdAt={post.createdat}/>
                  )
                })}
              </div>
              <SubredditAbout numOfPosts={numOfPosts}/>
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}

export default SingleSubreddit