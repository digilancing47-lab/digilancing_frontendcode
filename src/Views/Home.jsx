import Section1 from '../Components/Section1';
import Section2 from '../Components/Section2';
import Section3 from '../Components/Section3';
import Section4 from '../Components/Section4';
import Section5 from '../Components/Section5';
import Section7 from '../Components/Section7';
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
            <Section7 />
            <Footer/>
        </div>
    );
};

export default Home;
