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
import queryString from 'query-string'

class DisconnectedAllProductsHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      category: null,
      sortBy: null,
      searchBy: ''
    }
    this.updateFilter = this.updateFilter.bind(this)
    this.setCategoriesDropdown = this.setCategoriesDropdown.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.callThunk = this.callThunk.bind(this)
    this.sort = this.sort.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const unparsed = this.props.location.search
    const query = queryString.parse(unparsed)
    query.page = parseInt(query.page, 10)
    await this.setState(query)
    this.props.getProducts(
      this.state.page,
      this.state.category,
      this.state.sortBy,
      this.state.searchBy
    )
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

  async updateFilter(category) {
    await this.setState({category})
    this.callThunk()
  }

  async handlePaginationChange(e, {activePage}) {
    await this.setState({page: activePage})
    this.callThunk()
  }

  callThunk() {
    this.props.getProducts(
      this.state.page,
      this.state.category,
      this.state.sortBy,
      this.state.searchBy
    )
  }

  render() {
    const {page} = this.state

    return (
      <Container>
        <Header as="h2">All Products</Header>
        <Container textAlign="center" style={{marginBottom: '2rem'}} />
        <Input
          placeholder="Search..."
          onChange={this.handleChange}
          value={this.state.searchBy}
        />
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
          value={this.state.sortBy}
          selection
          onChange={this.sort}
        />
        <Dropdown
          style={{margin: '1rem'}}
          placeholder="Filter"
          search
          clearable
          value={this.state.category}
          options={this.setCategoriesDropdown()}
          selection
          onChange={event => {
            this.updateFilter(event.target.innerText)
          }}
        />
        <Container textAlign="center" style={{marginBottom: '1rem'}}>
          <Container textAlign="center" style={{margin: '1rem'}}>
            <Pagination
              activePage={page}
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
