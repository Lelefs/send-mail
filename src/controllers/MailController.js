const { test, envio } = require('../services/MailService');

module.exports = {
  async index(req, res) {
    const textoParaTeste = 'Server running';

    const teste = await test(textoParaTeste);

    return res.status(teste.statusCode).json(teste.message);
  },

  async store(req, res) {
    const { nome, telefone, emailCliente, dataFesta, descricao } = req.body;

    const envioEmail = await envio(
      nome,
      telefone,
      emailCliente,
      dataFesta,
      descricao,
    );

    return res.status(envioEmail.statusCode).json(envioEmail.message);
  },
};
