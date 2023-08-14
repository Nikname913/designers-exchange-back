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
  messagesContainer: `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto;
  `,
  pageTilte: `
    display: block;
    position: relative;
    font-size: 20px
  `,
  pageSubTilteSecond: `
    display: block;
    position: relative;
    font-size: 18px;
    margin: 0;
    margin-top: 28px;
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
    margin: 0 auto;
    margin-top: 34px;
    text-align: center;
    font-size: 15px;
  `,
  userItem: `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border: 1px solid grey;
    border-radius: 4px;
    margin-top: 10px;
  `,
  useItemDelimiter: `
    display: block;
    position: relative;
    width: 1px; 
    height: 40px;
    background-color: grey;
    margin-left: 16px;
    margin-right: 16px;
  `
}

const ShowSupportPage = (data) => {

  const { MESS } = data

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
      <h4 style="${ css.pageSubTilteSecond }">Обращения в техподдержку</h4>
      <div style="${ css.messagesContainer }">
        ${ MESS.map(message => {

          const messageSpan = `
          
            <div style="${ css.userItem }">
              <span 
                style="
                  display: block; 
                  position: relative; 
                  margin-bottom: 3px; 
                  box-sizing: border-box;
                  width: 180px;
                  text-align: right;
                ">${ message.userName }</span>
              <span style="${ css.useItemDelimiter }"></span>
              <span 
                style="
                  display: block; 
                  position: relative; 
                  margin-bottom: 3px; 
                  box-sizing: border-box;
                  width: 180px;
                  text-align: left;
                ">${ message.category }</span>
              <span
                userID="${ message.userId }"
                class="remove-user-button"
                style="
                  font-size: 12px; 
                  letter-spacing: 1.4px;
                  display: block;
                  position: absolute;
                  box-sizing: border-box;
                  left: 100%;
                  margin-left: -100px;
                  cursor: pointer;
                ">DELETE</span>
            </div>
          
          `

          return messageSpan

        }).join('')}
      </div>
    </div>
  `

}

module.exports = ShowSupportPage