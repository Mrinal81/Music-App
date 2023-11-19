import React, { useState, useEffect } from 'react';
import playIcon from './play.svg';
import CurrentSong from './CurrentSong';
import useAudioRef from './audioUtils'; 

const MusicList = ({ songs, onAddSong, onPrev, onNext, setCurrentSong }) => {
  const [currentMusic, setCurrentMusic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const audioRef = useAudioRef();

  const handlePlayPause = async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      } else {
        audioRef.current.pause();
      }
    }
  };

  

  const handleSongEnd = () => {
    console.log('Song ended');
    setCurrentMusic(null);
  };

  // const handleAddSong = (newSong) => {
  //   onAddSong(newSong);
  // };

  useEffect(() => {
    setCurrentIndex(null);
  }, [songs]);

  return (
    <div className="songslist">
      {songs.map((item, index) => (
        <div key={index} className="music-card">
          <div className="img">
            <img
              src={item.img || 'https://www.svgrepo.com/show/2225/music.svg'}
              alt="img"
              className="image"
            />
            <h2>{item.songName}</h2>
          </div>
          <div>
            <span>{item.source}</span>
          </div>
          <div>
            <span>{item.date}</span>
          </div>
          <div>
            <button className="play" onClick={() => {
              setCurrentIndex(index);
              setCurrentMusic(item);
              handlePlayPause(index)
              }}>
              <img src={playIcon} alt="icon" className="playbtn" />
            </button>
          </div>
          <div>
            <span className="bin">🗑️</span>
          </div>
        </div>
      ))}
      <div className="pla">
      {currentMusic && (
        <CurrentSong
          currentSong={currentMusic}
          audioRef={audioRef}
          onSongEnd={handleSongEnd}
          onPrev={onPrev}
            onNext={onNext}
        />
      )}
      </div>
      
    </div>
  );
};

export default MusicList;
