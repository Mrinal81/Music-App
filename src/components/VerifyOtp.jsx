import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';


const VerifyOTP = ({ verifyOTP, setUserToken, setLoggedIn, requestId, loggedIn }) => {
const navigate = useNavigate();
const [enteredOTP, setEnteredOTP] = useState(['','','','']);

const handleInputChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
        const newOTP = [...enteredOTP];
        newOTP[index] = value;
        setEnteredOTP(newOTP);
      }
    };

    useEffect(() => {
        if (loggedIn) {
          navigate('/song-list');
        }
      }, [loggedIn, navigate]);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const givenOtp = enteredOTP.join('');
        console.log('Entered OTP:', givenOtp);
        console.log('Expected OTP:', process.env.REACT_APP_EXPECTED_OTP);
      
        try {
          const response = await verifyOTP(givenOtp, requestId);
      
          if (response && response.token) {
            setUserToken(response.token);
            setLoggedIn(true);
          } else {
            console.error('Error verifying OTP. Response:', response);
            alert('Incorrect OTP. Please try again.');
          }
        } catch (error) {
          console.error('Error verifying OTP:', error);
        }
      };
      
      


  return (
    <div className="verifyOTP">
        <div className='container'>
                <form onSubmit={handleVerifyOTP} className="form">
                    <h2>OTP Verification</h2>
                    <p>We have sent an OTP to Your Number. Please enter the code received to <br /> verify.</p>
                    <div className="otp">
                        {enteredOTP.map((digit,index)=>(
                            <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                          />
                        ))}
                        
                    </div>
                    <div className="btn">
                <button className='button' type='submit'>Verify</button>
                </div>
                </form>
                
            </div>
    </div>
    
  );
}

export default VerifyOTP;
