const venom = require('venom-bot');

const venomCreate = async (number, message) => {
  venom
    .create(
      'sessionName',
      undefined,
      (statusSession, session) => {
        // return: isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        console.log('Status Session: ', statusSession);
        // create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
      },
      undefined
    )
    .then((client) => start(client))
    .catch((error) => console.log(error));

  const start = (client) => {
    client.sendText(number, message)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
  }

}

module.exports = venomCreate;