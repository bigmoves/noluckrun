import Head from 'next/head';

import {
  Box,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Image,
  Text,
  Progress,
  Stack,
  Divider
} from '@chakra-ui/core';

import { get } from 'lodash/object';

import Layout from '../components/layout';
import RegistrationForm from '../components/registration-form';

import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import Router from 'next/router';

import { FaRegClipboard } from 'react-icons/fa';

const RegisterPage = ({ AuthUserInfo, query }) => {
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  // const firstNameMaybe =
  //   (AuthUser && AuthUser.displayName && AuthUser.displayName.split(' ')[0]) ||
  //   '';
  // const lastNameMaybe =
  //   (AuthUser && AuthUser.displayName && AuthUser.displayName.split(' ')[1]) ||
  //   '';

  return (
    <Layout AuthUser={AuthUser}>
      {query && query.checkoutComplete && (
        <Modal
          size="xl"
          isCentered
          isOpen={true}
          onClose={() => Router.push('/')}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>You're all set 🎉</ModalHeader>
            <ModalCloseButton />
            <Image src="/noluck-3.jpg" alt="You're all set" />
            <ModalBody textAlign="center">See you on March 17th!</ModalBody>
            <ModalFooter>
              <Button variantColor="blue" onClick={() => Router.push('/')}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Box>
        <Head>
          <script src="https://js.stripe.com/v3/"></script>
        </Head>
        <Box
          px={10}
          py={250}
          backgroundImage="url(/noluck-2.jpg)"
          backgroundPosition={['40% 25%', '0% 25%']}
          backgroundSize="cover"
          color="white"
          bg="gray"
        />
        <Box width="100%" maxWidth={960} mx="auto" px={[3, 10]} paddingTop={3}>
          <Heading size="xl" display="flex" alignItems="center">
            Register <Box ml={3} as={FaRegClipboard} />
          </Heading>

          <Stack my={4}>
            <Text fontSize="md">50/200 Spots Available</Text>
            <Progress color="purple" value={25} />
          </Stack>

          <Divider my={4} />

          <RegistrationForm />
        </Box>
      </Box>
    </Layout>
  );
};

RegisterPage.defaultProps = {
  AuthUserInfo: null
};

RegisterPage.getInitialProps = async ctx => {
  return { query: ctx.query };
};

export default withAuthUser(withAuthUserInfo(RegisterPage));
