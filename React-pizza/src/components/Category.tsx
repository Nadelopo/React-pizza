import R from 'react'

interface categoryProps {
  categoryId: number
  changeCategory: (category: number) => void
}

const Category: React.FC<categoryProps> = R.memo(
  ({ categoryId, changeCategory }) => {
    const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
    ]

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={categoryName}
              className={categoryId === index ? 'active' : ''}
              onClick={() => changeCategory(index)}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default Category
