import Navigation from '../components/Navigation';
import Pricing from '../components/Pricing';

const PricingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Pricing />
      </div>
    </div>
  );
};

export default PricingPage;
