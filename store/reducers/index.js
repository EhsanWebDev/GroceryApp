import {combineReducers} from 'redux';
import categories from './catagories_reducer';
import cart from './cart_reducer'
import subcategories from './subcat_reducer'
import products from './products_reducer'
import allProducts from './allProducts_reducer'
import user from './user_reducer'
import order from './order_reducer'
const rootReducer = combineReducers({
    categories,
    cart,
    subcategories,
    products,
    allProducts,
    user,
    order
})

export default rootReducer;