import Section1 from '../Components/Section1';
import Section2 from '../Components/Section2';
import Section3 from '../Components/Section3';
import Section4 from '../Components/Section4';
import Section5 from '../Components/Section5';
import Section7 from '../Components/Section7';
import Footer from '../Components/Footer';
import Note from "../Components/Note"

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
            <Note
          message="Digilancing is not liable for any payments made outside our official website or verified platforms. Please ensure that all transactions are completed only through authorized channels and affiliate links to prevent scams or fraudulent activities."
        />

            <Footer/>
        </div>
    );
};

export default Home;
