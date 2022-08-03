import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import {Provider} from 'react-redux'
// import store from '../Redux/Store';
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
// import Blog from "../pages/Blog";
// import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminLogin from "../pages/adminLogin/adminLogin";
import AdminDashboard from "../pages/adminDashboard/adminDashboard";
import UserManagement from "../pages/adminUserManagment/UserManagment";
import AddCars from "../pages/addCars/addCars";
import CarManagement from "../pages/carManagement/carManagement";
import DistrictManagement from "../pages/districtManagement/districtManagement";
import BookingPage from "../pages/bookingPage";
import BookingSuccess from "../pages/bookingSuccess/bookingSuccess";
import BookingHistory from "../pages/BookingHistory";
import AdminBooking from "../pages/adminBookingManagement/bookingManagement";
import Profile from "../pages/profile";
import OfferManagement from "../pages/offerManagement/offerManagement";

const Routers = () => {
  return (
    // <Provider store={store} >
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/productpage/:id" element={<CarDetails />} />
      <Route path="/booking/:id" element={<BookingPage />} />
      <Route path='/bookingsuccess' element={<BookingSuccess/>} />
      <Route path='/profile/:id'  element={<Profile/>} />
      <Route path='/bookinghistory' element={<BookingHistory/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/admin' element={<AdminLogin/>} />
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      <Route path='/admin/userManagement' element={<UserManagement/>} />
      <Route path='/admin/addcars' element={<AddCars/>} />
      <Route path='/admin/carManagement' element={<CarManagement/>} />
      <Route path='/admin/districtManagement' element={<DistrictManagement/>} />
      <Route path='/admin/booking'  element={<AdminBooking/>} />
      <Route path='/admin/offerManagement' element={<OfferManagement/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
      // </Provider>
  );
};

export default Routers;
