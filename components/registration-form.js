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
  RadioGroup,
  Radio
} from '@chakra-ui/core';

import { checkout } from '../utils/stripe/checkout';

export default function RegistrationForm() {
  const { handleSubmit, errors, register } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(values) {
    console.log(values);
    setIsSubmitting(true);

    checkout(values).then(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} py={3} px={2}>
      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName" name="firstName" ref={register} />
      </FormControl>
      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input id="lastName" name="lastName" ref={register} />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" name="email" type="email" ref={register} />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="shirtSize" as="legend">
          T-Shirt Size
        </FormLabel>
        <Select
          id="shirtSize"
          name="shirtSize"
          placeholder="Select Size"
          ref={register}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="x-large">X Large</option>
        </Select>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel htmlFor="routeName" as="legend">
          Route
        </FormLabel>
        <Select
          id="routeName"
          name="routeName"
          placeholder="Select Route"
          ref={register}
        >
          <option value="5k">5k</option>
          <option value="10k">10k</option>
          <option value="15k">15k</option>
        </Select>
      </FormControl>

      <Button type="submit" variantColor="purple" isLoading={isSubmitting}>
        Checkout
      </Button>
    </Box>
  );
}
