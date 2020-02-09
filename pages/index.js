import dynamic from 'next/dynamic';

import { Box, Heading } from '@chakra-ui/core';

import { get } from 'lodash/object';

import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';

import Layout from '../components/layout';

import { FaRegMap } from 'react-icons/fa';

const MapboxNoSSR = dynamic(
  () => import('../components/mapbox').then(mod => mod.Mapbox),
  {
    ssr: false
  }
);

const HomePage = props => {
  const { AuthUserInfo } = props;
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);
  return (
    <Layout AuthUser={AuthUser}>
      <Box>
        <Box
          px={10}
          py={250}
          backgroundImage="url(/noluck-1.jpg)"
          backgroundPosition={['40% 25%', '0% 25%']}
          backgroundSize="cover"
          color="white"
          bg="gray"
        />
        <Box width="100%" maxWidth={960} mx="auto" px={10} paddingTop={3}>
          <Heading size="xl" display="flex" alignItems="center">
            Routes <Box ml={3} as={FaRegMap} />
          </Heading>

          <Box>
            <MapboxNoSSR title="5k" dataUrl="/5k.json" />
            <MapboxNoSSR title="10k" dataUrl="/5k.json" />
            <MapboxNoSSR title="15k" dataUrl="/5k.json" />
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
