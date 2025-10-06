import React from 'react'
import ContactUsForm from './ContactUsForm.jsx'

function ContactForm() {
  return (
    <div>
        <h1 className='text-3xl font-semibold text-white'>
            Got a Idea? We've got the skills.
            Let's team up

        </h1>
        <p className=''>
            Tell us more  about yourself and what you're got in mind.

        </p>

        <div className='mt-7'>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactForm
