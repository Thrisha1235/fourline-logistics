const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        const {
            fullName,
            countryCode,
            phone,
            email,
            service,
            shipmentType,
            shipmentDetails
        } = req.body;

        // Basic validation
        if (
            !fullName ||
            !phone ||
            !service ||
            !shipmentType
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        // Create Brevo SMTP transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const fullPhone =
            `${countryCode || ""} ${phone}`.trim();

        // Email sent to Four Line Logistics
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: process.env.SMTP_TO,
            replyTo: email || undefined,

            subject:
                `Logistics Quote Request - ${fullName}`,

            text:
`Hello Four Line Logistics,

A new logistics quote request has been submitted through the website.

Name: ${fullName}
Contact Number: ${fullPhone}
Email: ${email || "Not provided"}

Service Required: ${service}
Shipment Type: ${shipmentType}

Shipment Details:
${shipmentDetails || "Not provided"}

Thank you.

This enquiry was submitted through the Four Line Logistics website.`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "Quote request sent successfully."
        });

    } catch (error) {

        console.error("Email sending error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send quote request."
        });
    }
};