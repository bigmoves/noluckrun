import React from 'react';

import { Box, Flex, Button, Link as ChakraLink } from '@chakra-ui/core';

import logout from '../utils/auth/logout';
import firebase from 'firebase/app';
import Router from 'next/router';
import Link from 'next/link';

const renderAuthButtons = AuthUser => {
  return AuthUser ? (
    <Button
      onClick={async () => {
        try {
          await logout();
          Router.push('/');
        } catch (e) {
          console.error(e);
        }
      }}
      variantColor="purple"
    >
      Logout
    </Button>
  ) : (
    <>
      <Button
        onClick={() =>
          firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        }
        variantColor="purple"
      >
        Sign in
      </Button>
    </>
  );
};

const Layout = ({ AuthUser, adminPage, children }) => (
  <Box>
    <Flex height={50} alignItems="center" justifyContent="space-between" px={2}>
      <Link href="/">
        <ChakraLink href="/" fontWeight="bold" fontSize={['sm', 'md', '3xl']}>
          2020 No Luck Run
        </ChakraLink>
      </Link>
      {adminPage ? (
        renderAuthButtons(AuthUser)
      ) : (
        <Link href="/register">
          <Button
            variantColor="purple"
            as="a"
            href="/register"
            fontWeight="bold"
          >
            Register
          </Button>
        </Link>
      )}
    </Flex>
    {children}
    <Link href="/admin">
      <Flex
        as="footer"
        mt={8}
        py={4}
        justifyContent="center"
        alignItems="center"
        backgroundColor="purple.200"
      >
        Made with 💖 by Chad Miller
      </Flex>
    </Link>
  </Box>
);

export default Layout;
