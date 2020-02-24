import {
  Box,
  Heading,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast
} from '@chakra-ui/core';
import Layout from '../components/layout';
import { MdMailOutline } from 'react-icons/md';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';

let easing = [0.175, 0.85, 0.42, 0.96];
const formVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing }
  }
};

const ContactPage = () => {
  const toast = useToast();
  const { handleSubmit, errors, register, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = data => {
    setIsSubmitting(true);

    axios('/api/contact', {
      method: 'post',
      withCredentials: true,
      data
    })
      .then(() => {
        setIsSubmitting(false);
        reset();
        toast({
          title: 'Message sent ✨',
          description: `We'll get back to you as soon as we can!`,
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Layout>
      <Box>
        <motion.div initial="exit" animate="enter" exit="exit">
          <motion.div variants={formVariants}>
            <Box
              px={10}
              py={250}
              backgroundImage="url(/noluck-6.jpg)"
              backgroundPosition={['40% 25%', '0% 25%']}
              backgroundSize="cover"
              color="white"
              bg="gray"
            />
            <Box
              width="100%"
              maxWidth={960}
              mx="auto"
              px={[3, 10]}
              paddingTop={3}
            >
              <Heading size="xl" display="flex" alignItems="center" mb={4}>
                Contact Us <Box ml={3} as={MdMailOutline} />
              </Heading>

              <Box as="form" onSubmit={handleSubmit(submit)} py={3} px={2}>
                <FormControl mb={4} isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    ref={register({ required: true })}
                  />
                  <FormErrorMessage>Enter a name</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    ref={register({ required: true })}
                  />
                  <FormErrorMessage>Enter an email address</FormErrorMessage>
                </FormControl>
                <FormControl mb={4} isInvalid={errors.message}>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <Textarea
                    id="message"
                    name="message"
                    ref={register({ required: true })}
                  />
                  <FormErrorMessage>Enter a message</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  variantColor="purple"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </Layout>
  );
};

ContactPage.defaultProps = {};

export default ContactPage;
