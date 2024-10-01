export const initialState = {
  user: null,
  user_color: null,
  user_point_text: null,
  test: null
};

// Selector
const reducer_s = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "SET_COLOR":
        return {
          ...state,
          user_color: action.user
        };
    case "SET_POINT_TEXT":
        return {
          ...state,
          user_point_text: action.user
        };
    case "SET_TEST":
        return {
          ...state,
          test: action.user
        }

    default:
      return state;
  }
};

export default reducer_s;


//for OTP authentication, created new condition in reducer
//Once user sign-in, they will be directed to the OTP page for entering the OTP code
//Make sure that all other page are locked until both user and cond meet the True condition

//In OTP_Authentication, set the cond_test to be true once the user enter the correct OTP code

//In the app, updated the protected page to only allow open if the cond is met
//Added condition parameter to control the access