import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectType, businessName, contactPhone, contactEmail } = body;

    // Validation
    if (!projectType || !businessName || !contactPhone || !contactEmail) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    // Secure destination email read server-side only
    const destinationEmail = process.env.CONTACT_EMAIL || "vzarat96@gmail.com";

    // Logging transmission server-side
    console.log("==================================================");
    console.log("SHRK Media Studio - NUEVO LEAD RECIBIDO");
    console.log(`Enviar a: ${destinationEmail}`);
    console.log(`Negocio: ${businessName}`);
    console.log(`Tipo: ${projectType}`);
    console.log(`Contacto: WhatsApp: ${contactPhone} | Email: ${contactEmail}`);
    console.log("==================================================");

    // Integración de servicio de mensajería (Resend, Nodemailer, etc.)
    // Ejemplo de plantilla para producción:
    //
    // const nodemailer = require("nodemailer");
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || "587"),
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    //
    // await transporter.sendMail({
    //   from: '"SHRK Media Studio" <leads@shrkstudio.com>',
    //   to: destinationEmail,
    //   subject: `Nuevo Proyecto: ${businessName}`,
    //   html: `<p>Detalles del lead...</p>`,
    // });

    return NextResponse.json(
      { success: true, message: "Visión enviada exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en API Route /api/contact:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
