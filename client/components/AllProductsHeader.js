import React from 'react'
import {
  Button,
  Input,
  Container,
  Header,
  Dropdown,
  Pagination
} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const AllProductsHeader = props => (
  <Container>
    <Header as="h2">All Products</Header>
    <Container textAlign="center" style={{marginBottom: '2rem'}} />
    <Input
      style={{margin: '1rem'}}
      action={{icon: 'search'}}
      placeholder="Search..."
      onClick={props.search}
    />
    <Dropdown
      style={{margin: '1rem'}}
      placeholder="Sort by..."
      search
      clearable
      options={[
        {key: 1, text: 'Name', value: 'name'},
        {key: 2, text: 'Rating', value: 'rating'},
        {key: 3, text: 'Price (low to high)', value: 'priceAsc'},
        {key: 4, text: 'Price (high to low)', value: 'priceDesc'}
      ]}
      selection
      onChange={props.sort}
    />
    <Dropdown
      style={{margin: '1rem'}}
      placeholder="Filter"
      search
      clearable
      options={props.options}
      selection
      onChange={event => {
        props.updateFilter(event.target.innerText)
      }}
    />
    <Container textAlign="center" style={{marginBottom: '1rem'}}>
      <Container textAlign="center" style={{margin: '1rem'}}>
        <Pagination
          activePage={props.activePage}
          onPageChange={props.handlePaginationChange}
          totalPages={10}
        />
      </Container>
    </Container>
  </Container>
)

export default AllProductsHeader
