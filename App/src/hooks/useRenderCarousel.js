import {useRef} from 'react';

//custom hooks to handle carousels
export const useRenderCarousel = () => {
  const carouselRef = useRef(null);

 
  return {
    carouselRef,
  };
};
