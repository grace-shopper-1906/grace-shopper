import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_ORDERS = 'GET_ORDERS'
const CANCEL_ORDER = 'CANCEL_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const setOrders = orders => ({type: SET_ORDERS, orders})

const cancelOrder = orderId => ({type: CANCEL_ORDER, orderId})

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

export const cancelOrderThunk = orderId => async dispatch => {
  console.log('in thnk')
  try {
    await axios.put(`/api/order/cancel/${orderId}`)
    dispatch(cancelOrder(orderId))
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
    case CANCEL_ORDER: {
      // ??????
      const newState = [...state]
      return newState.map(order => {
        if (order.id === action.orderId) {
          let newOrder = order
          newOrder.status = 'cancelled'
          return newOrder
        } else return order
      })
    }
    default:
      return state
  }
}
