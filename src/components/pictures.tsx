import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Picture } from '../reducer';
import ModalPortal from './modal';
import { selectPicture, closeModal } from '../actions';
import { selectedPictureSelector } from '../reducer';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

interface PicturesProps {
  pictures: Picture[];
}

const Pictures: React.FC<PicturesProps> = ({ pictures }) => {
  const dispatch = useDispatch();
  const selectedPicture = useSelector(selectedPictureSelector);

  const handleImageClick = (picture: Picture) => {
    dispatch(selectPicture(picture));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Container>
      {pictures.map((picture, index) => (
        <Image
          key={index}
          src={picture.previewFormat}
          alt={`Picture ${index}`}
          onClick={() => handleImageClick(picture)}
        />
      ))}
      {selectedPicture && (
        <ModalPortal largeFormat={selectedPicture.largeFormat} close={handleCloseModal} />
      )}
    </Container>
  );
};

export default Pictures;
