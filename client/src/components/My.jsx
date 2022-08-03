import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePOSTS, getAllPosts } from '../Redux/action';

function My() {

const dispatch = useDispatch()

const { posts } = useSelector(s => s)
const { authuser } = useSelector(s => s)
const [edit, setEdit] = useState(false)
const [editProfile, setEditProfile] = useState(false)
const [text, setText] = useState('')
const [name, setName] = useState('')
const [update, setupdate] = useState(false)
const [img, setImg] = useState(null)
useEffect(() => {
  dispatch(getAllPosts())
}, [update])

const handleSubmit = (e) => {
  e.preventDefault()
  const data = new FormData()
  data.append('text', text)
  data.append('image', img)
  fetch(`/posts/${edit}`, {
    method: 'put',
    body: data
  }).then(res => {console.log(res); setText(''); setEdit(false); setupdate(prev => !prev)})
}

const handleSubmitProfile = (e) => {
  e.preventDefault()
  const data = new FormData()
  data.append('name', name)
  data.append('image', img)
  fetch(`/${editProfile}`, {
    method: 'put',
    body: data
  }).then(res => {console.log(res); setName(''); setEditProfile(false); setupdate(prev => !prev)})
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
      <div className='yourProfile'>
        <img src={`${userImage(authuser.image)}`}></img>
      </div>
            {editProfile ? 
            <form onSubmit={handleSubmitProfile}>
            <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></input>
            <label>
            <input className='hideInput'
            type="file"
            name="image"
            onChange={(e) => setImg(e.target.files[0])}
            ></input>
            <div className='addFile'>SELECT FILE</div>
            </label>
            <div className="send">
            <button type="submit">EDIT</button>
            <button type="click" onClick={(e) => {
            e.preventDefault()
            setEditProfile(false)
            }}>CLOSE</button>
            </div>
            </form> :
            true}
        <div className='yourProfile'>
        <h1>{authuser.name}</h1>
        <p>{authuser.email}</p>
        <button className='editProfileBtn' onClick={() => {setEditProfile(authuser.id); setName(authuser.name)}}>EDIT PROFILE</button>
        <div>
          <hr></hr>
        </div>
        <h3>My messages:</h3>
        <h1>{posts.filter(el => el.user_id == authuser.id).length}</h1>
      </div>
      {edit ? 
            <form onSubmit={handleSubmit}>
            <h2>EDIT YOUR MESSAGE</h2>
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
            ></input>
          <div className='addFile'>SELECT FILE</div>
          </label>
          <div className="send">
          <button type="submit">EDIT</button>
          <button type="click" onClick={(e) => {
            e.preventDefault()
            setEdit(false)
            }}>CLOSE</button>
          </div>
          </form> :
          true}
      <div className='blog'>
        <div className='blogName'>
          <h2 className='blogLine'>MESSAGE</h2>
        </div>
        { posts.length>0 ? posts.sort((a, b) => b.id - a.id).filter(el => el.user_id == authuser.id).map(el => <div key={el.id} className='message'>
          <div className='userMess'>
            <img src={`${userImage(el.User.image)}`}></img>
            <p className='name'>{el.User.name}</p>
          </div>
          <div className='userPost'>
            <h2>{el.text}</h2>
            <div>{el.image && <img className='postImg' src={el.image} alt="img" />}</div>
            <span className='time'>{postDate(el.createdAt)}</span>
          </div>
          <div className='btn'>
            <button className='delbtn' onClick={() => dispatch(deletePOSTS(el.id))}>X</button>
            <button className='editbtn' onClick={() => {setEdit(el.id); setText(el.text)}}>EDIT</button>
          </div>
        </div> ) :
        <p>No posts</p>
        }
      </div>
    </div>
    
  )
}

export default My
