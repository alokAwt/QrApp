import { BaseUrl } from "./BaseUrl";

//---------------Sign Up-------------------//
export const SignUpUsers = async (data) => {
    try {
      let result = await fetch(`${BaseUrl}/Users/Signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };
  
  //----------------Sign In---------------------//
  export const SignInUsers = async (data) => {
    try {
      let result = await fetch(`${BaseUrl}/Users/Signin`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };
  
  //------------------Otp Send-------------------//
  export const OtpSend = async (data) => {
    try {
      let result = await fetch(`${BaseUrl}/Users/otp`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      result = await result.json();
      return result;
    } catch (error) {
      return error.message;
    }
  };