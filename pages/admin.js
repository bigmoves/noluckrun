import {
  Badge,
  Box,
  Heading,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Link,
  Icon
} from '@chakra-ui/core';
import Layout from '../components/layout';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import { FaRegAddressBook } from 'react-icons/fa';
import { useTable } from 'react-table';
import styled from '@emotion/styled';
import axios from 'axios';
import BarChart from '../components/bar-chart';
import { get } from 'lodash/object';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Router from 'next/router';
import { getCountData } from '../utils/charts';
import { sortBy } from 'lodash/collection';

const TableStyles = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      text-align: left;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const AdminPage = ({ AuthUserInfo, registrations = [] }) => {
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

  const columns = [
    {
      Header: 'First name',
      accessor: 'firstName'
    },
    {
      Header: 'Last name',
      accessor: 'lastName'
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ cell: { value } }) => <Badge variantColor="teal">{value}</Badge>
    },
    {
      Header: 'T-Shirt Size',
      accessor: 'shirtSize',
      Cell: ({ cell: { value } }) => <Badge>{value}</Badge>
    },
    {
      Header: 'Route',
      accessor: 'routeName',
      Cell: ({ cell: { value } }) => (
        <Badge variantColor="purple">{value}</Badge>
      )
    },
    {
      Header: 'Donation',
      accessor: 'donationAmount',
      Cell: ({ cell: { value } }) =>
        value ? <Badge variantColor="pink">${value}</Badge> : ''
    },
    {
      Header: 'Paid',
      accessor: 'paid',
      Cell: ({ cell: { value } }) =>
        typeof value === 'number' ? (
          <Badge variantColor="green">${value}</Badge>
        ) : (
          ''
        )
    },
    {
      Header: 'Stripe',
      accessor: 'stripeCustomerUrl',
      Cell: ({ cell: { value } }) => (
        <Flex align="center" justify="center">
          <Link isExternal href={value}>
            <Box as={FaExternalLinkAlt} color="black" />
          </Link>
        </Flex>
      )
    }
  ];

  const routeCounts = sortBy(
    getCountData(registrations, 'routeName'),
    'routeName'
  ).reverse();

  return (
    <Layout AuthUser={AuthUser}>
      <Box>
        <Box
          px={10}
          py={250}
          backgroundImage="url(/noluck-3.jpg)"
          backgroundPosition={['40% 25%', '0% 25%']}
          backgroundSize="cover"
          color="white"
          bg="gray"
        />
        <Box width="100%" maxWidth={960} mx="auto" px={[3, 10]} paddingTop={3}>
          <Heading size="xl" display="flex" alignItems="center" mb={4}>
            Admin <Box ml={3} as={FaRegAddressBook} />
          </Heading>

          <Stat mb={4}>
            <StatLabel>Participants:</StatLabel>
            <StatNumber>{registrations.length}</StatNumber>
          </Stat>

          <Flex
            flexDirection={['column', 'row']}
            justifyContent="center"
            mb={4}
          >
            <BarChart
              width={400}
              height={300}
              xValueAccessor={d => d.routeName}
              yValueAccessor={d => d.count}
              data={routeCounts}
              xAxisLabel="Routes"
              yAxisLabel="Count"
            />
            <BarChart
              width={400}
              height={300}
              xValueAccessor={d => d.shirtSize}
              yValueAccessor={d => d.count}
              data={getCountData(registrations, 'shirtSize')}
              xAxisLabel="T-Shirt Sizes"
              yAxisLabel="Count"
            />
          </Flex>

          <TableStyles>
            <Table columns={columns} data={registrations} />
          </TableStyles>
        </Box>
      </Box>
    </Layout>
  );
};

AdminPage.defaultProps = {
  AuthUserInfo: null
};

AdminPage.getInitialProps = async ctx => {
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);
  const AuthUser = get(AuthUserInfo, 'AuthUser', null);

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

  const redirectOnError = () => {
    if (process.browser) {
      Router.push('/');
    } else {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    }
  };

  //   if (!AuthUser) {
  //     return redirectOnError();
  //   }

  return { AuthUserInfo, registrations };
};

export default withAuthUser(withAuthUserInfo(AdminPage));
