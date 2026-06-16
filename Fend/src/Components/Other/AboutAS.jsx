import React from 'react'
import './Other.css'
import raj from '../../assets/RajPhoto.jpeg'
import samson from '../../assets/sanjusamson.jpg'


export const AboutAS = () => {
  return (
    <div id='aboutas' className='mainaboutas'>
      <div className='aboutas'>
        <div className='aboutusleft'>
          <h1>About Us :</h1>
          <p>Welcome to our e-commerce platform! We are dedicated to providing a seamless and enjoyable shopping experience for our customers. 
            Our mission is to connect buyers and sellers, offering a wide range of products at competitive prices. 
            We strive to create a user-friendly interface, secure transactions, and excellent customer service. 
            Thank you for choosing us for your shopping needs!</p>
          <h1>Our Team :</h1>
          <p>Our team is composed of passionate individuals who are committed to delivering the best online shopping experience. 
            We have experts in various fields, including technology, customer service, and logistics,
             working together to ensure that our platform runs smoothly and efficiently.</p>
        </div>
        
        <div className='aboutusright'>
          <div className='mainteam' >
            <h2>Raj Parasram :</h2>
            <div className='team'>
              <img src={raj} alt="Raj Parasram" />
              <p>Raj is our lead developer, responsible for building and maintaining the technical infrastructure of our platform. 
                With a strong background in software development and a passion for innovation, 
                Raj ensures that our website is fast, secure, and user-friendly.</p>
            </div>
          </div>

          <div className='mainteam'>
            <h2>Sanju Samson :</h2>
            <div className='team'>
              <img src={samson} alt="Sanju Samson" />
              <p>Sanju is our customer service manager, dedicated to providing exceptional support to our customers. 
                With excellent communication skills and a deep understanding of our products, 
                Sanju ensures that our customers have a positive experience and their concerns are addressed promptly.</p>
            </div>
          </div>
        </div>

      </div>

      <div className='contactus'>
        <h1>Contact Us :</h1>
        <p> If you have any questions or feedback, feel free to reach out to us!</p>
        <div className='contactinfo'>
          <ul>
            <li>Email:  rajparasram101@gmail.com </li>
            <li>Phone:  9307615707</li>
            <li>Address:  A-52, Ram Nagar, Hill-Top, Nagpur. 440033</li>
          </ul>

          <ul>
            <li>Email:  sanjusamson101@gmail.com </li>
            <li>Phone:  9307615707</li>
            <li>Address:  123 Main Street, Anytown, India</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutAS;