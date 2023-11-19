import axios from 'axios';

const baseURL = 'YOUR_API_BASE_URL';

const api = axios.create({
    baseURL,
});

export const loginAPI = (phoneNumber) => {
    return api.post('/login', { phoneNumber });
};

export const verifyOTPAPI = (otp) => {
    return api.post('/verify-otp', { otp });
};

export const resendOTPAPI = () => {
    return api.post('/resend-otp');
};

export const getSongsAPI = () => {
    return api.get('/songs');
};

export const addSongAPI = (newSong) => {
    return api.post('/add-song', { title: newSong });
};
