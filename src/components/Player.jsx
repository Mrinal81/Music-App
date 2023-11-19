import React from 'react';
import CurrentSong from './CurrentSong'; 

const Player = ({ currentSong, onPlayPause, onPrev, onNext, onSeek }) => {
  return (
    <div>
      <h2>Player</h2>
      <p>Current Song: {currentSong && currentSong.songName}</p>
      <CurrentSong
        currentSong={currentSong}
        onPlay={onPlayPause} 
        onPause={onPlayPause} 
        onPrev={onPrev}        
        onNext={onNext}        
      />
      <button onClick={onPrev}>Previous</button>
      <button onClick={onPlayPause}>Play/Pause</button>
      <button onClick={onNext}>Next</button>
      <input type="range" onChange={onSeek} />
    </div>
  );
};

export default Player;
