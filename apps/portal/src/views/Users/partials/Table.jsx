// A great library for fuzzy filtering/sorting items
import { useMemo } from 'react'
import {
  Tbody,
  Th,
  Thead,
  Tr,
  // useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useTable
} from 'react-table'
import { matchSorter } from 'match-sorter'

import ColumnFilter from './ColumnFilter'
import GlobalFilter from './GlobalFilter'

// type TableRows = {
//   values: Record<string, unknown>
// }

const fuzzyTextFilterFn = (rows, id, filterValue) => {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const Table = ({ columns, data }) => {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }),
    []
  )

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10)

  return (
    <>
      <Table {...getTableProps()} variant="striped">
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </Th>
              ))}
            </Tr>
          ))}
          <Tr>
            <Th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left'
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}

export default Table
