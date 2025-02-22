import { NextResponse } from 'next/server';
import axios from 'axios';
import validator from 'validator';
import sanitizeHtml from 'sanitize-html';
import sgMail from '@sendgrid/mail';
import sanitize from 'sanitize-html';

export async function POST(request: Request) {
  const { name, email, subject, opportunity, employmentType, recaptchaToken } = await request.json();

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required';
  if (!email) errors.email = 'Email is required';
  if (!subject) errors.subject = 'Subject is required';
  if (!opportunity) errors.opportunity = 'Opportunity is required';
  if (!employmentType) errors.employmentType = 'Employment type is required';
  if (!recaptchaToken) errors.recaptchaToken = 'reCAPTCHA is required';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const sanitizedData = {
    name: sanitizeHtml(validator.trim(name)),
    email: sanitizeHtml(validator.normalizeEmail(email) || ''),
    subject: sanitizeHtml(validator.trim(subject)),
    opportunity: sanitizeHtml(validator.trim(opportunity)),
    employmentType: sanitizeHtml(validator.trim(employmentType)),
  };

  if (
    !validator.isLength(sanitizedData.name, { min: 1 }) ||
    !validator.isEmail(sanitizedData.email) ||
    !validator.isLength(sanitizedData.subject, { min: 1 }) ||
    !validator.isLength(sanitizedData.opportunity, { min: 1 })
  ) {
    return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
  }

  try {
    const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    });
    if (!captchaRes.data.success) {
      return NextResponse.json({ message: 'Invalid reCAPTCHA' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'reCAPTCHA verification failed' }, { status: 500 });
  }

  // Process form submission (e.g., send email, save to DB) here.
  console.log("sanitised data ", sanitizedData);
  try {
    // Send email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg = {
      to: 'mkg.consultancy.uk@gmail.com', // Change to your recipient
      from: 'no-reply@mkgconsultancy.uk', // Change to your verified sender
      subject: `${sanitizedData.name} via MKG Consultancy website`,
      text: `${sanitizedData.employmentType}`,
      html: `<p>Email address: ${sanitizedData.email}</p> 
                <p>Subject: ${sanitizedData.subject}</p>
                <p>Employment type: ${sanitizedData.employmentType}</p> 
                <p>Opportunity: ${sanitizedData.opportunity}</p>`,
    };
    await sgMail.send(msg);
  }
  catch (error) {
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Your message has been sent!' }, { status: 200 });
}