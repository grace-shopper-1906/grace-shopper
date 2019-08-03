import axios from 'axios'
import history from '../history'

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

export const filterProductsThunk = (page, category) => {
  return async dispatch => {
    if (category) {
      const response = await axios.get(
        `/api/products/?page=${page}&category=${category}`
      )
      const products = response.data
      dispatch(setProducts(products))
      history.push(`?page=${page}&category=${category}`)
    } else {
      const response = await axios.get(`/api/products/?page=${page}`)
      const products = response.data
      dispatch(setProducts(products))
      history.push(`?page=${page}`)
    }
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
