import axios from 'axios'
import history from '../history'

export const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = (products, pages) => {
  return {type: SET_PRODUCTS, products, pages}
}

export const fetchProductsThunk = (page, category) => {
  return async dispatch => {
    if (category) {
      const response = await axios.get(
        `/api/products/?page=${page}&category=${category}`
      )
      const products = response.data.results
      const pages = response.data.pages
      dispatch(setProducts(products, pages))
      history.push(`?page=${page}&category=${category}`)
    } else {
      const response = await axios.get(`/api/products/?page=${page}`)
      const products = response.data.results
      const pages = response.data.pages
      dispatch(setProducts(products, pages))
      history.push(`?page=${page}`)
    }
  }
}

export default (products = {}, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {items: action.products, pages: action.pages}
    default:
      return products
  }
}
