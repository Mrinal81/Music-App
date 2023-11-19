import React from 'react';

const NowPlayingBar = ({ currentSong }) => {
  return (
    <div className="now-playing-bar">
      {currentSong && (
        <>
          <h3>Now Playing:</h3>
          <p>{currentSong.songName}</p>
          
        </>
      )}
    </div>
  );
};

export default NowPlayingBar;
