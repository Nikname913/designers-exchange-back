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
    padding: 40px;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
  `,
  pageTilte: `
    display: block;
    position: relative;
    font-size: 20px
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
    margin: 0 auto;
    margin-top: 34px;
    text-align: center;
    font-size: 15px;
  `
}

const ShowSupportPage = () => {

  let messagesList = JSON.parse(fs.readFileSync('./dataBaseAdmin/messages.json', 'utf-8'))

  return `
    <div style="${ css.contentContainer }" style="display: flex; flex-direction: column;">
      <h3 style="${ css.pageTilte }">Визуализация данных из базы по всем обращениям в техподдержку</h3>
      <div>
        <input
          style="${ css.inputPassword }"
          type="text"
          placeholder="Подтвердите root права паролем"
          maxlength="20"
          disabled
        />
        <span style="${ css.menuItem }">Подтвердить пароль</span>
      </div>
    </div>
  `

}

module.exports = ShowSupportPage