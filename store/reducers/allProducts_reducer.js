export default function(state=[],action){
    switch(action.type){
        case 'ALL_PRODUCTS':
            return action.payload || false
        default:
            return state   
    }
}