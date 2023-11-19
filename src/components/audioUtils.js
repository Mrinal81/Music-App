import { useRef } from 'react';

const useAudioRef = () => {
    return useRef(new Audio());
};

export default useAudioRef;
