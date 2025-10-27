import React from 'react'
import Section1 from '../Components/Packages/Section1'
import Section2 from '../Components/Packages/Section2'
import Section3 from '../Components/Packages/Section3'
import Section4 from '../Components/Packages/Section4'
import Section7 from '../Components/Section7'
import Section8 from '../Components/Section8'
import Footer from '../Components/Footer'
import packagesData from '../Data/packagesData'
import Note from "../Components/Note"


const UltimatePackages = () => {
  const data = packagesData.ultimate;
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
      <Section2 courses={data.courses}/>
      <Section3 />
      <Section4 />
      <Section7 />
       <Note
          message="Digilancing is not liable for any payments made outside our official website or verified platforms. Please ensure that all transactions are completed only through authorized channels and affiliate links to prevent scams or fraudulent activities."
        />
      {/* <Section8 /> */}
      <Footer />
    </div>
  )
}

export default UltimatePackages