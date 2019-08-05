import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const setOrders = orders => ({type: SET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const getOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/order')
    if (data !== '') dispatch(setOrders(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case SET_ORDERS: {
      return action.orders
    }
    default:
      return state
  }
}
