export default function(state = [], action) {
  switch (action.type) {
    case "NEW_MSG":
      return [
        ...state,
        {
          _id: Math.round(Math.random() * 1000000),
          text: action.payload ? action.payload : "",
          createdAt: action.payload ? new Date() : null,
          user: {
            _id: Math.round(Math.random() * 1000000),
            name: "React Native",
            avatar: action.payload ? "https://placeimg.com/140/140/any" : null
          }
        }
      ];
    default:
      return state;
  }
}
