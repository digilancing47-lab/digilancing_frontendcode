
import Section1 from '../Components/Courses/Section1';
import Section2 from '../Components/Courses/Section2';
import Section3 from '../Components/Courses/Section3';
import Footer from '../Components/Footer';

const Courses = () => {
    return (
             <div  className='cursor-default' >
                <Section1 />
                <Section2/>
                <Section3 />
                <Footer />
            </div>

        
    );
};

export default Courses;
