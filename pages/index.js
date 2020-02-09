import dynamic from 'next/dynamic';

import { Box, Heading, Flex } from '@chakra-ui/core';

import { get } from 'lodash/object';

import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';

import Layout from '../components/layout';

import { FaRegMap, FaRegClock } from 'react-icons/fa';
import Countdown from 'react-countdown';
import Head from 'next/head';

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
          backgroundImage="url(/noluck-1.jpg)"
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

export default withAuthUser(withAuthUserInfo(HomePage));
