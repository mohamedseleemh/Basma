import Navigation from '../components/Navigation';
import About from '../components/About';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <About />
      </div>
    </div>
  );
};

export default AboutPage;
