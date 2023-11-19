import React, {useState} from 'react'
import TopNavbar from './TopNavbar'
import SideNavbar from './SideNavbar'
import MusicList from './MusicList'
import SubNavbar from './SubNavbar'
import playIcon from './play.svg'

const SongsList = ({ setCurrentSong, onLogout }) => {

  const [songs, setSongs] = useState([
    {
      
        "img":"https://www.svgrepo.com/show/2225/music.svg",
        "songName": "Dummy 1",
        "source": "Dummy",
        "date": "18-11-2023",
        "icon":playIcon,
        "link":"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      "img":"https://www.svgrepo.com/show/2225/music.svg",
      "songName": "Dummy 2",
      "source": "Dummy",
      "date": "18-11-2023",
      "icon":playIcon,
      "link":"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"

    },
    {
      "img":"https://www.svgrepo.com/show/2225/music.svg",
      "songName": "Dummy 3",
      "source": "Dummy",
      "date": "18-11-2023",
      "icon":playIcon,
      "link":"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"

    },
    {
      "img":"https://www.svgrepo.com/show/2225/music.svg",
      "songName": "Dummy 4",
      "source": "Dummy",
      "date": "18-11-2023",
      "icon":playIcon,
      "link":"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddSong = (newSong) => {
    console.log('Adding song in SongsList:', newSong);
    const currentDate = new Date().toLocaleDateString();
    const songWithDate = { ...newSong, date: currentDate };
    setSongs([...songs, songWithDate]);
    console.log('Updated Songs in SongsList:', songs); 
  };


  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(songs[nextIndex]);
  };
  return (
    <>
    <SideNavbar onLogout={onLogout}/>
    <TopNavbar onAdd={handleAddSong}/>
    <SubNavbar/>
    <MusicList songs={songs} setCurrentSong={setCurrentSong} currentIndex={currentIndex} onPrev={handlePrev}
        onNext={handleNext}/>
    
    </>
  )
}

export default SongsList