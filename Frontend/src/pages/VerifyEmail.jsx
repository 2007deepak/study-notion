import  React, { useEffect, useState } from "react";
import OTPInput from 'react-otp-input';
import { useSelector } from "react-redux";
import { signUp, sendOtp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
    const [otp,setOtp] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signupData } = useSelector((state) => state.auth);  

     useEffect(() => {
       if (!signupData) {
         navigate("/signup");
       }
     }, []); 

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
         } = signupData;
           dispatch(signUp(accountType, firstName,lastName,email, password , confirmPassword, otp, navigate));

        }     
  return (
    <div className="text-white">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>
            We have sent an OTP to your email. Please check your inbox and spam
            folder.
          </p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (<input {...props} placeholder="-"
              className="w-full p-6 bg-richblack-600 text-richblack-5"/>)}
            />
            <button type="submit">Verify Email</button>
          </form>
          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
          <button onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail
