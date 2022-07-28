import ReactPaginate from 'react-paginate'
import S from './Pagination.module.sass'

import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

interface paginationProps {
  countPages: number
  changePage: (page: number) => void
}

const Pagination: React.FC<paginationProps> = ({ countPages, changePage }) => {
  const { page } = useSelector((state: RootState) => state.filter)
  return (
    <ReactPaginate
      className={S.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => changePage(event.selected + 1)}
      forcePage={page - 1}
      pageCount={countPages}
    />
  )
}

export default Pagination
