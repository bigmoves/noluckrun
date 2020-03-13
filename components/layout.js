import React from 'react';

import {
  Box,
  Flex,
  Button,
  Link as ChakraLink,
  IconButton,
  useDisclosure
} from '@chakra-ui/core';
import { FaCat } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

import Link from 'next/link';
import SideNav from './side-nav';

const Layout = ({ children }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        height={50}
        alignItems="center"
        justifyContent="space-between"
        px={2}
      >
        <Link href="/">
          <ChakraLink
            href="/"
            fontWeight="bold"
            fontSize={['md', '3xl']}
            display="flex"
            alignItems="center"
          >
            2020 No Luck Run <Box as={FaCat} ml={4} />
          </ChakraLink>
        </Link>
        <SideNav isOpen={isOpen} onClose={onClose} />
        <Box display={['block', null, 'none']}>
          <IconButton
            icon={MdMenu}
            variant="ghost"
            color="current"
            fontSize="20px"
            size="lg"
            onClick={onToggle}
          />
        </Box>
        <Box display={['none', null, 'block']}>
          <Link href="/contact">
            <Button
              mr={1}
              variantColor="purple"
              variant="outline"
              as="a"
              href="/contact"
              fontWeight="bold"
            >
              Contact Us
            </Button>
          </Link>
          {/* <Link href="/register">
            <Button
              variantColor="purple"
              as="a"
              href="/register"
              fontWeight="bold"
            >
              Register
            </Button>
          </Link> */}
        </Box>
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
};

export default Layout;
