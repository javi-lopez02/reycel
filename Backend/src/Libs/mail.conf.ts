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

interface orderItems {
  productId: string;
  quantity: number;
  product: {
      price: number;
      name: string;
      imagen: string | null;
  };
}

interface OrderData {
  email: string;
  name: string;
  orderNumber: number;
  orderDate: string;
  estimatedDelivery: string;
  total: number;
  products: orderItems[];
}

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
      html: `
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

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  resetToken: string
) => {
  try {
    await transporter.sendMail({
      from: `Reycel <${mail.user}>`,
      to: email,
      subject: "Restablecer tu contraseña en Reycel",
      text: `Hola ${name}, para restablecer tu contraseña haz clic en el siguiente enlace: ${mail.url}/reset-password?token=${resetToken}`,
      html: `
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
              margin-bottom: 20px;
            }
            .content p {
              color: #666666;
              line-height: 1.5;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              margin: 20px 0;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              font-size: 16px;
            }
            .warning {
              color: #dc3545;
              font-weight: bold;
              margin: 15px 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #999999;
              border-top: 1px solid #eeeeee;
              margin-top: 20px;
            }
            .token-info {
              background-color: #f8f9fa;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              word-break: break-all;
              font-family: monospace;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://yourcompanylogo.com/logo.png" alt="Reycel Logo">
              <h2>Restablecer Contraseña</h2>
            </div>
            <div class="content">
              <h2>Hola ${name},</h2>
              <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Reycel.</p>
              
              <p>Por favor, haz clic en el siguiente botón para crear una nueva contraseña:</p>
              
              <a href="${
                mail.url
              }/reset-password?token=${resetToken}" target="_blank" class="button">Restablecer Contraseña</a>
              
              <p class="warning">Este enlace expirará en 24 horas. Si no lo usas en ese tiempo, deberás solicitar otro.</p>
              
              <p>Si no puedes hacer clic en el botón, copia y pega la siguiente URL en tu navegador:</p>
              
              <div class="token-info">
                ${mail.url}/reset-password?token=${resetToken}
              </div>
              
              <p>Si no solicitaste este cambio, por favor ignora este correo y considera actualizar tu contraseña por seguridad.</p>
            </div>
            <div class="footer">
              <p>Este correo fue enviado automáticamente. Por favor no respondas a este mensaje.</p>
              <p>&copy; ${new Date().getFullYear()} Reycel. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    });
    console.log(`Correo de restablecimiento enviado a ${email}`);
  } catch (error) {
    console.error("Error al enviar el correo de restablecimiento:", error);
    throw new Error("No se pudo enviar el correo de restablecimiento");
  }
};

/**
 * Envío de Email de Confirmación de Pedido.
 * @param orderData - Datos del pedido y cliente.
 * @returns Promise<void>
 */
export const sendOrderConfirmationEmail = async (orderData: OrderData) => {
  try {
    await transporter.sendMail({
      from: `Reycel <${mail.user}>`,
      to: orderData.email,
      subject: `Confirmación de Pedido #${orderData.orderNumber}`,
      text: `Hola ${orderData.name}, tu pedido ha sido confirmado.`,
      html: `
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
            }
            .content h2 {
              color: #333333;
              text-align: center;
            }
            .order-info {
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .product {
              display: flex;
              margin-bottom: 15px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eee;
            }
            .product-image {
              width: 80px;
              height: 80px;
              object-fit: cover;
              margin-right: 15px;
              border-radius: 4px;
            }
            .product-info {
              flex: 1;
            }
            .product-name {
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
            }
            .product-details {
              color: #666;
              font-size: 14px;
            }
            .total {
              text-align: right;
              font-weight: bold;
              font-size: 18px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #999999;
              border-top: 1px solid #eee;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://reycel.com/logo.png" alt="Reycel Logo">
              <h2>¡Gracias por tu compra, ${orderData.name}!</h2>
            </div>
            
            <div class="content">
              <p>Tu pedido #${
                orderData.orderNumber
              } ha sido confirmado y está siendo procesado.</p>
              
              <div class="order-info">
                <h3>Detalles del Pedido</h3>
                <p><strong>Fecha:</strong> ${orderData.orderDate}</p>
                <p><strong>Envío estimado:</strong> ${
                  orderData.estimatedDelivery
                }</p>
                
                <h4>Productos:</h4>
                ${orderData.products
                  .map(
                    (item) => `
                  <div class="product">
                    ${
                      item.product.imagen
                        ? `<img src="${item.product.imagen}" alt="${item.product.name}" class="product-image">`
                        : '<div class="product-image" style="background: #eee; display: flex; align-items: center; justify-content: center;">📷</div>'
                    }
                    <div class="product-info">
                      <div class="product-name">${item.product.name}</div>
                      <div class="product-details">
                        Cantidad: ${item.quantity}<br>
                        Precio: $${item.product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
                
                <div class="total">
                  Total: $${orderData.total.toFixed(2)}
                </div>
              </div>
              
              <p>Recibirás una notificación cuando tu pedido sea enviado. Si tienes alguna pregunta, no dudes en contactarnos.</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Reycel. Todos los derechos reservados.</p>
              <p>Este es un email automático, por favor no respondas directamente.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    });
    console.log(`Email de confirmación enviado a ${orderData.email}`);
  } catch (error) {
    console.error("Error al enviar el email de confirmación:", error);
    throw new Error("Failed to send order confirmation email");
  }
};
