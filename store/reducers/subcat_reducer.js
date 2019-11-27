export default function(state=null,action){
    switch(action.type){
        case 'SUBCATEGORIES_LIST':
            return action.payload || false
        default:
            return state   
    }
}