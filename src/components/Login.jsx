import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const Login = ({sendOTP}) => {
const [phoneNumber, setPhoneNumber] = useState('');
const navigate = useNavigate();



    // const handlePhoneNumberChange = (e) => {
    //   setPhoneNumber(e.target.value);
    // };
  
    const handleSendOTP = async () => {
        if (!phoneNumber) {
          alert('Please enter your phone number.');
          return;
        }
    
        try {
          await sendOTP(phoneNumber);
          navigate('/verify-otp'); 
        } catch (error) {
          console.error('Error sending OTP:', error);
        }
      };

  return (
    <div className='login'>
            <div className='container'>
                <div className="form">
                    <h2>Sign In</h2>
                    <p>Please enter your mobile number to login. We will send an OTP to verify <br /> your Number</p>
                    <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <div className="btn">
                <button className="button" onClick={handleSendOTP}>Sign In</button>
                </div>
                </div>
                
            </div>
          
                    
        
    </div>
    
    
  );
};

export default Login;
