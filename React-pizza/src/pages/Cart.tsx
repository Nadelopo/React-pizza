import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cleanCart } from 'redux/slices/cartSlice'
import Swal from 'sweetalert2'
import { RootState } from 'redux/store'
import CartEmpty from 'components/CartEmpty'
import CartItem from 'components/CartItem'
import { ReactComponent as CartSVG } from 'icons/cartInCart.svg'
import { ReactComponent as TrashSVG } from 'icons/trash.svg'
import { ReactComponent as ArrowSVG } from 'icons/arrowCart.svg'

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  )

  const countItems = cartItems.reduce(
    (count: number, item: { count: number }): number => count + item.count,
    0
  )
  const clean = () => {
    Swal.fire({
      title: 'Удалить все?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Да',
      cancelButtonText: `Оставить`,
    }).then((e) => {
      if (e.isConfirmed) {
        dispatch(cleanCart())
      }
    })
  }

  if (cartItems.length === 0) {
    return <CartEmpty />
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartSVG />
            Корзина
          </h2>
          <div className="cart__clear">
            <TrashSVG />
            <span onClick={clean}>Очистить корзину</span>
          </div>
        </div>
        {cartItems.map((item: any) => (
          <CartItem
            item={item}
            key={item.id + item.activeType + item.activeSize}
          />
        ))}
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {' '}
              Всего пицц: <b>{countItems} шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сумма заказа: <b>{totalPrice} ₽</b>{' '}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <ArrowSVG />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
