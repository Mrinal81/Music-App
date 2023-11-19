import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import VerifyOTP from './components/VerifyOtp';
import SongsList from './components/SongsList';
import NowPlayingBar from './components/NowPlaying';





const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);




  const sendOTP = async (phoneNumber) => {
    try {
      console.log('API Endpoint:', process.env.REACT_APP_API_ENDPOINT);

      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
          }),
        }
      );

      const data = await response.json();
      console.log('Response from sending OTP:', data);

      // Check if the request was successful (you may need to adjust this based on your API response)
      if (response.ok) {
        // Extract the requestId from the response data
        const requestId = data.requestId;
        setRequestId(requestId);

      } else {
        console.error('Error sending OTP:', data.error);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };


  const verifyOTP = async (otp, requestId) => {
    try {
      if (!requestId) {
        console.error('No requestId available. VerifyOTP cannot proceed.');
        return { success: false, error: 'No requestId available.' };
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/verify_otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: process.env.REACT_APP_USER_ID,
            requestId: requestId,
            otp: otp,
          }),
        }
      );

      const data = await response.json();
      console.log('Response from OTP verification:', data);

      if (data.success) {
        console.log('OTP verification successful');
        setUserToken(data.token);
        setLoggedIn(true);
        Navigate('/song-list');
      }
      // else {
      //   alert('Incorrect OTP. Please try again.');
      // }

      return data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { success: false, error: 'An error occurred while verifying OTP.' };
    }
  };



  const onLogout = () => {
    setUserToken(null);
    setLoggedIn(false);
    return <Navigate to="/login" />;
  };


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login sendOTP={sendOTP} />} />
        <Route path="/verify-otp" element={<VerifyOTP verifyOTP={verifyOTP} setUserToken={setUserToken} setLoggedIn={setLoggedIn} requestId={requestId} loggedIn={loggedIn} />} />
        <Route path="/song-list" element={<SongsList setCurrentSong={setCurrentSong} onLogout={onLogout} />} />
      </Routes>
      {currentSong && <NowPlayingBar currentSong={currentSong} />}

    </BrowserRouter>
  );
};

export default App;
