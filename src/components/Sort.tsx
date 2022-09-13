import R from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSort } from 'redux/slices/FilterSlice'
import { TsortProperty } from 'redux/slices/FilterSlice/types'
import { ReactComponent as ArrowSVG } from 'icons/arrowSort.svg'
import { RootState } from 'redux/store'

interface SortName {
  name: string
  sortProperty: TsortProperty
}

const nameSort: SortName[] = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'title' },
  { name: 'алфавиту (ASC)', sortProperty: '-title' },
]

const Sort: React.FC = R.memo(() => {
  const [open, setOpen] = R.useState(false)
  const sortRef = R.useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { name } = useSelector((state: RootState) => state.filter.sort)

  const choose = (e: SortName) => {
    dispatch(setSort(e))
    setOpen(false)
  }

  R.useEffect(() => {
    const listner = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', listner)
    return () => document.body.removeEventListener('click', listner)
  }, [])

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <ArrowSVG />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {nameSort.map((e) => (
              <li
                key={e.name}
                className={name === e.name ? 'active' : ''}
                onClick={() => choose(e)}
              >
                {e.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})

export default Sort
