export default function(state=[],action){
    
    switch(action.type){
        case 'ADD_ADDRESS':
                 return {
                            ...state,
                            address:
                                action.payload || false,
                        }
        case 'CHOOSE_ADDRESS':
                                return {
                                           ...state,
                                           address:
                                               action.payload || false,
                                       }              
         default:
             return state               
    }
   
}