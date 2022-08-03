import axios from "axios";
import { LOGIN, LOGOUT, DELETE_POSTS, GET_ALL_POSTS} from "./type";

export const actionLogin = (data) => ({
  type: LOGIN, payload: data
})
export const actionLogout = () => ({
  type: LOGOUT
})

export const getAllPosts = () => async (dispatch) => {
  const response = await axios('/posts')
  dispatch({type: GET_ALL_POSTS, payload: response.data});
}

export const deletePOSTS = (id) => async (dispatch) => {
  const response = await axios.delete(`/posts/${id}`)
  dispatch({type: DELETE_POSTS, payload: id})
}
