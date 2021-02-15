import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import { Skeleton, Stack } from '@chakra-ui/react'
import Post from '../Reusable/Post/Post'
import { AuthContext } from '../Context/AuthContext'
import './Home.css'

const Home = () => {
  const { BASE_URL } = useContext(AuthContext)

  const [posts, setPosts] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {


    const fetchData = async() => {
      const posts = await axios.get(`${BASE_URL}/posts`)
      const postArr = posts.data.data.posts

      setPosts(postArr) 
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
                  
                  <Post postID={post.postid} img={post.img_url}  username={post.username} title={post.title} content={post.content} subreddit={post.subreddit} createdAt={post.createdat}/>
                )
              })}
            </>
          )}
          
        </div>
      </div>
    </section>
  )
}

export default Home