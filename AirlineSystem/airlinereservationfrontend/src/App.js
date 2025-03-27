import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Wallet from "./pages/Wallet";
import LandingPage from "./pages/LandingPage";
import PassengerRegister from "./pages/PassengerRegister";
import PassengerDashboard from "./pages/PassengerDashboard";
import AddAirport from "./pages/AddAirport";
import ViewAirports from "./pages/ViewAirports";
import BookingConfirmation from "./pages/BookingConfirmation";
import AddAirplane from "./pages/AddAirplane";
import ViewAirplanes from "./pages/ViewAirplanes";
import PaymentPage from "./pages/PaymentPage";
import FlightResults from "./pages/FlightResults";
import AdminBookings from "./pages/AdminBookings";
import MyBookings from "./pages/MyBooking";
import AdminDashboard from "./pages/AdminDashboard";
import PassengerAccount from "./pages/PassengerAccount";
import AddFlight from "./pages/AddFlight";
import EditAirplane from "./pages/EditAirplane";
import AdminRegister from "./pages/AdminRegister";
import SeatSelection from "./pages/SeatSelection";
import Login from "./pages/Login";
import "./App.css";
import AdminAccount from "./pages/AdminAccount";

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation();

  // Define routes where Navbar and Footer should NOT be shown
  const hideElementsRoutes = ["/passenger-dashboard","/wallet", "/admin-dashboard","/add-airplane","/view-airplanes",
    "/edit-airplane","/view-airports","/add-airport","/add-flight","/flight-results","/seat-selection","/payment","/confirmation",
    "/admin-bookings","/my-bookings","/pass-account","/admin-account"];
  return (
    <div className="app-container">
      {/* Show Navbar only if NOT on Passenger Dashboard */}
      {!hideElementsRoutes.includes(location.pathname) && <Navbar />}
      
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/passenger-register" element={<PassengerRegister />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/add-airplane" element={<AddAirplane />} />
          <Route path="/add-airport" element={<AddAirport />} />
          <Route path="/view-airports" element={<ViewAirports/>} />
          <Route path="/view-airplanes" element={<ViewAirplanes />} />
          <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
          <Route path="/flight-results" element={<FlightResults />} />
          <Route path="/add-flight" element={<AddFlight />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/edit-airplane" element={<EditAirplane />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/my-bookings" element={<MyBookings/>}/>
          <Route path="/admin-bookings" element={<AdminBookings/>}/>
          <Route path="/confirmation" element={<BookingConfirmation/>}/>
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/admin-account" element={<AdminAccount />} />
          <Route path="/pass-account" element={<PassengerAccount />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      {/* Show Footer only if NOT on Passenger Dashboard */}
      {!hideElementsRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
