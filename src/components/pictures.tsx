import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { picturesSelector, selectedPictureSelector } from "../reducer";
import { selectPicture, closeModal } from "../actions";
import { Picture } from "../types/picture.type";
import ModalPortal from "./modal"; 


interface PicturesState {
  status: 'loading' | 'failure' | 'success';
  data: Picture[];
  error: string;
}


interface PicturesProps {
  pictures: Picture[]; 
}

const PicturesComponent: React.FC<PicturesProps> = ({ pictures }) => {
  const dispatch = useDispatch();
  const selectedPicture = useSelector(selectedPictureSelector) as Picture | null; 

  
  const picturesState = useSelector(picturesSelector) as PicturesState;

  
  if (picturesState.status === "loading") {
    return <p>Chargement des images...</p>;
  }

  if (picturesState.status === "failure") {
    return <p>Erreur : {picturesState.error}</p>;
  }

  const handleImageClick = (picture: Picture) => {
    dispatch(selectPicture(picture)); 
  };

  const handleCloseModal = () => {
    dispatch(closeModal()); 
  };

  return (
    <div className="gallery">
      {picturesState.status === "success" && pictures.length > 0 &&
        pictures.map((picture: Picture, index: number) => (
          <img
            key={index}
            src={picture.previewFormat}
            alt={`Chat #${index + 1}`}
            className="thumbnail"
            onClick={() => handleImageClick(picture)} 
          />
        ))}

      {selectedPicture && (
        <ModalPortal
          largeFormat={selectedPicture.largeFormat} 
          close={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default PicturesComponent;
