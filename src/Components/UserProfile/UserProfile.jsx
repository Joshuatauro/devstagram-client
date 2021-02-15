import React,{ useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'
import { useParams } from 'react-router-dom'
import UserProfileContent from './UserProfileContent/UserProfileContent'

import './UserProfile.css'
import UserProfileSide from './UserProfileSide/UserProfileSide'

const UserProfile = () => {


  return (
    <section className="user">
      <div className="user__container">
      <UserProfileSide />
      <UserProfileContent />
      </div>
    </section>
  )
}

export default UserProfile
