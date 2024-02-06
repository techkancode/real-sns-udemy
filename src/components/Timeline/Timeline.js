import React, { useContext, useEffect, useState } from 'react'
import "./Timeline.css";
import Share from '../Share/Share';
import Post from '../Post/Post';
//import {Posts} from "../../dummyData"
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';


export default function Timeline({username}) {
const [posts, setPosts] = useState([]);

const {user} = useContext(AuthContext)

useEffect(() => {
  const fetchPosts = async () => {
    const response = username 
    ? await axios.get(`/posts/profile/${username}`) 
    : await axios.get(`/posts/timeline/${user._id}`)
    setPosts(response.data);
  }
  fetchPosts();
}, [username, user._id]);

  return (
    <div className='timeline'>
      <div className="timelineWrapper">
        <Share/>
        {posts.map((post) => (
          <Post post={post} key={post._id}/>
        ))}
      </div>
    </div>
  )
}
