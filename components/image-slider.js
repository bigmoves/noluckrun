import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn';
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight
} from 'react-icons/fa';
import { Box } from '@chakra-ui/core';
import styled from '@emotion/styled';

const MotionImg = styled(motion.div)`
  position: absolute;
  height: 500px;
  background-image: url(${props => props.imageSrc});
  background-position: 40% 25%;
  background-size: cover;
  width: 100%;
`;

const variants = {
  enter: direction => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const ImageSlider = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <MotionImg
          key={page}
          imageSrc={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 }
          }}
          // drag="x"
          // dragConstraints={{ left: 0, right: 0 }}
          // dragElastic={1}
          // onDragEnd={(e, { offset, velocity }) => {
          //   const swipe = swipePower(offset.x, velocity.x);

          //   if (swipe < -swipeConfidenceThreshold) {
          //     paginate(1);
          //   } else if (swipe > swipeConfidenceThreshold) {
          //     paginate(-1);
          //   }
          // }}
        />
      </AnimatePresence>
      <Box
        fontSize="3xl"
        position="absolute"
        top="calc(50% - 20px)"
        zIndex={2}
        fill="white"
        right={5}
        as={FaRegArrowAltCircleRight}
        onClick={() => paginate(1)}
      />
      <Box
        fontSize="3xl"
        position="absolute"
        top="calc(50% - 20px)"
        zIndex={2}
        fill="white"
        left={5}
        as={FaRegArrowAltCircleLeft}
        onClick={() => paginate(1)}
      />
    </>
  );
};

export default ImageSlider;
