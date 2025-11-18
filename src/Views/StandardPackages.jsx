import React from 'react'
import Section1 from '../Components/Packages/Section1'
import Section2 from '../Components/Packages/Section2'
import Section3 from '../Components/Packages/Section3'
import Section4 from '../Components/Packages/Section4'
import Section7 from '../Components/Section7'
import Footer from '../Components/Footer'
import Note from "../Components/Note"
import usePackageData from '../hooks/usePackageData'

const StandardPackages = () => {
  const { packageData, loading } = usePackageData('DIGI0002');

  if (loading || !packageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Section1 
        packageName={packageData.packageName}
        price={packageData.price}
        promoPrice={packageData.promoPrice}
        description={packageData.description}
        buttonText={packageData.buttonText}
        image={packageData.image} 
      />
      <Section2 courses={packageData.courses}/>
      <Section3 />
      <Section4 />
      <Section7 />
      <Note
        message="Digilancing is not liable for any payments made outside our official website or verified platforms. Please ensure that all transactions are completed only through authorized channels and affiliate links to prevent scams or fraudulent activities."
      />
      <Footer />
    </div>
  )
}

export default StandardPackages