import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import R from 'react'
import axios from 'axios'

interface typePizza {
  imageUrl: string
  title: string
  price: number
}

const FullPizza: React.FC = () => {
  const { id } = useParams()
  const [pizza, setPizza] = R.useState<typePizza>()
  const navigate = useNavigate()

  R.useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          'https://62ced2ed486b6ce8264d6e96.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибки получения данных')
        console.log(error)
        navigate('/')
      }
    }
    getPizza()
  }, [])

  if (!pizza) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Загрузка...</h1>
      </div>
    )
  }

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
