import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Read the frontend URL from .env
const FRONTEND_URL =
    process.env.FRONTEND_URL || "http://localhost:5173";

export const sendWhatsApp = async ({
    phone,
    name,
    age,
    department,
    symptoms,
    token,
    qrUrl
}) => {

    let formattedPhone = phone.replace(/\D/g, "");

    if (formattedPhone.startsWith("0")) {
        formattedPhone = formattedPhone.substring(1);
    }

    if (!formattedPhone.startsWith("91")) {
        formattedPhone = "91" + formattedPhone;
    }

    formattedPhone = `whatsapp:+${formattedPhone}`;

    const trackingUrl = `${FRONTEND_URL}/track/${token}`;

    const message = `🏥 *Smart Digital Hospital*

Hello *${name}*,

Your appointment has been successfully registered.

━━━━━━━━━━━━━━━━━━━━━━

🎟 *Token:* ${token}
🩺 *Department:* ${department}
👤 *Age:* ${age}
📝 *Problem:* ${symptoms}

━━━━━━━━━━━━━━━━━━━━━━

📱 *Track your consultation live*

${trackingUrl}

or

📷 Scan the attached QR Code.

━━━━━━━━━━━━━━━━━━━━━━

The tracking page updates automatically every few seconds.

Please arrive when your token is called.

Thank you for choosing Smart Digital Hospital.`;

    const payload = {
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: formattedPhone,
        body: message,
        mediaUrl: [qrUrl]
    };

    console.log("Sending WhatsApp payload:");
    console.log(payload);

    const response = await client.messages.create(payload);

    console.log("Message SID:", response.sid);

    return response;
};