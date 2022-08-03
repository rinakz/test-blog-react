import { LOGIN, LOGOUT } from '../type';

export const authuserReducer = (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

