/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as MobileNav} from './MobileNav'
export {default as DesktopNav} from './DesktopNav'

export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './SingleProduct'
export {default as AllProducts} from './AllProducts'
export {default as CartList} from './CartList'
export {default as PlaceOrderButton} from './PlaceOrderButton'
export {default as CartItem} from './CartItem'
export {default as OrdersList} from './OrdersList'
export {default as OrderItem} from './OrderItem'
export {default as OrderProduct} from './OrderProduct'
