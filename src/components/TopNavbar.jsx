import React, { useState } from 'react';
import AddSongModal from './ModalForm';

const TopNavbar = ({ onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal'); 

    setIsModalOpen(false);
  };

  return (
    <div className="topNavbar">
      <div className="pagination"></div>
      <div className="add">
        <button className="addbtn" onClick={handleOpenModal}>
          Add Songs
        </button>
      </div>
      {isModalOpen && (
        <AddSongModal onAdd={onAdd} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TopNavbar;
