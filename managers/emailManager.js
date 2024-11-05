const nodemailer = require("nodemailer");
const emailManager = async(to, text,html, subject) => {
	
	
	//send email
	// Looking to send emails in production? Check out our Email API/SMTP product!
	var transport = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "8466610b8c9428",
			pass: "7ae546b8af1bee"
		}
	});
	
	
	await transport.sendMail({
		to: to,
		from: "info@expensetracker.com",
		text: text,
		html: html,
		subject: subject,
		
	})
	
	
}

module.exports = emailManager;