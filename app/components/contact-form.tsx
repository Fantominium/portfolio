"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"


interface FormData {
  name: string;
  email: string;
  subject: string;
  opportunity: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  opportunity?: string;
  employmentType?: string;
}

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [employmentType, setEmploymentType] = useState("contract")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    opportunity: "",
  })
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!recaptchaToken) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }
    setPending(true);
    setFormErrors({});
    try {
      const response = await axios.post("/api/contact", {
        ...formData,
        employmentType,
        recaptchaToken,
      });
      setMessage(response.data.message);
      // Clear the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        opportunity: "",
      });
      setEmploymentType("contract");
      setRecaptchaToken(null);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="p-4 sm:p-6 lg:p-8 backdrop-blur-sm bg-background/95">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="sm:text-lg"
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="sm:text-lg"
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            required
            className="sm:text-lg w-full"
          />
          {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
        </div>
        <div>
          <label htmlFor="opportunity" className="block text-sm font-medium mb-2">
            Opportunity
          </label>
          <Textarea
            id="opportunity"
            name="opportunity"
            value={formData.opportunity}
            onChange={handleChange}
            required
            className="min-h-[150px] sm:min-h-[200px] lg:min-h-[250px] sm:text-lg resize-none w-full"
          />
          {formErrors.opportunity && <p className="text-red-500 text-sm mt-1">{formErrors.opportunity}</p>}
        </div>
        <div>
          <label htmlFor="employmentType" className="block text-sm font-medium mb-2">Employment Type</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="contract"
                name="employmentType"
                value="contract"
                checked={employmentType === "contract"}
                onChange={() => setEmploymentType("contract")}
                className="m-4"
              />
              <label htmlFor="contract" className="text-sm font-medium">Contract</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="permanent"
                name="employmentType"
                value="permanent"
                checked={employmentType === "permanent"}
                onChange={() => setEmploymentType("permanent")}
                className="m-4"
              />
              <label htmlFor="permanent" className="text-sm font-medium">Permanent</label>
            </div>
          </div>
          {formErrors.employmentType && <p className="text-red-500 text-sm mt-1">{formErrors.employmentType}</p>}
        </div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
          onChange={(token) => setRecaptchaToken(token)}
        />
        <Button type="submit" className="w-full sm:w-auto px-8 sm:text-lg h-12" size="lg" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && <p className={`text-sm sm:text-base text-center mt-4 ${message.includes("sent") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
      </form>
    </Card>
  )
}

