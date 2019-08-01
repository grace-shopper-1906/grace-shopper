import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []

/**
 * ACTION CREATORS
 */
const setCart = cart => ({type: SET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})

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

export const updateCartThunk = cartBody => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${cartBody.orderId}`, cartBody)
    if (data !== '') dispatch(updateCart(data))
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
    case UPDATE_CART: {
      return action.cart
    }
    default:
      return state
  }
}
