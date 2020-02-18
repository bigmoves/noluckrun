import Head from 'next/head';

import {
  Box,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Image,
  Text,
  Progress,
  Stack,
  Divider
} from '@chakra-ui/core';

import { get } from 'lodash/object';

import Layout from '../components/layout';
import BarChart from '../components/bar-chart';
import RegistrationForm from '../components/registration-form';
import { getCountData } from '../utils/charts';

import Router from 'next/router';
import axios from 'axios';

import { FaRegClipboard } from 'react-icons/fa';

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

const spotsAvailableVariants = {
  exit: { y: 100, opacity: 0, transition: { duration: 0.5, ease: easing } },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.1, duration: 0.5, ease: easing }
  }
};

const RegisterPage = ({ AuthUserInfo, query, registrations = [] }) => {
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

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
            <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Image src="/noluck-3.jpg" alt="You're all set" mb={4} />
              <Text fontWeight="bold" mb={4}>
                See you on March 15th!
              </Text>
              <Text>Here's the breakdown so far...</Text>
              <BarChart
                width={400}
                height={300}
                xValueAccessor={d => d.routeName}
                yValueAccessor={d => d.count}
                data={getCountData(registrations, 'routeName')}
                xAxisLabel="Routes"
                yAxisLabel="Count"
                selected={query.route}
              />
            </ModalBody>
            <ModalFooter>
              <Button variantColor="purple" onClick={() => Router.push('/')}>
                So stoked!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Box>
        <Head>
          <script src="https://js.stripe.com/v3/"></script>
        </Head>
        <motion.div initial="exit" animate="enter" exit="exit">
          <motion.div variants={formVariants}>
            <Box
              px={10}
              py={250}
              backgroundImage="url(/noluck-4.jpg)"
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
              <Heading size="xl" display="flex" alignItems="center">
                Register <Box ml={3} as={FaRegClipboard} />
              </Heading>

              <Stack my={4}>
                <Text fontSize="md">
                  {50 - registrations.length}/50 Spots Available
                </Text>
                <Progress
                  color="purple"
                  value={((50 - registrations.length) / 50) * 100}
                />
              </Stack>

              <Divider my={4} />

              <RegistrationForm />
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </Layout>
  );
};

RegisterPage.defaultProps = {
  AuthUserInfo: null
};

RegisterPage.getInitialProps = async ctx => {
  const registrations = await axios
    .get(
      '/api/registrations',
      ctx.req
        ? {
            baseURL:
              process.env.NODE_ENV === 'production'
                ? 'https://noluckrun.now.sh'
                : 'http://localhost:3000'
          }
        : {}
    )
    .then(res => res.data);

  return { registrations, query: ctx.query };
};

export default RegisterPage;
