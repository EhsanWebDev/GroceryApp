export default function(state = [], action) {
  switch (action.type) {
    case "ALL_REVIEWS":
      return {
        ...state,
        all_reviews: action.payload || false
      };
    default:
      return state;
  }
}
