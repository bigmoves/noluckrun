import React, { forwardRef } from 'react';

import Link from 'next/link';

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  PseudoBox,
  Box
} from '@chakra-ui/core';

export const SideNavLink = forwardRef(({ children, icon, ...props }, ref) => {
  return (
    <PseudoBox
      ref={ref}
      as="a"
      mx={-2}
      display="flex"
      cursor="pointer"
      align="center"
      px="2"
      py="1"
      transition="all 0.2s"
      fontWeight="bold"
      outline="none"
      _focus={{ shadow: 'outline' }}
      color="gray.700"
      _notFirst={{ mt: 1 }}
      {...props}
    >
      <Box>{children}</Box>
    </PseudoBox>
  );
});

const SideNav = ({ isOpen, onClose, finalFocusRef }) => {
  return (
    <Drawer
      size="xs"
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Link href="/">
            <SideNavLink>Home</SideNavLink>
          </Link>
          <Link href="/register">
            <SideNavLink>Register</SideNavLink>
          </Link>
          <Link href="/contact">
            <SideNavLink>Contact Us</SideNavLink>
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideNav;
