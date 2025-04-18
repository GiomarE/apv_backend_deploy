import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  //Enviar el email

  const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> </p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;

/*
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d8aa1cacbd2ceb",
    pass: "edaa372a8e5c3e"
  }
});
*/