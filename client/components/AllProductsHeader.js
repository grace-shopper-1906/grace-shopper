import React from 'react'
import {connect} from 'react-redux'
import {Input, Container, Header, Dropdown, Pagination} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {fetchProductsThunk, fetchCategoriesThunk} from '../store'
import _ from 'lodash'

class DisconnectedAllProductsHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      filter: null,
      sortBy: null
    }
    this.updateFilter = this.updateFilter.bind(this)
    this.setCategoriesDropdown = this.setCategoriesDropdown.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.callThunk = this.callThunk.bind(this)
    this.sort = this.sort.bind(this)
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getProducts(this.state.activePage)
    console.log('mount', this.props)
    // const unparsed = this.props.location.search
    // const query = queryString(unparsed)
    // // query === { page: 1, category: 'jewels' }
    // this.props.fetchProducts(query)
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

  sort(event) {
    this.setState({sortBy: event.target.value})
  }

  updateFilter(filter) {
    console.log('filter', filter)
    this.setState({
      filter
    })
    console.log('filter state', this.state)
    this.callThunk()
  }

  handlePaginationChange = (e, {activePage}) => {
    this.setState({activePage})
    console.log('pagination state', this.state)
    this.callThunk()
  }

  callThunk() {
    console.log('inside call thunk', this.state)
    // if (this.state.filter) {
    //   this.props.history.push(
    //     `/products?page=${this.state.activePage}&category=${this.state.filter}`
    //   )
    // } else {
    //   this.props.history.push(`/products?page=${this.state.activePage}`)
    // }
    this.props.getProducts(this.state.activePage, this.state.filter)
  }

  render() {
    const {activePage} = this.state

    return (
      <Container>
        <Header as="h2">All Products</Header>
        <Container textAlign="center" style={{marginBottom: '2rem'}} />
        <Input
          style={{margin: '1rem'}}
          action={{icon: 'search'}}
          placeholder="Search..."
          onClick={this.search}
        />
        <Dropdown
          style={{margin: '1rem'}}
          placeholder="Sort by..."
          search
          clearable
          options={[
            {key: 1, text: 'Name', value: 'name'},
            {key: 2, text: 'Rating', value: 'rating'},
            {key: 3, text: 'Price (low to high)', value: 'price'},
            {key: 4, text: 'Price (high to low)', value: 'priceDesc'}
          ]}
          selection
          onChange={this.sort}
        />
        <Dropdown
          style={{margin: '1rem'}}
          placeholder="Filter"
          search
          clearable
          options={this.setCategoriesDropdown()}
          selection
          onChange={event => {
            this.updateFilter(event.target.innerText)
          }}
        />
        <Container textAlign="center" style={{marginBottom: '1rem'}}>
          <Container textAlign="center" style={{margin: '1rem'}}>
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={this.props.pages}
            />
          </Container>
        </Container>
      </Container>
    )
  }
}

const mapState = state => {
  // let sortedProducts

  // if (!this.state.sortBy) {
  //   sortedProducts = state.products
  // } else {
  //   sortedProducts = _.sortBy(state.products, [this.state.sortBy])
  // }

  return {
    products: state.products,
    categories: state.categories,
    pages: state.products.pages
  }
}

const mapDispatch = dispatch => {
  return {
    getCategories: () => dispatch(fetchCategoriesThunk()),
    getProducts: (page, category) =>
      dispatch(fetchProductsThunk(page, category))
  }
}

export default connect(mapState, mapDispatch)(DisconnectedAllProductsHeader)
