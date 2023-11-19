import React, { useEffect, useState } from 'react';

const CustomPlayer = ({ currentSong, audioRef, onSongEnd, onPrev, onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const playAudio = async () => {
      try {
        setAudioLoading(true);

        if (audioRef.current) {
          audioRef.current.src = currentSong.link;
          await audioRef.current.load();
          await audioRef.current.play();
          setIsPlaying(true);
          setAudioLoading(false);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };

    playAudio();
  }, [currentSong, audioRef]);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', onSongEnd);
        audioRef.current.pause();
        audioRef.current.src = ''; 
      }
    };
  }, [audioRef, onSongEnd]);

  

  useEffect(() => {
    const handleEnd = () => {
      onSongEnd();
      setIsPlaying(false);
    };
  
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnd);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
  
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnd);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [audioRef, onSongEnd]);
  

 
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAudioLoading(false);
            })
            .catch((error) => {
              console.error('Play/Pause interrupted:', error);
            });
        }
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };
  

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    }

  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="custom-player">
      {currentSong ? (
        <>
          <div className="player">
            <div className='progress-bar'>
              <progress value={currentTime} max={duration} />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <div className="content">
              <div className='img-name'>
                <img src={currentSong.img} alt="Song Cover" className='image' />
                <h3>{currentSong.songName}</h3>
              </div>
              <div className='control'>
                {!audioLoading && (
                  <>
                    <button onClick={handlePrev} className='prev-btn' >⏮️</button>
                    <button onClick={handlePlayPause} className='play-pause-btn'>
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    <button onClick={handleNext} className='next-btn'>⏭️</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No song is currently playing.</p>
      )}
    </div>
  );
};

// Helper function to format time (e.g., convert seconds to mm:ss)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default CustomPlayer;
