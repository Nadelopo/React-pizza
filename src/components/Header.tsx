import Search from 'components/Search'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ReactComponent as CartSVG } from 'icons/cart.svg'
import { ReactComponent as LogoSVG } from 'icons/pizza-logo.svg'
import { RootState } from 'redux/store'
import { updateData } from 'redux/slices/cartSlice'

import R from 'react'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  const isMounted = R.useRef(false)
  const isMountedd = R.useRef(false)

  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  )

  const countItems = cartItems.reduce(
    (count: number, item: { count: number }): number => count + item.count,
    0
  )

  R.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }
    isMounted.current = true
  }, [cartItems])

  R.useEffect(() => {
    if (isMountedd.current) {
      localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
    }
    isMountedd.current = true
  }, [totalPrice])

  const dispatch = useDispatch()
  R.useEffect(() => {
    const storageListner = () => dispatch(updateData())
    window.addEventListener('storage', storageListner)
    return () => window.removeEventListener('storage', storageListner)
  }, [])

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <LogoSVG width="38" className="logoSvg" />
            <div>
              <h1>React Pizza V2</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname === '/' && (
          <>
            <Search />
            <div className="header__cart">
              <Link to="/cart" className="button button--cart">
                <span>{totalPrice} ₽</span>
                <div className="button__delimiter"></div>
                <CartSVG />
                <span>{countItems}</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
