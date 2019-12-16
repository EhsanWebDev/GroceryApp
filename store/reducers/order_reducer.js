export default function(state=[],action){
    switch(action.type){
        case 'PLACE_ORDER':
            return {
                ...state,
                id:action.payload || false
            }

            case 'GET_ORDERS':
                return action.payload || false
                
           case 'ORDER_ADDRESS':
               return action.payload || false             
           case 'DELETE_ORDER':
               return state.filter(orders=>orders.ID !== action.payload)     

        default:
            return state   
    }
}