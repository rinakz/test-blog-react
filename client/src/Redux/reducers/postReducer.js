import { GET_ALL_POSTS, DELETE_POSTS, EDIT_POSTS } from "../type"

export const postReducer = (state = [], action) => {
  const { type, payload } = action
  
  switch (type) {
    case GET_ALL_POSTS:
      return payload  
    case DELETE_POSTS:
      return state.filter(el => el.id != payload)   
      default:
          return state
  }
}
