export default function(state=[],action){
    switch(action.type){
        case 'CATEGORIES_LIST':
            return action.payload || false
        default:
            return state   
    }
}