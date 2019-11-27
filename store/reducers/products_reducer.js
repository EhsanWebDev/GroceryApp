export default function(state=[],action){
    switch(action.type){
        case 'PRODUCTS_LIST':
            return action.payload || false
        default:
            return state   
    }
}