import { useMemo } from 'react'
import { useFilters, useSortBy, useTable } from 'react-table'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import styled from 'styled-components'

import { Card } from '../../components'

/* eslint-disable-next-line */
export interface UsersProps {}

const StyledUsers = styled.div`
  /* color: pink; */
`

const Users = (props: UsersProps) => {
  const data = useMemo(
    () => [
      {
        fromUnit: 'inches',
        toUnit: 'millimetres (mm)',
        factor: 25.4
      },
      {
        fromUnit: 'feet',
        toUnit: 'centimetres (cm)',
        factor: 30.48
      },
      {
        fromUnit: 'yards',
        toUnit: 'metres (m)',
        factor: 0.91444
      }
    ],
    []
  )

  const columns = useMemo(
    () => [
      {
        Header: 'To convert',
        accessor: 'fromUnit'
      },
      {
        Header: 'Into',
        accessor: 'toUnit'
      },
      {
        Header: 'Multiply by',
        accessor: 'factor',
        isNumeric: true
      }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters, useSortBy)

  return (
    <Card>
      <StyledUsers>
        {/* <Table columns={columns} data={data} /> */}
        <Table {...getTableProps()} variant="simple">
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render('Header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </StyledUsers>
    </Card>
  )
}

export default Users
