import S from './NotFoundBlock.module.sass'

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={S.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={S.description}>
        К сожалени данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  )
}
