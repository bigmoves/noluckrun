import dynamic from 'next/dynamic';
import {
  Box,
  Heading,
  Flex,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/core';
import { get } from 'lodash/object';
import Layout from '../components/layout';
import ImageSlider from '../components/image-slider';
import { FaRegMap, FaRegClock } from 'react-icons/fa';
import Countdown from 'react-countdown';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const MapboxNoSSR = dynamic(
  () => import('../components/mapbox').then(mod => mod.Mapbox),
  {
    ssr: false
  }
);

const countdownRenderer = ({ days, hours, minutes, seconds }) => {
  return (
    <Flex alignItems="center">
      <Box as={FaRegClock} mr={3} /> {days} days {hours} hrs {minutes} min{' '}
      {seconds} sec
    </Flex>
  );
};

const HomePage = props => {
  const { AuthUserInfo } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  const images = [
    '/noluck-1.jpg',
    '/noluck-2.jpg',
    '/noluck-3.jpg',
    '/noluck-4.jpg',
    '/noluck-5.jpg',
    // '/noluck-7.jpg',
    // '/noluck-8.jpg',
    // '/noluck-9.jpg',
    '/noluck-10.jpg',
    '/noluck-11.jpg',
    '/noluck-12.jpg',
    '/noluck-13.jpg',
    // '/noluck-14.jpg',
    // '/noluck-15.jpg',
    '/noluck-16.jpg'
  ];

  const [containerWidth, setContainerWidth] = useState(960 - 24);
  const containerRef = useRef();

  useEffect(() => {
    const getContainerWidth = () => {
      setContainerWidth(
        containerRef.current.getBoundingClientRect().width - 24
      );
    };

    if (containerRef) {
      getContainerWidth();
    }

    window.addEventListener('resize', getContainerWidth);

    return () => {
      window.removeEventListener('resize', getContainerWidth);
    };
  }, []);

  return (
    <Layout AuthUser={AuthUser}>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Box>
        <Box position="relative" height="500px" color="white">
          <ImageSlider images={images} />
          <Box
            zIndex={2}
            fontWeight="bold"
            position="absolute"
            right={10}
            bottom={10}
            background="black"
            transform="skew(-5deg)"
            p={3}
          >
            <Countdown
              date={new Date('03/17/2020')}
              renderer={countdownRenderer}
            />
          </Box>
        </Box>
        <Box
          ref={containerRef}
          width="100%"
          maxWidth={960}
          mx="auto"
          px={[3, 10]}
          paddingTop={3}
        >
          <Box textAlign="center">
            <Heading fontSize="3xl" mb={4}>
              March 15th, 2020 @ Glenhaven Park
            </Heading>
            <Stat mb={4}>
              <StatLabel fontWeight="bold">Check-in:</StatLabel>
              <StatNumber> 9:30am</StatNumber>
            </Stat>
            <Stat mb={4}>
              <StatLabel fontWeight="bold">15k starts @:</StatLabel>
              <StatNumber> 10am</StatNumber>
            </Stat>
            <Stat mb={4}>
              <StatLabel fontWeight="bold">10k starts @:</StatLabel>
              <StatNumber> 10:30am</StatNumber>
            </Stat>
            <Stat mb={4}>
              <StatLabel fontWeight="bold">5k starts @:</StatLabel>
              <StatNumber> 11am</StatNumber>
            </Stat>
            <Stat mb={4}>
              <StatLabel fontWeight="bold">
                ⚽️ Optional soccer game to follow! ⚽️
              </StatLabel>
            </Stat>
          </Box>
          <Heading size="xl" display="flex" alignItems="center">
            Routes <Box ml={3} as={FaRegMap} />
          </Heading>
          <Box>
            <MapboxNoSSR title="5k" dataUrl="/5k.json" width={containerWidth} />
            <MapboxNoSSR
              title="10k"
              dataUrl="/10k.json"
              width={containerWidth}
            />
            <MapboxNoSSR
              title="15k"
              dataUrl="/15k.json"
              width={containerWidth}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

HomePage.defaultProps = {
  AuthUserInfo: null
};

export default HomePage;
