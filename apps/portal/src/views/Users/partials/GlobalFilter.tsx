import { useState } from 'react'
// import { useAsyncDebounce } from 'react-table'
// A great library for fuzzy filtering/sorting items

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)
  // const onChange = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined)
  // }, 200)

  const onChange = value => {
    setGlobalFilter(value || undefined)
  }

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0'
        }}
      />
    </span>
  )
}

export default GlobalFilter
