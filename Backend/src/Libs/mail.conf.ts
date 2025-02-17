import nodemailer from "nodemailer";

const mail = {
  user: process.env.USER_GMAIL,
  pass: process.env.PASSWORD_GMAIL,
  url: process.env.URL,
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",

  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});

/**
 * Envio de Emails .
 * @param email - Email de destinatario.
 * @param name - Nombre del destinatario.
 * @param code - Codeigo de verificacion para la validacion.
 *
 * @returns void.
 */
export const sendEmail = async (email: string, name: string, code: string) => {
  try {
    await transporter.sendMail({
      from: `Reycel <${mail.user}>`,
      to: email,
      subject: "Verificacion de usuario Reycel",
      text: "Verifica tu cuenta",
      html:`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
            }
            .header img {
              max-width: 150px;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .content h2 {
              color: #333333;
            }
            .content p {
              color: #666666;
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #ff9900;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #999999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://yourcompanylogo.com/logo.png" alt="Reycel Logo">
            </div>
            <div class="content">
              <h2>Hola ${name},</h2>
              <p>Gracias por registrarte en Reycel. Para confirmar tu cuenta, por favor haz clic en el siguiente enlace:</p>
              <a href="${mail.url}/verifyUser?q=${code}" target="_blank" class="button">Confirmar Cuenta</a>
            </div>
            <div class="footer">
              <p>Si no te has registrado en Reycel, por favor ignora este correo.</p>
              <p>&copy; 2025 Reycel. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    });
  } catch (error) {
    console.log("Algo no va bien con el email", error);
  }
};
