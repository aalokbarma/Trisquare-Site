const initialState = [{ data: "", country: "", login: false, approval: null, ProductId: "", searchValue: "", fitlter: ["suraj", "aalok"], userData: null, userIn: false, userOut: false }];

const rootReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "new": {
      return {
        ...state,
        data: action.data,
        login: true,
      };
    }
    case "login Success": {
      return {
        ...state,
        login: true,
      };
    }
    case "signOut": {
      return {
        ...state,
        login: false,
      };
    }
    case "reachProduct": {
      return {
        ...state,
        productId: action.productId,
      };
    }
    case "countryName": {
      return {
        ...state,
        country: action.country,
      };
    }
    case "submission Successful": {
      console.log("Succeessful");
      return {
        ...state,
      };
    }
    case "setUser": {
      return {
        ...state,
        userIn: action.userIn,
        userOut: action.userOut,
      };
    }
    case "filter added": {
      console.log("filter added");
      return {
        ...state,
      };
    }
    case "filter removed": {
      console.log("filter removed");
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
export default rootReducer;
