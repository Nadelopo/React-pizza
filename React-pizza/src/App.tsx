import './App.sass'
import R, { Suspense } from 'react'
import './scss/app.scss'
import Header from 'components/Header'
import { Home } from 'pages/Home'
import { Routes, Route } from 'react-router-dom'
const Cart = R.lazy(() => import('pages/Cart'))
const NotFound = R.lazy(() => import('pages/NotFound'))
const FullPizza = R.lazy(() => import('pages/FullPizza'))

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="" element={<Home />} />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<div>Идет загрузка...</div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/pizza/:id"
              element={
                <Suspense fallback={<div>Идет загрузка...</div>}>
                  <FullPizza />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Идет загрузка...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
