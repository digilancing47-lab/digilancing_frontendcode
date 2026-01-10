
import Section1 from '../Components/Courses/Section1';
import Section2 from '../Components/Courses/Section2';
import Section3 from '../Components/Courses/Section3';
import Footer from '../Components/Footer';
import Note from "../Components/Note"

const Courses = () => {
    return (
             <div  className='cursor-default courses-page' >
                <Section1 />
                <Section2/>
                <Section3 />
                 <Note
          message="Digilancing is not liable for any payments made outside our official website or verified platforms. Please ensure that all transactions are completed only through authorized channels and affiliate links to prevent scams or fraudulent activities."
        />
                <Footer />
            </div>

        
    );
};

export default Courses;
