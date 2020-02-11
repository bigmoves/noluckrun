import dynamic from 'next/dynamic';
import { Box, Heading, Flex, Image } from '@chakra-ui/core';
import { get } from 'lodash/object';
import Layout from '../components/layout';
import { FaRegMap, FaRegClock } from 'react-icons/fa';
import Countdown from 'react-countdown';
import Head from 'next/head';
import { useState } from 'react';

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
  const [selectedImage, setSelectedImage] = useState('/noluck-1.jpg');
  const { AuthUserInfo } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  const images = [
    '/noluck-1.jpg',
    '/noluck-2.jpg',
    '/noluck-3.jpg',
    '/noluck-4.jpg',
    '/noluck-5.jpg',
    '/noluck-6.jpg'
  ];

  return (
    <Layout AuthUser={AuthUser}>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Box>
        <Box
          position="relative"
          px={10}
          py={250}
          backgroundImage={`url(${selectedImage})`}
          backgroundPosition={['40% 25%', '0% 25%']}
          backgroundSize="cover"
          color="white"
          bg="gray"
        >
          <Box
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
        <Box width="100%" maxWidth={960} mx="auto" px={[3, 10]} paddingTop={3}>
          <Flex overflowX="auto" mb={4}>
            {images.map(src => (
              <Image
                key={src}
                src={src}
                width={150}
                height={100}
                mr={4}
                opacity={selectedImage === src ? 1 : 0.75}
                border={
                  selectedImage === src ? '3px solid purple' : '3px solid black'
                }
                onClick={() => setSelectedImage(src)}
              />
            ))}
          </Flex>

          <Heading size="xl" display="flex" alignItems="center">
            Routes <Box ml={3} as={FaRegMap} />
          </Heading>

          <Box>
            <MapboxNoSSR title="5k" dataUrl="/5k.json" />
            <MapboxNoSSR title="10k" dataUrl="/10k.json" />
            <MapboxNoSSR title="15k" dataUrl="/15k.json" />
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
