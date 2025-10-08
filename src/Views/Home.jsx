import Section1 from '../Components/Section1';
import Section2 from '../Components/Section2';
import Section3 from '../Components/Section3';
import Section4 from '../Components/Section4';
import Section5 from '../Components/Section5';
import Section6 from '../Components/Section6';
import Section7 from '../Components/Section7';
import Section8 from '../Components/Section8';
import Footer from '../Components/Footer';
const Home = () => {
    return (
        <div style={{ backgroundColor: '#002B54' }} className='cursor-default' >
            <Section1 />
            <Section2 />
            <div className='bg-white mx-auto '>
                <Section3 />
            </div>
            <div className='bg-[#0B2342]'>
                 <Section4/>    
            </div>
            <Section5 />       
            {/* <Section6 /> */}
            <Section7 />
            {/* <Section8 /> */}
            <Footer/>
        </div>
    );
};

export default Home;
