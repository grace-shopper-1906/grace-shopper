import React from 'react'
import {connect} from 'react-redux'
import {
  Input,
  Container,
  Header,
  Dropdown,
  Pagination,
  Button,
  Icon
} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {fetchProductsThunk, fetchCategoriesThunk} from '../store'
import _ from 'lodash'

class DisconnectedAllProductsHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      filter: null,
      sortBy: null,
      searchBy: null
    }
    this.updateFilter = this.updateFilter.bind(this)
    this.setCategoriesDropdown = this.setCategoriesDropdown.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.callThunk = this.callThunk.bind(this)
    this.sort = this.sort.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getProducts(this.state.activePage, this.state.filter)

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

  handleChange(event) {
    this.setState({searchBy: event.target.value})
  }

  async sort(event) {
    await this.setState({sortBy: event.target.innerText})
    this.callThunk()
  }

  async updateFilter(filter) {
    await this.setState({
      filter
    })
    this.callThunk()
  }

  async handlePaginationChange(e, {activePage}) {
    await this.setState({activePage})
    this.callThunk()
  }

  callThunk() {
    console.log('inside call thunk', this.state)
    this.props.getProducts(
      this.state.activePage,
      this.state.filter,
      this.state.sortBy,
      this.state.searchBy
    )
  }

  render() {
    const {activePage} = this.state

    return (
      <Container>
        <Header as="h2">All Products</Header>
        <Container textAlign="center" style={{marginBottom: '2rem'}} />
        <Input placeholder="Search..." onChange={this.handleChange} />
        <Button onClick={this.callThunk}>
          <Icon name="search" />
        </Button>
        <Dropdown
          style={{margin: '1rem'}}
          placeholder="Sort by..."
          search
          clearable
          options={[
            {key: 1, text: 'Title', value: 'title'},
            {key: 2, text: 'Price', value: 'price'}
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
            console.log('event', event.target.innerText)
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
    getProducts: (page, category, sortBy, searchBy) =>
      dispatch(fetchProductsThunk(page, category, sortBy, searchBy))
  }
}

export default withRouter(
  connect(mapState, mapDispatch)(DisconnectedAllProductsHeader)
)
