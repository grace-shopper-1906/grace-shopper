import React from 'react'
import {connect} from 'react-redux'
import {Card, Container} from 'semantic-ui-react'
import {
  fetchProductsThunk,
  fetchCategoriesThunk,
  filterProductsThunk
} from '../store'
import ProductsCard from './ProductCard'
import AllProductsHeader from './AllProductsHeader'
import {withRouter} from 'react-router-dom'

class DisconnectedAllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      filter: null
    }
    this.updateFilter = this.updateFilter.bind(this)
    this.setCategoriesDropdown = this.setCategoriesDropdown.bind(this)
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getProducts(this.state.activePage)

    // const unparsed = this.props.location.search
    // const query = queryString(unparsed)
    // // query === { page: 1, category: 'jewels' }
    // this.props.fetchProducts(query)
  }

  updateFilter(filter) {
    console.log('filter', filter)
    this.setState({
      filter
    })
    console.log('state', this.state)
    //update url and dispatch thunk to do get api
    this.props.filterProducts(this.state.activePage, this.state.filter)
  }

  setCategoriesDropdown() {
    const categories = this.props.categories.map(category => {
      return category.name
    })
    let options = []
    let i = 0
    categories.map(category => {
      i++
      let obj = {
        key: category + i,
        value: category,
        text: category
      }
      options.push(obj)
    })
    return options
  }

  handlePaginationChange = (e, {activePage}) => {
    this.setState({activePage})
    this.props.filterProducts(this.state.activePage, this.state.filter)
  }

  render() {
    const products = this.props.products

    if (!products || products.length === 0) {
      return (
        <Container textAlign="center" style={{marginTop: '5rem'}}>
          <AllProductsHeader
            search={this.props.searchProducts}
            filter={this.props.filterProducts}
            activePage={this.state.activePage}
            handlePaginationChange={this.handlePaginationChange}
            options={this.setCategoriesDropdown()}
            updateFilter={this.updateFilter}
          />
          <p>No Products Found</p>
        </Container>
      )
    }
    return (
      <Container textAlign="center" style={{marginTop: '5rem'}}>
        <AllProductsHeader
          search={this.props.searchProducts}
          filter={this.props.filterProducts}
          activePage={this.state.activePage}
          handlePaginationChange={this.handlePaginationChange}
          options={this.setCategoriesDropdown()}
          updateFilter={this.updateFilter}
        />
        <Card.Group stackable>
          {products.map(product => (
            <ProductsCard product={product} key={product.id} />
          ))}
        </Card.Group>
      </Container>
    )
  }
}

const mapState = state => {
  // let filteredProducts

  // if (state.filter === 'ALL') {
  //   filteredProducts = state.products
  // } else {
  //   filteredProducts = state.products.filter(product =>
  //     product.categories.includes(state.filter)
  //   )
  // }
  return {
    products: state.products,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProductsThunk()),
    getCategories: () => dispatch(fetchCategoriesThunk()),
    filterProducts: (page, category) =>
      dispatch(filterProductsThunk(page, category))
  }
}

export default withRouter(
  connect(mapState, mapDispatch)(DisconnectedAllProducts)
)
