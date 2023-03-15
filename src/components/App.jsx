import { AppSection } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from '../api/api';

import { Searchbar } from './searchbar';
import { ImageGallery } from './imageGallery';
import { Button } from './button';
import { Modal } from './modal/Modal';
import { Loader } from './loader';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    if (isLoading) {
      try {
        setIsLoading(false);
        const fetchData = async () => {
          const images = await getImages(searchQuery, page);
          setImages(prevImages => [...prevImages, ...images.hits]);

          if (!images.total) {
            toast.error('Did find anything!');
          } else if (page === 1) {
            toast.success(`Hooray! We found ${images.total} images!`);
          }
        };
        fetchData();
      } catch (error) {
        toast.error('Service is temporarily unavailable');
      } finally {
        setIsLoading(false);
      }
    }
  }, [isLoading, page, searchQuery]);

  const handleSubmit = query => {
    if (query.trim() === '') {
      toast.info('Enter search value!');
      return;
    }

    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setIsLoading(true);
  };

  const loadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const toggleModal = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const setImg = largeImg => {
    setLargeImg(largeImg);
  };

  return (
    <AppSection>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        images={images}
        onClickImage={setImg}
        toggleModal={toggleModal}
      />
      {isOpen && <Modal onModalClose={toggleModal} largeImg={largeImg} />}
      {isLoading ? (
        <Loader />
      ) : (
        <div>{images.length !== 0 && <Button onHandleClick={loadMore} />}</div>
      )}
      <ToastContainer autoClose={3500} />
    </AppSection>
  );
};
