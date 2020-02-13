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

import { checkout } from '../utils/stripe/checkout';
// import axios from 'axios';
// import Router from 'next/router';

export default function RegistrationForm() {
  const [total, setTotal] = useState(15);
  const { handleSubmit, errors, register } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onPayNow(values) {
    setIsSubmitting(true);

    checkout(values)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  }

  // function onPayLater(values) {
  //   setIsSubmitting(true);
  //   axios.post('/api/register', values).then(() => {
  //     setIsSubmitting(false);
  //     Router.push(`/register?checkoutComplete=true&route=${values.routeName}`);
  //   });
  // }

  return (
    <Box as="form" onSubmit={handleSubmit(onPayNow)} py={3} px={2}>
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
          T-Shirt Size +$10
        </FormLabel>
        <Select
          id="shirtSize"
          name="shirtSize"
          placeholder="Select Size"
          ref={register({ required: true })}
          onChange={e => {
            if (e.target.value !== 'none') {
              setTotal(25);
            } else {
              setTotal(15);
            }
          }}
        >
          <option value="none">None</option>
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
          <option value="supporter">Athletic Supporter</option>
        </Select>
        <FormErrorMessage>Select a route</FormErrorMessage>
      </FormControl>

      <Stat mb={4}>
        <StatLabel>Total:</StatLabel>
        <StatNumber>${total}.00</StatNumber>
      </Stat>

      <Button
        type="submit"
        variantColor="purple"
        isLoading={isSubmitting}
        mr={4}
      >
        Pay now
      </Button>
    </Box>
  );
}
