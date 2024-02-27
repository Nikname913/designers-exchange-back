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
    font-size: 20px;
    opacity: 0.7;
    letter-spacing: 2px;
    font-weight: normal;
    font-size: 16px;
  `,
  menuItem: `
    display: block;
    line-height: 30px;
    cursor: pointer;
    margin-right: 33px;
  `
}

const newCss = {
  header: `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 16px 2px;
    padding-left: 200px;
    padding-right: 200px;
  `,
  topMenu: `
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    font-size: 14px;
    margin-top: 50px;
    padding-left: 200px;
    padding-right: 200px;
  `,
}

const MainPage = ({ IP }) => {

  return `
    <script>
      setTimeout(() => { 
        document.body.style.margin = '0px'
        document.body.style.fontFamily = '"Montserrat", sans-serif'
        document.body.style.backgroundColor = '#F7FAFC'
      })
    </script>
    <div style="${ newCss.header }">
      <h3 style="${ css.pageTilte }">Ваш ip-адрес ${IP}</h3>
    </div>
    <div style="${ newCss.topMenu }">
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: rgb(22, 124, 191); opacity: 0.8;" href="/#">Начало</a>
      </span>
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/8000/data">Пользователи</a>
      </span>
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/8000/support">Запросы в поддержку</a>
      </span>
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/8000/tasks">Заказы в системе</a>
      </span>
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/#">Подтверждение данных</a>
      </span>
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/#">Квалификация</a>
      </span>
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/#">Методы API</a>
      </span>
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/8000/logs">Активность</a>
      </span>
    </div>
    <span 
      style="
        display: block; 
        position: relative; 
        width: 100%; 
        height: 1px; 
        background-color: #D9E7F0;
        margin-top: 52px;
      "
    ></span>
  `

}

module.exports = MainPage