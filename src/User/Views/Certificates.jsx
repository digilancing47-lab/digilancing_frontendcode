import React from 'react'
import Section1 from "../../Components/Courses/Section1";
import Certificatesmain from '../Components/Certificatesmain';
import Footer from '../../Components/Footer';
const Certificates = () => {
  return (
    <div className='certificates-page'>
        <div className="hero-section">
            <Section1/>
        </div>
        <div className="content-section">
            <Certificatesmain/>
            <Footer/>
        </div>
    </div>
  )
}

export default Certificates