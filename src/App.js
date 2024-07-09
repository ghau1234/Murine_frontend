import Homepage from "./Pages/Homepage/Homepage";
import Header from "./Pages/Header/Header";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import { Routes, Route } from "react-router-dom";
import Footer from "./Pages/Footer/Footer";
import Admin from "./Pages/Admin/Admin";
import { useState,useEffect } from "react";
import axios from 'axios';
function App() {
  const [timer, setTimer] = useState("");
  const [murinePrice, setMurinePrice] = useState(0);
  const [murineHead, setMurineHead] = useState("");
  const [storageUsed, setStorageUsed]= useState(0);
  const [storageTotal, setStorageTotal]= useState(0);
  useEffect(() => {
    // Fetch settings data when component mounts
    fetchSettings();
}, []);

const fetchSettings = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/admin/settings`);
        const settingsData = response.data;

        // Update state with fetched settings
        //   setTimer(settingsData.timer);
        
        // Convert the timer to ISO 8601 date string if needed
        const formattedTimer = new Date(settingsData.timer).toISOString().split('T')[0];
        // Update state with fetched settings
        setTimer(formattedTimer);

        setMurinePrice(settingsData.murinePrice);
        setMurineHead(settingsData.murineHead);
        setStorageUsed(settingsData.storageUsed);
        setStorageTotal(settingsData.storageTotal);

        console.log('Settings fetched successfully:', settingsData);
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        // Optionally, handle error (e.g., show error message to user)
    }
};

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Homepage timer={timer} murinePrice={murinePrice}  murineHead={murineHead} storageUsed={storageUsed} storageTotal={storageTotal}/>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
