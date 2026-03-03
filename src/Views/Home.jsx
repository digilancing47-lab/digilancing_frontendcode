import Section1 from '../Components/Section1';
import Section2 from '../Components/Section2';
import Section3 from '../Components/Section3';
import Section4 from '../Components/Section4';
import Section5 from '../Components/Section5';
import Section7 from '../Components/Section7';
import Footer from '../Components/Footer';
import Note from "../Components/Note"
import RecommendedJobs from '../Components/RecommendedJobs';

const Home = () => {
    return (
        <div  className='cursor-default bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4]' >
            <Section1 />
            <Section2 />
            <div className='bg-white mx-auto '>
                <Section3 />
            </div>
  
                 <Section4/>    
         
            <Section5 />
            <div className='bg-white'>
                <RecommendedJobs />
            </div>
            <Section7 />
            <Note
          message="Digilancing is not liable for any payments made outside our official website or verified platforms. Please ensure that all transactions are completed only through authorized channels and affiliate links to prevent scams or fraudulent activities."
        />

            <Footer/>
        </div>
    );
};

export default Home;
