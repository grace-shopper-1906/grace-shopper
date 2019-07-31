import axios from 'axios'

export const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = products => {
  return {type: SET_PRODUCTS, products}
}

export const fetchProductsThunk = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    dispatch(setProducts(products))
  }
}

export default (products = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return products
  }
}
