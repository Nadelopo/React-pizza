import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from 'redux/slices/cartSlice'

interface PizzaBlockProps {
  id: string
  imageUrl: string
  title: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  raiting: number
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types
}) => {
  const dispatch = useDispatch()

  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const typeNames = ['тонкое', 'традиционное']

  const product = {
    id,
    title,
    price,
    imageUrl,
    count: 0,
    activeSize: sizes[activeSize],
    activeType: typeNames[activeType]
  }
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={'pizza/' + id}>
          <img
            className="pizza-block__image"
            src="https://media.dodostatic.net/image/r:292x292/11EF9C1DAAFCF3529A62947B9522A8FE.avif"
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeIndex, index) => (
              <li
                key={index}
                className={activeType === index ? 'active' : ''}
                onClick={() => setActiveType(index)}
              >
                {typeNames[typeIndex]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                className={activeSize === index ? 'active' : ''}
                onClick={() => setActiveSize(index)}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={() => dispatch(addProduct(product))}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock
