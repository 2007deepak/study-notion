import React from 'react'
import ContactForm from '../components/contactPage/ContactForm'
import Footer from '../components/common/Footer'


function Contact() {
  return (
    
    <>
    <div className=" flex flex-row justify-center space-x-10 ">
      <div className="flex flex-col text-richblack-300 space-y-8 bg-richblack-800 h-[400px] mt-16 pt-10 rounded-2xl p-10">
        {/* Chat Section */}

        <div className="flex items-start space-x-4 ">
          <div className="text-xl">💬</div>
          <div>
            <h1 className="font-semibold text-lg">Chat on us</h1>
            <p className="text-gray-400 text-sm">
              Our friendly team is here to help.
            </p>
            <p className="text-blue-400 text-sm mt-1">@mail address</p>
          </div>
        </div>
        {/* Visit Section */}
        <div className="flex items-start space-x-4">
          <div className="text-xl">🌐</div>
          <div>
            <h1 className="font-semibold text-lg">Visit us</h1>
            <p className="text-gray-400 text-sm">
              Come say hello at our office HQ.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Here is the location / address
            </p>
          </div>
        </div>

        {/* Call Section */}
        <div className="flex items-start space-x-4">
          <div className="text-xl">📞</div>
          <div>
            <h1 className="font-semibold text-lg">Call us</h1>
            <p className="text-gray-400 text-sm mt-1">
              Mon-Fri from 8am to 5pm. (+91) 123 456 7890
            </p>
          </div>
        </div>
      </div>
      {/* Form Section */}

      <div className="flex flex-col justify-center w-full md:w-[600px] text-richblack-300 mt-16 mb-24   border border-richblack-700 rounded-lg shadow-2xl p-10 md:p-16">
        <ContactForm />
      </div>
      
    </div>

    <div>
      {/* Horizontal Line */}
      
      <h1 className='text-white font-semibold text-center mb-10 pb-10 text-3xl'>Reviews from other learners</h1>
    </div>
    
       {/* Footer below */}
      <Footer />

    </>
    
    
    
  );
}

export default Contact
