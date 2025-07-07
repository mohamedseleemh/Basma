import Navigation from '../components/Navigation';
import Booking from '../components/Booking';

const BookingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Booking />
      </div>
    </div>
  );
};

export default BookingPage;
