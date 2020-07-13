var nodemailer = require('nodemailer');
require('dotenv/config');

const test = text => {
  if (text === '' || !text) {
    return { message: 'Preencha todas as informações.', statusCode: 400 };
  }
  return { message: text, statusCode: 200 };
};

const envio = async (nome, telefone, emailCliente, dataFesta, descricao) => {
  console.log(nome, telefone, emailCliente, dataFesta, descricao);
  if (!nome || !telefone || !emailCliente || !dataFesta || !descricao) {
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
    html: `Nome: ${nome} <br/> E-mail: ${emailCliente} <br/> Telefone: ${telefone} <br/> Data da festa: ${dataFesta} <br/><br/> ${descricao}`,
  };

  try {
    await remetente.sendMail(emailASerEnviado);

    return { message: 'Email enviado com sucesso.', statusCode: 200 };
  } catch (e) {
    return {
      message: 'Ocorreu um erro ao tentar enviar seu orçamento.',
      statusCode: 400,
    };
  }
};

module.exports = {
  test,
  envio,
};
