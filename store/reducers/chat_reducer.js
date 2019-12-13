export default function(state=[],action){
    switch(action.type){
        case 'NEW_MSG':
            return [
                ...state,
                {
                _id:Math.round(Math.random() * 1000000),
                text:action.payload,
                createdAt:new Date(),
                user: {
                    _id: Math.round(Math.random() * 1000000),
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
            },
            
        ] || []
        default:
            return state   
    }
}