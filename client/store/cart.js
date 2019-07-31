import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})

/**
 * THUNK CREATORS
 */
export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    if (data !== '') dispatch(setCart(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case SET_CART: {
      return action.cart
    }
    default:
      return state
  }
}
