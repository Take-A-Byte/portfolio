'use client'

import CompanyCard from '../components/CompanyCard'
import Image from 'next/image'

export default function PageContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-wrap justify-center gap-6">
        <CompanyCard
          companyWebsite="https://pspdfkit.com/"
          knowMoreUrl="collaboration/pspdfkit"
          title="PSPDFKit"
          description="PSPDFKit is a collection of SDKs for adding PDF features like creation, viewing, and editing to your applications. It works on various platforms and frameworks, including web, Windows, and iOS."
          image={
            <Image src="/pspdfkit.png" alt="PSPDFKit" width={200} height={300} className="h-48 w-full object-contain" />
          }
          startDate={new Date('2022-06-01')}
          team="Hybrids, dotNET, GenAI"
          location="Remote"
        />

        <CompanyCard
          companyWebsite="https://www.shapr3d.com/"
          knowMoreUrl="collaboration/shapr3d"
          title="Shapr3D"
          description="Shapr3D is a user-friendly CAD software designed to modernize the industry. It works on various devices, making it easier and faster to create designs."
          image={
            <Image src="/Shapr3d-logo.png" alt="Shapr3D" className="h-48 object-contain" width={2000} height={2000} />
          }
          startDate={new Date('2021-06-01')}
          endDate={new Date('2022-06-01')}
          team="Application Experience"
          location="Budapest, Hungary"
        />

        <CompanyCard
          companyWebsite="https://www.renishaw.com/"
          knowMoreUrl="collaboration/renishaw"
          title="Renishaw"
          description="Renishaw is one of the world's leading engineering and scientific technology companies, with expertise in precision measurement and healthcare."
          image={
            <Image src="/renishaw-logo.svg" alt="Shapr3D" className="h-48 object-contain" width={2000} height={2000} />
          }
          startDate={new Date('2018-06-01')}
          endDate={new Date('2021-06-01')}
          team="Industrial Metrology"
          location="Pune, India"
        />
      </div>
    </div>
  )
}
