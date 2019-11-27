export default function(state={},action){

   

    switch(action.type){
        case 'SIGN_UP':
            
            return {
                res:{
                    ...state,
                    res:action.payload.status || false
                }
            }

            case 'UPDATE_USER':
            
                return {
                    res:{
                        ...state,
                        res:action.payload.status || false
                    }
                }

                case 'SIGN_IN':
                    return {
                        ...state,
                        auth:
                            action.payload || false,
        
                        
                    }
            case 'SIGN_OUT':
                return {
                    ...state,
                    auth:
                        action.payload || false,
                    
                }

            case 'AUTO_SIGN_IN':
                return {
                    ...state,
                    auth:
                        action.payload || false
    
                    
                }
        

     default:
            return state       
    }
}
