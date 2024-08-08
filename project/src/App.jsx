import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import HomeBar from './components/HomePage/HomeBar';
import EventDetails from './components/EventDetails/EventDetails';
import Signuppage from './components/LoginPage/Signuppage';
import Loginpage from './components/LoginPage/Loginpage';
import AboutUs from './components/HomePage/Aboutus';
import ProfileView from './components/Profile/ProfileView';
import RegisteredEventsPage from './components/Profile/RegisteredEventsPage';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Signuppage" element={<Signuppage />} />
        <Route path="/" element={<HomeBar />} />     
        <Route path="/eventpages/:eventId" element={<EventDetails />} />
        <Route path='/Aboutus' element={<AboutUs/>}/>
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/registered-events" element={<RegisteredEventsPage/>} /> {/* Add route for RegisteredEventsPage */}
      </Routes>
    </>
  );
}

export default App;