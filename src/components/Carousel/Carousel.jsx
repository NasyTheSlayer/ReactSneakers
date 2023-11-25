import React, { useState, useEffect } from 'react';
import './Carousel.scss';

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const images = [
    'img/Carousel-1.png',
    'img/Carousel-1.png',
    'img/Carousel-1.png'
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((currentSlide + 1) % images.length);
        setIsAnimating(false);
      }, 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((currentSlide - 1 + images.length) % images.length);
        setIsAnimating(false);
      }, 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="carousel">
      <div className="carousel__content">
        <img src="img/logo-carousel.png" alt="" />
        <h3>
          Stan Smith 
          <span>,</span>
          <br />
          <span>Forever!</span>  
        </h3>
        <button className="carousel__button">Купить</button>
      </div>
      <button className="carousel__button--1" onClick={prevSlide}>
        <img src="img/arrow-slider.svg" alt="arrow" />
      </button>
      <img
        className={isAnimating ? 'slide-image fade-out' : 'slide-image fade-in'}
        src={images[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
      />
      <button className="carousel__button--2" onClick={nextSlide}>
        <img src="img/arrow-slider.svg" alt="arrow" />
      </button>
    </div>
  );
};