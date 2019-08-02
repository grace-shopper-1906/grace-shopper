import axios from 'axios'

const GET_SHIPPING_ADDRESS = 'GET_SHIPPING_ADDRESS'

export const getShippingAddress = address => ({
  type: GET_SHIPPING_ADDRESS,
  address
})

export const fetchShippingAddress = id => async dispatch => {
  const {data: address} = await axios.get(`/api/checkout`, id)
  dispatch(getShippingAddress(address))
}

export function checkoutReducer(address = '', action) {
  switch (action.type) {
    case GET_SHIPPING_ADDRESS:
      return action.address
    default:
      return address
  }
}
