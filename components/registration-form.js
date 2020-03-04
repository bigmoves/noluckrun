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
  StatNumber,
  Link,
  Flex
} from '@chakra-ui/core';

import { checkout } from '../utils/stripe/checkout';

export default function RegistrationForm() {
  const [customDonationAmount, setCustomDonationAmount] = useState(0);
  const [shirtAmount, setShirtAmount] = useState(0);
  const [customDonation, setCustomDonation] = useState(false);
  const { handleSubmit, errors, register } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onPayNow(values) {
    setIsSubmitting(true);

    if (values.donation === 'custom') {
      values.donation = customDonationAmount;
    }

    // shirts are sold out
    values.shirtSize = 'none';

    checkout(values)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  }

  const total = customDonationAmount + shirtAmount + 15;

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
          T-Shirt <b>Sold Out! There might be a few available at the event.</b>
        </FormLabel>
        <Select
          isDisabled={true}
          id="shirtSize"
          name="shirtSize"
          placeholder="Select Size"
          ref={register({ required: false })}
          onChange={e => {
            if (e.target.value !== 'none') {
              setShirtAmount(10);
            } else {
              setShirtAmount(0);
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

      <FormControl mb={4} isInvalid={errors.donation}>
        <FormLabel htmlFor="donation">
          Make a donation to{' '}
          <Link
            fontWeight="bold"
            href="https://www.girlsontherun.org/"
            isExternal
          >
            Girls on the Run!
          </Link>
        </FormLabel>
        {!customDonation && (
          <Select
            id="donation"
            name="donation"
            placeholder="Select a donation"
            ref={register({ required: true })}
            onChange={e => {
              if (e.target.value === 'custom') {
                setCustomDonationAmount(0);
                setCustomDonation(!customDonation);
              } else if (e.target.value === 'none') {
                setCustomDonationAmount(0);
              } else {
                setCustomDonationAmount(+e.target.value);
              }
            }}
          >
            <option value="5">$5.00</option>
            <option value="10">$10.00</option>
            <option value="15">$15.00</option>
            <option value="custom">Custom amount</option>
            <option value="none">None</option>
          </Select>
        )}
        {customDonation && (
          <Flex>
            <Input
              id="donation"
              name="donation"
              type="number"
              ref={register({ required: false })}
              onChange={e => setCustomDonationAmount(+e.target.value)}
              mr={4}
            />
            <Button
              variant="outline"
              onClick={() => {
                setCustomDonationAmount(0);
                setCustomDonation(false);
              }}
            >
              Reset
            </Button>
          </Flex>
        )}
        <FormErrorMessage>Enter a donation</FormErrorMessage>
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
        Pay meow
      </Button>
    </Box>
  );
}
