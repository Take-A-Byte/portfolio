import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Header Section */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-secondary text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  How we collect, use, and protect your information
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-12 md:py-16 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto prose prose-headings:font-bold prose-headings:text-primary">
              <div className="mb-10">
                <p className="text-muted-foreground">Last Updated: May 16, 2025</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl mb-4">Introduction</h2>
                  <p>
                    Integrated Identities ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                    website or use our services.
                  </p>
                  <p>
                    Please read this Privacy Policy carefully. By accessing or using our website or services, you
                    acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this
                    Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Information We Collect</h2>
                  <p>We may collect information about you in a variety of ways:</p>

                  <h3 className="text-xl mt-6 mb-3">Personal Data</h3>
                  <p>
                    When you visit our website or use our services, we may collect personally identifiable information,
                    such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Company name</li>
                    <li>Job title</li>
                    <li>Information you provide when filling out forms on our website</li>
                    <li>Records and copies of your correspondence with us</li>
                  </ul>

                  <h3 className="text-xl mt-6 mb-3">Automatically Collected Information</h3>
                  <p>
                    When you visit our website, our servers may automatically log standard data provided by your web
                    browser. This data may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your computer's IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Referring website</li>
                    <li>Pages you visit</li>
                    <li>Time spent on pages</li>
                    <li>Access times and dates</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">How We Use Your Information</h2>
                  <p>We may use the information we collect about you for various purposes, including to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our website and services</li>
                    <li>Process and complete transactions</li>
                    <li>Send you technical notices, updates, security alerts, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Communicate with you about products, services, offers, and events</li>
                    <li>Develop new products and services</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
                    <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Disclosure of Your Information</h2>
                  <p>
                    We may share information we have collected about you in certain situations. Your information may be
                    disclosed as follows:
                  </p>

                  <h3 className="text-xl mt-6 mb-3">By Law or to Protect Rights</h3>
                  <p>
                    If we believe the release of information about you is necessary to respond to legal process, to
                    investigate or remedy potential violations of our policies, or to protect the rights, property, and
                    safety of others, we may share your information as permitted or required by any applicable law,
                    rule, or regulation.
                  </p>

                  <h3 className="text-xl mt-6 mb-3">Business Transfers</h3>
                  <p>
                    If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your
                    information may be transferred as part of that transaction. We will notify you via email and/or a
                    prominent notice on our website of any change in ownership or uses of your personal information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Security of Your Information</h2>
                  <p>
                    We use administrative, technical, and physical security measures to help protect your personal
                    information. While we have taken reasonable steps to secure the personal information you provide to
                    us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and
                    no method of data transmission can be guaranteed against any interception or other type of misuse.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Cookies and Web Beacons</h2>
                  <p>
                    We may use cookies, web beacons, tracking pixels, and other tracking technologies on our website to
                    help customize the website and improve your experience. When you access our website, your personal
                    information is not collected through the use of tracking technology. Most browsers are set to accept
                    cookies by default. You can remove or reject cookies, but be aware that such action could affect the
                    availability and functionality of the website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Your Rights Regarding Your Information</h2>
                  <h3 className="text-xl mt-6 mb-3">Access, Correction, and Deletion</h3>
                  <p>
                    You have the right to request access to the personal information we collect from you, change that
                    information, or delete it. To request to review, update, or delete your personal information, please
                    contact us using the contact information provided below.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. The updated version will be indicated by an
                    updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
                    We encourage you to review this Privacy Policy frequently to be informed of how we are protecting
                    your information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl mb-4">Contact Us</h2>
                  <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                  <div className="mt-4">
                    <span className="font-medium">Integrated Identities</span>
                    <br />Ashoka Society, Kalewadi Phata
                    <br />Thergaon, Pune 411033
                    <br />India
                    <p className="mt-2">Email: contactus@integratedidentities.in</p>
                    <p>Phone: +91 8624071741</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Button asChild variant="outline" className="flex items-center gap-2">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
