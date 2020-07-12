var nodemailer = require('nodemailer');
require('dotenv/config');

const test = text => {
  if (text === '' || !text) {
    return { message: 'Preencha todas as informações.', statusCode: 400 };
  }
  return { message: text, statusCode: 200 };
};

const envio = async (nome, telefone, email, dataFesta, descricao) => {
  if (!nome || !telefone || !email || !dataFesta || !descricao) {
    return { message: 'Preencha todas as informações.', statusCode: 400 };
  }

  var remetente = nodemailer.createTransport({
    host: process.env.SMTP,
    port: process.env.NODE_ENV === 'dev' ? process.env.PORT_SMTP : 465,
    secure: process.env.NODE_ENV === 'dev' ? false : true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SENHA_EMAIL,
    },
  });

  const emailASerEnviado = {
    from: `${nome} <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: `Orçamento para o dia ${dataFesta}`,
    html: `Nome: ${nome} <br/> E-mail: ${email} <br/> Telefone: ${telefone} <br/> Data da festa: ${dataFesta} <br/><br/> ${descricao}`,
  };

  try {
    await remetente.sendMail(emailASerEnviado);

    return { message: 'Email enviado com sucesso.', statusCode: 200 };
  } catch (e) {
    console.log(e);
    return { message: 'Preencha todas as informações.', statusCode: 400 };
  }
};

module.exports = {
  test,
  envio,
};
