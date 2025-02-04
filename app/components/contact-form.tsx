"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { submitContactForm } from "../actions"

export default function ContactForm() {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-4 sm:p-6 lg:p-8 backdrop-blur-sm bg-background/95">
      <form action={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <Input id="name" name="name" required className="sm:text-lg" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input id="email" name="email" type="email" required className="sm:text-lg" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            className="min-h-[150px] sm:min-h-[200px] lg:min-h-[250px] sm:text-lg resize-none"
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto px-8 sm:text-lg h-12" size="lg" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && <p className="text-sm sm:text-base text-center mt-4 text-muted-foreground">{message}</p>}
      </form>
    </Card>
  )
}

