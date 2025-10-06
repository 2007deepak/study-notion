import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import countryCode  from '../../data/countryCode';

function ContactUsForm() {
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors,isSubmitSuccessful}
  
  } = useForm();

  const submitContactForm = async (data) => {
   

    console.log("from data",data);
    try{
      //api call kara rahe hai
       setLoading(true);
      // const response = await apiConnector("POST",  contactusEndpoint.CONTACT_US_API, data); 
      const response = {status: "OK"}
       console.log("Loading response",response);
       
       setLoading(false); 
    }
    catch(err){
      console.log("Error in contact form",err.message);
      setLoading(false);

    
  }
}
  useEffect(() => {
    if (!isSubmitSuccessful) {
      reset({
        email: "",
        message: "",
        firstname: "",
        lastname: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
   
 
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5">
        {/* firstName*/}

        <div className="flex  flex-row gap-5">
          <div className="flex flex-col gap-1 ">
            <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name
            </label>
            <input
              type="text"
              placeholder=" Enter First Name"
              id="firstname"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("firstname", { required: "First Name is required" })}
            />
            {errors.firstname && (
              <span>
                <p>Please enter Your name</p>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              id="lastname"
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("lastname", { required: "lastname is required" })}
            />
            {errors.lastname && (
              <span>
                <p>Please enter Your last name</p>
              </span>
            )}
          </div>
        </div>

        {/* email*/}
        <div className="flex flex-col gap-1">
          <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <span>
              <p>Please enter a valid email address</p>
            </span>
          )}
        </div>

        {/* phone no */}
        <div className="flex flex-col gap-1">
          <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Phone Number
          </label>
          <div className="flex flex-row gap-5">
            {/* Dropdown */}
            <div className="flex w-[80px] flex-col">
              <select
                name="dropdown"
                id="dropdown"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                {...register("countrycode", { required: true })}
              >
                {countryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code} {element.country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex- w-[calc(100%-80px)] flex-col ">
              <input
                type="number"
                name="phonenumber"
                id="phonnumner"
                placeholder="12345 67890"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
        </div>
        {errors.phoneNo && <span>{errors.phoneNo.message}</span>}

        {/* message */}

        <div className="flex flex-col gap-1">
          <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Message</label>
          <textarea
            type="text"
            placeholder="Enter Your Message"
            cols="30"
            rows={7}
            id="message"
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span>
              <p>Please enter your message</p>
            </span>
          )}
        </div>

        {/* <button type='submit' disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button> */}

        <button
          type="submit"
          className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black py-2"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}

export default ContactUsForm
