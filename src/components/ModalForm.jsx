import { useState } from "react";

const AddSongModal = ({ onAdd, onClose }) => {
  const [newSong, setNewSong] = useState({
    songName: "",
    link: "",
    source: "",
    img: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "img" && files && files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewSong((prev) => ({ ...prev, img: reader.result }));
      };

      reader.readAsDataURL(files[0]);
    } else {
      setNewSong((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = () => {
    console.log('Adding song:', newSong); 
    onAdd(newSong);
    onClose(); 
    setNewSong({
      songName: "",
      link: "",
      source: "",
      img: null,
    });
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Add a New Song</h2>
        <span className="close" onClick={onClose}>
          &times;
        </span>
      </div>
      <div className="modal-content">
        <div>
          <label>Song Name:</label>
          <input
            type="text"
            name="songName"
            value={newSong.songName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Link:</label>
          <input
            type="text"
            name="link"
            value={newSong.link}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Source:</label>
          <input
            type="text"
            name="source"
            value={newSong.source}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image Source:</label>
          <input className="user-img"
            type="file"
            name="img"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button className="add-button" onClick={handleAdd}>
          Add Song
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSongModal;
