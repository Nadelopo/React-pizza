import {
  removeProduct,
  addOneProduct,
  removeOneProduct,
} from 'redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { ReactComponent as MinusSVG } from 'icons/minus.svg'
import { ReactComponent as PlusSVG } from 'icons/plus.svg'
import { ReactComponent as RemoveSVG } from 'icons/remove.svg'

interface itemProps {
  item: {
    id: string
    activeSize: number
    activeType: string
    count: number
    imageUrl: string
    title: string
    price: number
  }
}

const CartItem: React.FC<itemProps> = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div
      className="content__items"
      key={item.id + item.activeSize + item.activeType}
    >
      <div className="cart__item">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{item.title}</h3>
          <p>
            {item.activeType}, {item.activeSize} см.
          </p>
        </div>
        <div className="cart__item-count">
          <button
            disabled={item.count < 2}
            className="button button--outline button--circle cart__item-count-minus"
            onClick={() => dispatch(removeOneProduct(item))}
          >
            <MinusSVG />
          </button>
          <b>{item.count}</b>
          <button
            className="button button--outline button--circle cart__item-count-plus"
            onClick={() => dispatch(addOneProduct(item))}
          >
            <PlusSVG />
          </button>
        </div>
        <div className="cart__item-price">
          <b>{item.price * item.count} ₽</b>
        </div>
        <div
          className="cart__item-remove"
          onClick={() => dispatch(removeProduct(item))}
        >
          <div className="button button--outline button--circle">
            <RemoveSVG />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
