import axios from 'axios'

const GET_USER_INFO = 'GET_USER_INFO'

export const setLoggedInUser = user => ({
  type: GET_USER_INFO,
  user
})

export const getUserInfo = () => async dispatch => {
  const {data: user} = await axios.get(`/api/checkout`)
  dispatch(setLoggedInUser(user))
}

export function checkoutReducer(user = '', action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.user
    default:
      return user
  }
}
