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
            
            case 'CHECKOUT':
                    return state=[] 

        default:
                return state    
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
      units: existingProduct.units + product.units
    };
  
    updatedCart[productIndex] = updatedUnitsProduct;
  
    return updatedCart;
  };
