import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../Redux/action';

function Blog() {

const dispatch = useDispatch()

const { posts } = useSelector(s => s)
const { authuser } = useSelector(s => s)
const [text, setText] = useState('')
const [update, setUpdate] = useState(true)
const [img, setImg] = useState(null)
useEffect(() => {
  dispatch(getAllPosts())
}, [update])

const handleSubmit = (e) => {
  e.preventDefault()
  const data = new FormData()
  data.append('text', text)
  data.append('image', img)
  fetch('/posts', {
    method: 'post',
    body: data
  }).then(res => {console.log(res); setText(''); setUpdate(prev => !prev)})
}

function userImage (image) {
  let imageDefault = 'avatar.png'
  return image ? image : imageDefault
}

function postDate (el) {
  let parseSec = Date.parse(el)
  const day = new Date(+parseSec).toLocaleString()
  return day
}

  return (  
    <div className='yourMess'>
      {authuser &&
      <form onSubmit={handleSubmit}>
        <h2>WRITE YOUR MESSAGE</h2>
        <input
        type="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        ></input>
      <label>
        <input className='hideInput'
        type="file"
        name="image"
        onChange={(e) => setImg(e.target.files[0])}
        />  
        <div className='addFile'>SELECT FILE</div>
      </label>
      <div className="send">
      <button type="submit">SEND</button>
      </div>
      </form> 
      }
      <div className='blog'>
        <div className='blogName'>
          <h2 className='blogLine'>NEW MESSAGE</h2>
        </div>
        { posts.length>0 ? posts.sort((a, b) => b.id - a.id).map(el => <div key={el.id} className='message'>
          <div className='userMess'>
            <img src={`${userImage(el.User.image)}`}></img>
            <p className='name'>{el.User.name}</p>
          </div>
          <div className='userPost'>
            <h2>{el.text}</h2>
            <div>{el.image && <img className='postImg' src={el.image} alt="img" />}</div>
            <span className='time'>{postDate(el.createdAt)}</span>
          </div>
        </div> ) :
        <p>No posts</p>
        }
      </div>
    </div>
    
  )
}

export default Blog
