import { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useQuery } from 'react-query'
import { CloseIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
// import { axiosMock } from '@phc/shared-utils'
import styled from 'styled-components'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { axiosMock } from '../../../../../libs/shared/utils/src/lib/axiosMock'
import { Card, Loader } from '../../components'

// import DataTable from './partials/DataTable'

/* eslint-disable-next-line */
export interface UsersProps {}

const StyledUsers = styled.div`
  /* color: pink; */
`

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <InputGroup size="md">
    <Input
      pr="2.5rem"
      id="search"
      type="text"
      placeholder="Filter by First Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <InputRightElement width="2.5rem">
      <IconButton onClick={onClear} aria-label="clear" icon={<CloseIcon />} />
    </InputRightElement>
  </InputGroup>
)

const Users = (props: UsersProps) => {
  const fetchUsers = async () => {
    try {
      return axiosMock.get('/users').then(res => res.data)
    } catch (error) {
      return error
    }
  }

  const { data, isLoading } = useQuery(
    ['users'], // the "query key"
    fetchUsers
  )

  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])

  const columns = useMemo(
    () => [
      {
        selector: row => row.avatar,
        cell: row => <Avatar src={row.avatar} alt="avatar" />
      },
      {
        name: 'ID',
        selector: row => row.id,
        isNumeric: true,
        sortable: true
      },
      {
        name: 'First Name',
        selector: row => row.first_name,
        sortable: true
      },
      {
        name: 'Last Name',
        selector: row => row.last_name,
        sortable: true
      },
      {
        name: 'Email',
        selector: row => row.email,
        cell: row => (
          <Button href={`mailto:${row.email}`} variant="link">
            {row.email}
          </Button>
        ),
        sortable: true
      }
    ],
    []
  )

  if (isLoading) {
    return <Loader size="xl" />
  }

  const filteredItems = data.data.filter(
    item =>
      item.first_name &&
      item.first_name.toLowerCase().includes(filterText.toLowerCase())
  )

  return (
    <Card>
      <StyledUsers>
        <DataTable
          title="Users"
          fixedHeader
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          selectableRows
          persistTableHead
        />
        {/* <Table variant="simple" {...getTableProps()}>
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
        </Table> */}
      </StyledUsers>
    </Card>
  )
}

export default Users
