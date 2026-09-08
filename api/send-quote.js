const https = require("https");

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
        } = req.body || {};


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


        // Check Brevo API key
        if (!process.env.BREVO_API_KEY) {

            console.error("BREVO_API_KEY is missing.");

            return res.status(500).json({
                success: false,
                message: "Email service is not configured."
            });

        }


        const fullPhone =
            `${countryCode || ""} ${phone}`.trim();


        // Brevo email data
        const emailData = {

           sender: {
    name: "Four Line Logistics",
    email: "eliteinfotechdubai@gmail.com"
},

            to: [
                {
                    email: "ops@four-line.com",
                    name: "Four Line Logistics"
                },
                {
                    email: "marketing@eliteinfotech.com",
                    name: "Elite Infotech"
                }
            ],

            replyTo: email
                ? {
                    email: email
                }
                : undefined,

            subject:
                `Logistics Quote Request - ${fullName}`,

            textContent:
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


        // Remove replyTo if customer email is empty
        if (!emailData.replyTo) {
            delete emailData.replyTo;
        }


        // Send email through Brevo API
        const response = await new Promise((resolve, reject) => {

            const request = https.request(
                {
                    hostname: "api.brevo.com",
                    path: "/v3/smtp/email",
                    method: "POST",

                    headers: {
                        "accept": "application/json",
                        "api-key": process.env.BREVO_API_KEY,
                        "content-type": "application/json"
                    }
                },

                (response) => {

                    let body = "";

                    response.on("data", (chunk) => {
                        body += chunk;
                    });

                    response.on("end", () => {

                        resolve({
                            statusCode: response.statusCode,
                            body: body
                        });

                    });

                }
            );


            request.on("error", reject);


            request.write(
                JSON.stringify(emailData)
            );

            request.end();

        });


        console.log(
            "Brevo response:",
            response.statusCode,
            response.body
        );


        if (
            response.statusCode >= 200 &&
            response.statusCode < 300
        ) {

            return res.status(200).json({
                success: true,
                message: "Quote request sent successfully."
            });

        }


        return res.status(500).json({
            success: false,
            message: "Brevo could not send the email."
        });


    } catch (error) {

        console.error(
            "Email sending error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to send quote request."
        });

    }

};