import React, {useState, useEffect, useContext} from 'react'
import {axios} from 'axios'
import { AuthContext } from '../Context/AuthContext'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { MdAccountCircle } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'
import './Settings.css'
import UserProfileSettings from './UserProfileSettings/UserProfileSettings'


const Settings = () => {
  const { currentUser } = useContext(AuthContext)



  return (
    <section className='settings'>
      <div className="settings__container">
        <Tabs isFitted size='lg'>
            <TabList>
              <Tab color='#4FD1C5'>
                <MdAccountCircle />
              </Tab>
              <Tab color='#4FD1C5'>
                <BiUserCircle />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserProfileSettings />
              </TabPanel>
              
              <TabPanel>
                
              
              </TabPanel>
            </TabPanels>
          </Tabs>
      </div>
    </section>
  )
}

export default Settings