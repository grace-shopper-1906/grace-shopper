import axios from 'axios'
import history from '../history'

export const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = (products, pages) => {
  return {type: SET_PRODUCTS, products, pages}
}

export const fetchProductsThunk = (page, category, sortBy, searchBy) => {
  return async dispatch => {
    let queryString = `?page=${page}`

    if (category) {
      queryString += `&category=${category}`
    }
    if (sortBy) {
      queryString += `&sortBy=${sortBy.toLowerCase()}`
    }
    if (searchBy) {
      queryString += `&searchBy=${searchBy}`
    }
    const response = await axios.get(`/api/products${queryString}`)

    const products = response.data.results
    const pages = response.data.pages
    dispatch(setProducts(products, pages))
    history.push(queryString)
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
