import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wedding Ticket - Muraleemayoora & Shantanu | December 2025",
  description: "Your official boarding pass to our wedding celebration! Join us on a journey to happiness as we celebrate our wedding across Kerala and Pune. First Class ticket to love, laughter, and happily ever after.",
  openGraph: {
    title: "Wedding Ticket - Muraleemayoora & Shantanu",
    description: "You're invited! Your boarding pass to our wedding celebration - December 2025",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function WeddingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
