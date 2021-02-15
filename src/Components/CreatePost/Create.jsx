import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {  IconButton, Progress, Select, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react'
import { AuthContext } from '../Context/AuthContext'
import { ActionButton } from '../Reusable/Buttons/Buttons'
import { useHistory } from 'react-router-dom'
import { AiFillFileText } from 'react-icons/ai'
import { BsImageFill } from 'react-icons/bs'
import './Create.css'
import { storage } from '../Firebase/firebase'

const CreatePost = () => {
  const history = useHistory()
  const toast = useToast()
  const { currentUser, BASE_URL } = useContext(AuthContext)

  const [subreddits, setSubreddits] = useState([])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedSubreddit, setSelectedSubreddit] = useState('All')

  const [fileContent, setFileContent] = useState()
  const [imgProgress, setImgProgress] = useState()


  const handleImgSelect = (e) => {
      if(e.target.files[0]){
        setFileContent(e.target.files[0])
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(currentUser.uid){

      if(fileContent) {
        const uploadToStorage = storage.ref(`posts/${currentUser.displayName}/${fileContent.name}`).put(fileContent)

        uploadToStorage.on(
          'state_changed',
          (snapshot) => {
            let progressImgCompleted = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setImgProgress(progressImgCompleted)
          },
          (err) => {
            alert(err.message)
          },
          async() => {
            const imageDownloadURL = await uploadToStorage.snapshot.ref.getDownloadURL()
            const formatDetails = await {
              title,
              content ,
              subreddit: selectedSubreddit,
              userName: currentUser.displayName,
              downloadURL: imageDownloadURL
            }
            const response = await axios.post(`${BASE_URL}/posts/add`, formatDetails)
            history.push(`/post/${response.data.postID}`)
          }
        )
      } else {
        const formatDetails = await {
          title,
          content ,
          subreddit: selectedSubreddit,
          userName: currentUser.displayName,
        }
        
        try{
          const response = await axios.post(`${BASE_URL}/posts/add`, formatDetails)
          history.push(`/post/${response.data.postID}`)
        } catch(err){
          alert('Something went wrong')
        }
      }

      

    } else {
      toast({
        title: "Failed to add post",
        description: "You need to create an account to post ",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      
    }
  }

  useEffect(() => {
    const fetchSubreddits = async() => {
      const subreddits = await axios.get(`${BASE_URL}/subreddits`)
      setSubreddits(subreddits.data.subreddits.map(subreddit => subreddit.subreddit))
    }

    fetchSubreddits()
  }, [])
  return (
    <section className="create">
      <div className="create__container">

        <div className="create__form">

        
          <Tabs variant='enclosed'size='lg'>
            <TabList>
              <Tab color='#4FD1C5'_active='#4FD1C5'>
                <AiFillFileText />
              </Tab>
              <Tab color='#4FD1C5'>
                <BsImageFill/>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <form onSubmit={handleSubmit}  className="create__form">
                  <div className="create__input">
                    <input type="text" required value={title} onChange={e => setTitle(e.target.value)}/>
                    <label className="create__label">Title</label>
                  </div>
                  <Select value={selectedSubreddit} onChange={e => setSelectedSubreddit(e.target.value)} variant="filled" bg='#4FD1C5' color="black" _hover={{bg: "#4FD1C5"}} _focus={{bg: "#4FD1C5"}}>
                    {
                      subreddits.map((subreddit) => {
                        return(
                          <option value={subreddit}>{subreddit}</option>
                        )
                      })
                    }
                  </Select>
                  <div className="create__input">
                    <textarea type="text" required value={content} onChange={e => setContent(e.target.value)}/>
                    <label className="create__label">Text</label>
                  </div>
                  <ActionButton type='submit' buttonText="Submit" buttonVariant="filled" buttonColor="blue" buttonSize="md" />
                  </form>
              </TabPanel>
              
              <TabPanel>
                <form onSubmit={handleSubmit}  className="create__form">
                  <div className="create__input">
                      <input type="text" required value={title} onChange={e => setTitle(e.target.value)}/>
                      <label className="create__label">Title</label>
                    </div>
                    <Select value={selectedSubreddit} onChange={e => setSelectedSubreddit(e.target.value)} variant="filled" bg='#4FD1C5' color="black" _hover={{bg: "#4FD1C5"}} _focus={{bg: "#4FD1C5"}}>
                      {
                        subreddits.map((subreddit) => {
                          return(
                            <option value={subreddit}>{subreddit}</option>
                          )
                        })
                      }
                    </Select>

                    <div className="create__input__img">    
                      <input name='myname' required type="file" accept='image/*' onChange={handleImgSelect} />
                      <Progress value={imgProgress} borderRadius='5px' />
                    </div>
                  <ActionButton name='myname' type='submit' buttonText="Submit" buttonVariant="filled" buttonColor="blue" buttonSize="md" />

                </form>
              
              </TabPanel>
            </TabPanels>
          </Tabs>
          </div>

      </div>
    </section>
  )
}

export default CreatePost
