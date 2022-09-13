import { useSelector } from 'react-redux'
import Category from 'components/Category'
import Sort from 'components/Sort'
import { useState, useEffect, useCallback } from 'react'
import PizzaBlock from 'components/PizzaBlock'
import Skeleton from 'components/PizzaBlock/Skeleton'
import Pagination from 'components/Pagination'
import { setPage } from 'redux/slices/FilterSlice'
import { getCountPage, getItems } from 'redux/slices/pizzaSlice'
import { Estatus } from 'redux/slices/pizzaSlice/types'
import { RootState, useAppDispatch } from 'redux/store'
import { useNavigate } from 'react-router'
import { setCategoryId } from 'redux/slices/FilterSlice'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { categoryId, sort, search, page } = useSelector(
    (state: RootState) => state.filter
  )
  const { items, countPages, status } = useSelector(
    (state: RootState) => state.pizza
  )

  const [limit] = useState(4)

  const changePage = (page: number) => {
    dispatch(setPage(page))
  }

  const changeCategory = useCallback((category: number) => {
    dispatch(setCategoryId(category))
  }, [])

  useEffect(() => {
    const category = categoryId ? categoryId : null
    const orderBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    dispatch(
      getItems({
        page,
        limit,
        category,
        search,
        orderBy,
        order,
      })
    )

    dispatch(getCountPage({ category, search, limit }))
    window.scrollTo(0, 0)

    dispatch(setPage(page))
    navigate(
      `?page=${page}&category=${categoryId}&sort=${sort.sortProperty}&search=${search}`
    )
  }, [page, limit, categoryId, search, sort])

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div>
      <div className="content__top">
        <Category categoryId={categoryId} changeCategory={changeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === Estatus.SUCCESS
          ? pizzas
          : status === Estatus.LOADING
          ? skeleton
          : 'Произошла непредвиденная ошибка'}
      </div>
      <Pagination countPages={countPages} changePage={changePage} />
    </div>
  )
}

export default Home
