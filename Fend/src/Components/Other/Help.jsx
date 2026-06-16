import React, { useState } from 'react'
import './Other.css'

const Help = () => {

  let [open, setOpen] = useState(null)

  let faq = [
    {
      question: "How do I create an account?",
      answer: "Go to User Register or Business Register page and fill all required details."
    },

    {
      question: "How do I login?",
      answer: "Click on User Login or Business Login and enter your email and password."
    },

    {
      question: "How do I add products?",
      answer: "Business users can add products from Add Product page after login."
    },

    {
      question: "How do I order products?",
      answer: "Users can add products to cart and place orders from Cart page."
    },

    {
      question: "How do I reset password?",
      answer: "Go to Forgot Password page and verify OTP sent to your email."
    }
  ]


  return (

    <div className='helpmain'>
        <div className='helpheader'>
          <h1>Help Center</h1>

          <p>
            Welcome to our support center. Here you can find answers to common questions.
          </p>
        </div>


        <div className='faqcontainer'>

          {faq.map((item, index) => (

            <div className='faqbox' key={index}>

              <div
                className='faqquestion'
                onClick={() => {
                  setOpen(open === index ? null : index)
                }}
              >

                <h3>{item.question}</h3>

                <span>
                  {open === index ? "-" : "+"}
                </span>

              </div>


              {open === index && (

                <div className='faqanswer'>
                  <p>{item.answer}</p>
                </div>

              )}

            </div>

          ))}

        </div>


        <div className='contacthelp'>

          <h2>Still Need Help?</h2>

          <p>Email: support@ecommerce.com</p>

          <p>Phone: +91 9876543210</p>

        </div>
    </div>

  )
}

export default Help