import React, {useState} from 'react'
import {useSelector} from "react-redux"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
     const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    
    const {password, confirmPassword} = formData;
    const {token} = useParams();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }
        ))
    }

const handleOnSubmit = (e) => {
    e.preventDefault();
    //const token = location.pathname.split('/').at(-1);
 
    dispatch(resetPassword({ password, confirmPassword, token }));

}

    const location = useLocation();

  return (
    <div className="text-white">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>
          <p>Atmost done. Enter your new Password and your all set.</p>
          <form onSubmit={handleOnSubmit}>
            <label>
              <p>New Password</p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="New password"
                className="w-[150px] p-6 bg-richblack-600 text-richblack-5"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>

            <label>
              <p>Confirm New Password</p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-[150px] p-6 bg-richblack-600 text-richblack-5"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </label>

            <button type="submit">Reset Password</button>
          </form>
          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePassword;
