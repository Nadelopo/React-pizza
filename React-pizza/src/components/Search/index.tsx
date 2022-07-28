import sls from './Search.module.sass'
import { useDispatch } from 'react-redux'
import { setSearch } from 'redux/slices/FilterSlice'
import { useEffect, useRef, useState } from 'react'
import { ReactComponent as SearchSVG } from 'icons/search.svg'
import { ReactComponent as RemoveSVG } from 'icons/removeSearch.svg'

const Search: React.FC = () => {
  const [Search, SetSearch] = useState('')
  const dispatch = useDispatch()
  const input = useRef<HTMLInputElement>(null)
  const [timeout, setTimeOut] = useState<any>()

  const onChange = (value: string) => {
    SetSearch(value)
    setTimeOut(
      setTimeout(() => {
        dispatch(setSearch(value.replaceAll(' ', '')))
      }, 800)
    )
    clearTimeout(timeout)
  }
  const cleanSearch = () => {
    SetSearch('')
    dispatch(setSearch(''))
    input.current?.focus()
  }

  useEffect(() => () => cleanSearch(), [])

  return (
    <div className={sls.root}>
      <SearchSVG className={sls.icon} />
      <input
        ref={input}
        value={Search}
        onChange={(e) => onChange(e.target.value)}
        className={sls.input}
        placeholder="Поиск пиццы..."
      />
      {Search && (
        <RemoveSVG onClick={() => cleanSearch()} className={sls.clearIcon} />
      )}
    </div>
  )
}

export default Search
