import React from 'react'
import Section1 from '../Components/Packages/Section1'
import Section2 from '../Components/Packages/Section2'
import Section3 from '../Components/Packages/Section3'
import Section4 from '../Components/Packages/Section4'
import Section7 from '../Components/Section7'
import Section8 from '../Components/Section8'
import Footer from '../Components/Footer'
import packagesData from '../Data/packagesData'


const BasicPackages = () => {
  const data = packagesData.basic;
  return (
    <div>
      <Section1 
        packageName={data.packageName}
        price={data.price}
        promoPrice={data.promoPrice}
        description={data.description}
        buttonText={data.buttonText}
        image= {data.image} 
      />
      <Section2  courses={data.courses}/>
      <Section3 />
      <Section4 />
      <Section7 />
      {/* <Section8 /> */}
      <Footer />
    </div>
  )
}

export default BasicPackages