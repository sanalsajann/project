import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomeBar from './components/HomePage/HomeBar';
import EventDetails from './components/EventDetails/EventDetails';
import Signuppage from './components/LoginPage/Signuppage';
import Loginpage from './components/LoginPage/Loginpage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/" element={<HomeBar />} />     
        <Route path="/eventdetails" element={<EventDetails />} /> 
      </Routes>
    </>
  );
}

export default App;