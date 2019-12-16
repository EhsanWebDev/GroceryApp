export default function(state=[],action){
    
    switch(action.type){
        case 'ADD_ADDRESS':
                 return {
                            ...state,
                        
                        }
        case 'ALL_ADDRESS':
                return {
                        address:
                             action.payload || false,
                    } 
                    
         case 'DEFAULT_ADDRESS':{
             return{
                 ...state,
                 defaultAddress: [action.payload || false]
             }
         }
         case 'DELETE_ADDRESS':{
           return{
               address:state.address.filter(address => address.ID !== action.payload.ID)
           } 
         }                 
         default:
             return state               
    }
   
}