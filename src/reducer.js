export const initialState = {
  user: null,
  cond_test: null,
  user_email: null
};

// Selector
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "SET_COND":
      return {
        ...state,
        cond_test: action.user
      };
    case "SET_EMAIL":
      return {
        ...state,
        user_email: action.user
      }

    default:
      return state;
  }
};

export default reducer;


//for OTP authentication, created new condition in reducer
//Once user sign-in, they will be directed to the OTP page for entering the OTP code
//Make sure that all other page are locked until both user and cond meet the True condition

//In OTP_Authentication, set the cond_test to be true once the user enter the correct OTP code

//In the app, updated the protected page to only allow open if the cond is met
//Added condition parameter to control the access