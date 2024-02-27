var fs = require('fs')
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
    margin-bottom: 20px;
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
  pageSubTilte: `
    display: block;
    position: relative;
    font-size: 18px;
    margin: 0;
    margin-bottom: 25px;
  `,
  pageSubTilteSecond: `
    display: block;
    position: relative;
    font-size: 18px;
    margin: 0;
    margin-top: 33px;
    margin-bottom: 28px;
  `,
  inputPassword: `
    display: block;
    position: relative;
    width: 400px;
    height: 50px;
    outline: none;
    border: 1px solid grey;
    background-color: transparent;
    border-radius: 4px;
    text-align: center;
    margin-top: 20px;
    letter-spacing: 1px;
  `,
  menuItem: `
    display: block;
    line-height: 30px;
    cursor: pointer;
    margin-right: 33px;
  `,
  menuItemAbsolute: `
    display: block;
    position: absolute;
    line-height: 30px;
    cursor: pointer;
    margin-top: 22px;
    margin-left: 34px;
    text-align: center;
    font-size: 15px;
    top: 0;
    left: 0;
  `,
  usersContainer: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    padding-left: 200px;
    padding-right: 200px;
  `,
  userItem: `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    padding-left: 18px;
    border-bottom: 1px solid #D9E7F0;
  `,
  useItemDelimiter: `
    display: none;
    position: relative;
    width: 1px; 
    height: 40px;
    background-color: grey;
    margin-left: 16px;
    margin-right: 16px;
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
    margin-bottom: 14px;
    padding-left: 200px;
    padding-right: 200px;
  `,
  selectIcon: `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 2px solid gray;
    cursor: pointer;
  `
}

const AppDataPage = (data) => {

  const { USERS } = data

  const users = JSON.parse(fs.readFileSync('./dataBase/auth.json', 'utf-8'))

  const CONTENT = `
    <script>
      setTimeout(() => { 
        document.body.style.margin = '0px'
        document.body.style.fontFamily = '"Montserrat", sans-serif'
        document.body.style.backgroundColor = '#F7FAFC'
      })

      setTimeout(() => {

        const userSelect = document.getElementsByClassName('user-item')

        for ( let i = 0; i < userSelect.length; i++ ) {

          userSelect[i].onclick = function() {
            
            if ( this.getElementsByTagName('span')[0].style.opacity == 0 ) {

              this.getElementsByTagName('span')[0].style.opacity = 1

            } else {

              this.getElementsByTagName('span')[0].style.opacity = 0

            }

          }

        }

      }, 1000)
    </script>
    <div style="${ newCss.header }">
      <h3 style="${ css.pageTilte }">Активность пользователей в системе</h3>
    </div>
    <div style="${ newCss.topMenu }">
      <span style="${ css.menuItem }">
        <a style="text-decoration: none; color: black; opacity: 0.8;" href="/#">Начало</a>
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
        <a style="text-decoration: none; color: rgb(22, 124, 191); opacity: 0.8;" href="/8000/logs">Активность</a>
      </span>
    </div>
    <div style="${ css.usersContainer }">

      <div style="${ css.userItem }">

        <span class="user-item-all" style="${ newCss.selectIcon }"></span>

        <span 
          style="
            display: block; 
            position: relative; 
            margin-bottom: 3px; 
            box-sizing: border-box;
            width: 15%;
            text-align: center;
            font-weight: bold;
            margin-left: 16px;
          ">ID</span>
        <span 
          style="
            display: block; 
            position: relative; 
            margin-bottom: 3px; 
            box-sizing: border-box;
            width: 35%;
            text-align: left;
            font-size: 15px;
            font-weight: bold;
          ">Время активности</span>
          <span 
            style="
              display: block; 
              position: relative; 
              margin-bottom: 3px; 
              box-sizing: border-box;
              width: 45%;
              text-align: center;
              font-size: 15px;
              font-weight: bold;
            ">Идентификатор пользователя</span>
      </div>

      ${ USERS.map((user, index) => {

        const userSpan = `
        
          <div style="${ css.userItem }">

            <span class="user-item" style="${ newCss.selectIcon }">
              <span 
                style="
                  display: block; 
                  position: relative; 
                  width: 10px; 
                  height: 10px; 
                  background-color: rgb(22, 124, 191);
                  border-radius: 4px;
                  opacity: 0;
                "
              ></span>
            </span>

            <span 
              style="
                display: block; 
                position: relative; 
                margin-bottom: 3px; 
                box-sizing: border-box;
                width: 15%;
                text-align: center;
                margin-left: 16px;
              ">UP-0${ ( index + 1 ) }</span>
            <span 
              style="
                display: block; 
                position: relative; 
                margin-bottom: 3px; 
                box-sizing: border-box;
                width: 35%;
                text-align: left;
                font-size: 15px;
              ">${ user.time }</span>
            <span 
              style="
                display: block; 
                position: relative; 
                margin-bottom: 3px; 
                box-sizing: border-box;
                width: 45%;
                text-align: center;
                font-size: 15px;
                line-height: 23px;
              ">${ users.users.filter(userIter => userIter.clientId === user.userId)[0].login }
              <span style="display: block; position: absolute; color: gray; font-size: 12px; width: 100%; text-align: center;">${ user.userId }</span>  
            </span>
          </div>
        
        `

        return userSpan

      }).join('')}
    </div></div>
  `

  return CONTENT

}

module.exports = AppDataPage