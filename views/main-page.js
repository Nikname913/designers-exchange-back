const css = {
  contentContainer: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: calc(100% - 26px);
    min-height: 100px;
    border-radius: 4px;
    background-color: #D9E7F0;
    margin: 0 auto;
    margin-top: 20px;
    padding: 40px;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
  `,
  pageTilte: `
    display: block;
    position: relative;
    font-size: 20px
  `,
  menuItem: `
    display: block;
    line-height: 24px;
    cursor: pointer;
  `
}

const MainPage = ({ IP }) => {

  return `<div style="${ css.contentContainer }" style="display: flex; flex-direction: column;">
    <h3 style="${ css.pageTilte }">Добро пожаловать в серверную часть приложения биржи проектировщиков. Ваш ip-адрес ${IP}</h3>
    <span style="${ css.menuItem }">Просмотр доступных методов              *</span>
    <span style="${ css.menuItem }">Переход в админ-панель приложения       *</span>
    <span style="${ css.menuItem }">Просмотр сырых данных приложения        *</span>
    <span style="${ css.menuItem }">Обращения пользователей в техподдержку  *</span>
  </div>
  `

}

module.exports = MainPage