import React from 'react';

// import { GlobalStyle } from '../components/styled-components';

import { Box, Flex, Button, Link } from '@chakra-ui/core';

import logout from '../utils/auth/logout';

import firebase from 'firebase/app';

import Router from 'next/router';

const Layout = ({ AuthUser, children }) => (
  <Box>
    <Flex height={50} alignItems="center" justifyContent="space-between" px={2}>
      <Link href="/" fontWeight="bold" fontSize={['sm', 'md', '3xl']}>
        2020 No Luck Run
      </Link>
      <Button variantColor="purple" as="a" href="/register" fontWeight="bold">
        Register
      </Button>
      {/* {AuthUser ? (
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
        )} */}
    </Flex>
    {children}
  </Box>
);

export default Layout;
