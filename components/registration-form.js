import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Box,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/core';

import { keys } from 'lodash/object';

import { checkout } from '../utils/stripe/checkout';

export default function RegistrationForm() {
  const { handleSubmit, errors, register } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutApiError, setCheckoutApiError] = useState(false);

  console.log({ errors });
  function onSubmit(values) {
    console.log(values);
    setIsSubmitting(true);

    // checkout(values)
    //   .then(() => {
    //     setIsSubmitting(false);
    //   })
    //   .catch(() => {
    //     setIsSubmitting(false);
    //     setCheckoutApiError(true);
    //   });
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} py={3} px={2}>
      <FormControl mb={4} isInvalid={errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          name="firstName"
          ref={register({ required: true })}
        />
        <FormErrorMessage>Enter a first name</FormErrorMessage>
      </FormControl>
      <FormControl mb={4} isInvalid={errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          name="lastName"
          ref={register({ required: true })}
        />
        <FormErrorMessage>Enter a last name</FormErrorMessage>
      </FormControl>
      <FormControl mb={4} isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          ref={register({ required: true })}
        />
        <FormErrorMessage>Enter an email address</FormErrorMessage>
      </FormControl>
      <FormControl mb={4} isInvalid={errors.shirtSize}>
        <FormLabel htmlFor="shirtSize" as="legend">
          T-Shirt Size
        </FormLabel>
        <Select
          id="shirtSize"
          name="shirtSize"
          placeholder="Select Size"
          ref={register({ required: true })}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="x-large">X Large</option>
        </Select>
        <FormErrorMessage>Select a size</FormErrorMessage>
      </FormControl>
      <FormControl mb={4} isInvalid={errors.routeName}>
        <FormLabel htmlFor="routeName" as="legend">
          Route
        </FormLabel>
        <Select
          id="routeName"
          name="routeName"
          placeholder="Select Route"
          ref={register({ required: true })}
        >
          <option value="5k">5k</option>
          <option value="10k">10k</option>
          <option value="15k">15k</option>
        </Select>
        <FormErrorMessage>Select a route</FormErrorMessage>
      </FormControl>

      <Stat mb={4}>
        <StatLabel>Total:</StatLabel>
        <StatNumber>$25.00</StatNumber>
      </Stat>

      <Button type="submit" variantColor="purple" isLoading={isSubmitting}>
        Checkout
      </Button>
    </Box>
  );
}
