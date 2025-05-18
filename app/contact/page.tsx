"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import ReCAPTCHA from "react-google-recaptcha"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "Full Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email Address is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!recaptchaToken) {
      setErrors((prev) => ({
        ...prev,
        recaptcha: "Please complete the reCAPTCHA",
      }));
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "contactus@integratedidentities.in",
          subject: formState.subject || "Contact Form Submission",
          text: `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
          recaptchaToken,
        }),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setRecaptchaToken(null);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Get in <span className="text-secondary">Touch</span>
                </h1>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  Have a question or want to discuss a project? We'd love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {formStatus === "success" ? (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Success!</AlertTitle>
                        <AlertDescription className="text-green-700">
                          Thanks for reaching out! We'll get back to you as soon as possible.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={errors.name ? "border-red-500" : ""}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            placeholder="john.doe@example.com"
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            placeholder="Project Inquiry"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">
                            Message <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project or inquiry..."
                            rows={5}
                            className={errors.message ? "border-red-500" : ""}
                          />
                          {errors.message && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={setRecaptchaToken}
                          />
                          {errors.recaptcha && (
                            <p className="text-red-500 text-sm flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> {errors.recaptcha}
                            </p>
                          )}
                        </div>

                        <Button type="submit" className="w-full" disabled={formStatus === "submitting"}>
                          {formStatus === "submitting" ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">contactus@integratedidentities.in</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-secondary mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-muted-foreground">+91 8624071741</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-secondary mt-1" />
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="text-muted-foreground">
                        Integrated Identities, Ashoka Society
                        <br />
                        Kalewadi Phata, Thergaon, Pune 411033
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden h-[300px] border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2604098154848!2d73.77434261118164!3d18.60735336644394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x262c9db689139807%3A0x58cb2205b9f33193!2sIntegrated%20Identities!5e0!3m2!1sen!2slt!4v1744495076993!5m2!1sen!2slt"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
                  <Link
                    href="https://www.linkedin.com/company/integrated-identities"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-secondary" />
                    <span>Follow us on LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
