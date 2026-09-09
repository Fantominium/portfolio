import { NextResponse } from 'next/server';
import axios from 'axios';
import isEmail from 'validator/es/lib/isEmail';
import isLength from 'validator/es/lib/isLength';
import normalizeEmail from 'validator/es/lib/normalizeEmail';
import trim from 'validator/es/lib/trim';
import sanitizeHtml from 'sanitize-html';
import sgMail from '@sendgrid/mail';
import { CONTACT_MESSAGE_CODES } from '@/lib/i18n/contactMessages';

export async function POST(request: Request) {
  const { name, email, subject, opportunity, employmentType, recaptchaToken } = await request.json();

  const errors: Record<string, string> = {};
  if (!name) errors.name = CONTACT_MESSAGE_CODES.nameRequired;
  if (!email) errors.email = CONTACT_MESSAGE_CODES.emailRequired;
  if (!subject) errors.subject = CONTACT_MESSAGE_CODES.subjectRequired;
  if (!opportunity) errors.opportunity = CONTACT_MESSAGE_CODES.opportunityRequired;
  if (!employmentType) errors.employmentType = CONTACT_MESSAGE_CODES.employmentTypeRequired;
  if (!recaptchaToken) errors.recaptchaToken = CONTACT_MESSAGE_CODES.recaptchaRequired;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ messageCode: CONTACT_MESSAGE_CODES.invalidInput, errors }, { status: 400 });
  }

  const sanitizedData = {
    name: sanitizeHtml(trim(name)),
    email: sanitizeHtml(normalizeEmail(email) || ''),
    subject: sanitizeHtml(trim(subject)),
    opportunity: sanitizeHtml(trim(opportunity)),
    employmentType: sanitizeHtml(trim(employmentType)),
  };

  if (
    !isLength(sanitizedData.name, { min: 1 }) ||
    !isEmail(sanitizedData.email) ||
    !isLength(sanitizedData.subject, { min: 1 }) ||
    !isLength(sanitizedData.opportunity, { min: 1 })
  ) {
    return NextResponse.json({ messageCode: CONTACT_MESSAGE_CODES.invalidInput }, { status: 400 });
  }

  try {
    const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    });
    if (!captchaRes.data.success) {
      return NextResponse.json({ messageCode: CONTACT_MESSAGE_CODES.recaptchaFailed }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ messageCode: CONTACT_MESSAGE_CODES.recaptchaFailed }, { status: 500 });
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
  catch {
    return NextResponse.json({ messageCode: CONTACT_MESSAGE_CODES.emailFailed }, { status: 500 });
  }
  return NextResponse.json({ messageCode: CONTACT_MESSAGE_CODES.success }, { status: 200 });
}