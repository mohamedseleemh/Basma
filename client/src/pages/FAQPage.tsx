import Navigation from '../components/Navigation';
import FAQ from '../components/FAQ';

const FAQPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <FAQ />
      </div>
    </div>
  );
};

export default FAQPage;
