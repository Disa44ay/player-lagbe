import React from 'react'
import './Profile.css'
import PlayerCard from '../../components/PlayerCard/PlayerCard'
import PlayedIn from '../../components/PlayedIn/PlayedIn'

const Profile = () => {
  return (
    <div>
      <PlayerCard/>
      <PlayedIn/>
      
    </div>
  )
}

export default Profile
