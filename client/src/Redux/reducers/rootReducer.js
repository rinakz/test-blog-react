import { authuserReducer } from './authuserReducer'
import { combineReducers } from 'redux'
import { postReducer } from './postReducer'

export const rootReducer = combineReducers({
authuser: authuserReducer,
posts: postReducer,
})
