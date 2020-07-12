const { test, envio } = require('../../services/MailService');

describe('Send Mail', () => {
  it('should return text of test', async () => {
    const texto = 'Teste';

    const envio = await test(texto);

    expect(envio.message).toBe('Teste');
  });

  it('should not return text of empty test', async () => {
    const texto = '';

    const envio = await test(texto);

    expect(envio.message).toBe('Preencha todas as informações.');
  });

  it('should send email', async () => {
    const nome = 'Jhon Doe';
    const telefone = '12 34567-8901';
    const email = 'jhondoe@hotmail.com';
    const dataFesta = '12/34/56789';
    const descricao = 'Teste de envio de e-mail';

    const enviar = await envio(nome, telefone, email, dataFesta, descricao);

    expect(enviar.message).toBe('Email enviado com sucesso.');
  });

  it('should not send email', async () => {
    const nome = '';
    const telefone = '';
    const email = 'jhondoe@hotmail.com';
    const dataFesta = '12/34/56789';
    const descricao = 'Teste de envio de e-mail';

    const enviar = await envio(nome, telefone, email, dataFesta, descricao);

    expect(enviar.message).toBe('Preencha todas as informações.');
  });
});
