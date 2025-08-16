import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';
import { NewContactDto } from './dto/new-contact.dto';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: this.configService.get<string>('MAIL_SECURE').includes('true'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async confirmEmail(to: string, code: string): Promise<void> {
    const HTML = `
<!DOCTYPE html>
<html>

<head>
  <title>Bem vindo!</title>
</head>

<body>
  <h1>Olá, seja bem vindo! 👋</h1>
  <p>Você deu início ao cadastro em nossa plataforma, para prosseguir digite o código abaixo:</p>
  <p><strong>Código:</strong> ${code}</p>
  <br/>
  <p>Equipe Projeto X.</p>
</body>

</html>
    `;

    await this.transporter.sendMail({
      from: `"No Reply" <${this.configService.get<string>('MAIL_FROM')}>`,
      to,
      subject: 'Boas vindas ao nosso APP X!',
      html: HTML,
    });
  }

  async contactUs(payload: NewContactDto): Promise<void> {
    const { name, phone, email, text } = payload;

    const HTML = `
<!DOCTYPE html>
<html>

<head>
  <title>Bem vindo!</title>
</head>

<body>
  <h3>Olá! <strong>${name}</strong> enviou uma mensagem...</h3>
  <p>Email: ${email}</p>
  <p>Telefone: ${phone ? phone : ''}</p>
  <p>Mensagem: ${text}</p>
</body>

</html>
    `;

    await this.transporter.sendMail({
      from: `"No Reply" <${this.configService.get<string>('MAIL_FROM')}>`,
      to: `<${this.configService.get<string>('MAIL_CONTACTUS')}>`,
      subject: 'Um usuário entrou em contato.',
      html: HTML,
    });
  }

  async forgotPassword(email: string, code: string): Promise<void> {
    const HTML = `
<!DOCTYPE html>
<html>

<head>
  <title>Bem vindo!</title>
</head>

<body>
  <h3>Olá!</h3>
  <p>Você solicitou recuperação de senha, estamos enviando o código necessário para refefini-la.</p>
  <p><strong>Código:</strong> ${code}</p>
  <p>O código tem validade de 4 horas, após esse periodo, será necessário gerar um novo.</p>
</body>

</html>
    `;

    await this.transporter.sendMail({
      from: `"No Reply" <${this.configService.get<string>('MAIL_FROM')}>`,
      to: email,
      subject: 'Recuperação de senha, Projeto X.',
      html: HTML,
    });
  }
}
