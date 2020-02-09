import Head from 'next/head';

import axios from 'axios';

import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Image
} from '@chakra-ui/core';

import { get } from 'lodash/object';

import Layout from '../components/layout';

import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import Router from 'next/router';

const RegisterPage = ({ AuthUserInfo, query }) => {
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  const firstNameMaybe =
    (AuthUser && AuthUser.displayName && AuthUser.displayName.split(' ')[0]) ||
    '';
  const lastNameMaybe =
    (AuthUser && AuthUser.displayName && AuthUser.displayName.split(' ')[1]) ||
    '';

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
          backgroundSize="cover"
          color="white"
          bg="gray"
        />
        <Box width="100%" maxWidth={960} mx="auto" px={10}>
          <Heading size="xl" color="secondary">
            Register
          </Heading>

          <Box as="form" onSubmit={e => e.preventDefault()} py={3} px={2}>
            <FormControl mb={4}>
              <FormLabel htmlFor="first-name">First Name</FormLabel>
              <Input
                id="first-name"
                name="first"
                defaultValue={firstNameMaybe}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="last-name">Last Name</FormLabel>
              <Input id="last-name" name="last" defaultValue={lastNameMaybe} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" name="email" type="email" />
            </FormControl>

            <FormControl as="fieldset" mb={4}>
              <FormLabel as="legend">Select route</FormLabel>
              <RadioGroup defaultValue="5k">
                <Radio value="5k">5k</Radio>
                <Radio value="10k">10k</Radio>
                <Radio value="15k">15k</Radio>
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variantColor="purple"
              onClick={() => {
                const stripe = Stripe('pk_test_DxT4ScfTFOgqoKKB9T6CLqUJ');

                axios('/api/checkout', {
                  method: 'post',
                  withCredentials: true,
                  data: {
                    email: AuthUser.email
                  }
                }).then(res => {
                  console.log(res);
                  stripe
                    .redirectToCheckout({
                      sessionId: res.data.sessionId
                    })
                    .then(function(result) {
                      console.log(result);
                      // If `redirectToCheckout` fails due to a browser or network
                      // error, display the localized error message to your customer
                      // using `result.error.message`.
                    });
                });
              }}
            >
              Checkout
            </Button>
          </Box>
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
