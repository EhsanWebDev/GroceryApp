export default function(state=[],action){
    switch(action.type){
        case 'ADD_TO_CART':
            const product = action.payload;
            const cart = state;
      
            const existingProductIndex = findProductIndex(cart, product.id);
      
            const updatedCart = existingProductIndex >= 0 
                ? updateProductUnits(cart, product)
                : [...cart, product];
      
            return updatedCart;

          case 'EMPTY':
              return state=[]
            case 'REMOVE_FROM_CART':
                    return state.filter(cartItem => cartItem.id !== action.payload.id)
            case 'REMOVE_ONE':
                const products = action.payload;
                const cartItems = state;
          
                const existingProductsIndex = findProductIndex(cartItems, products.id);
          
                const updatedCarts = existingProductsIndex >= 0 
                    ? removeOne(cartItems, products)
                    : [...cartItems, products];
          
                return updatedCarts;
            
            case 'CHECKOUT':
                    return state=[] 

        default:
                return state    
    }
}

const removeOne=(cart,product)=>{
  const productIndex = findProductIndex(cart, product.id);

  const updatedCart = [...cart];
  const existingProduct = updatedCart[productIndex];
  if(existingProduct.units>1){
    const updatedUnitsProduct = {
      ...existingProduct,
      units: existingProduct.units - 1
    };
    updatedCart[productIndex] = updatedUnitsProduct;
    return updatedCart;
  }
  else{
   return cart.filter(cartItem => cartItem.id !== product.id)
  }
 
  
 
}

const findProductIndex = (cart, productID) => {
    return cart.findIndex(p => p.id === productID);
  };
  
  const  updateProductUnits = (cart, product) => {
    const productIndex = findProductIndex(cart, product.id);
  
    const updatedCart = [...cart];
    const existingProduct = updatedCart[productIndex];
  
    const updatedUnitsProduct = {
      ...existingProduct,
      units: existingProduct.units + 1
    };
  
    updatedCart[productIndex] = updatedUnitsProduct;
  
    return updatedCart;
  };
