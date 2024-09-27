'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function PageContent() {
  const [isHovered, setIsHovered] = useState(false)
  const [isEvenProjectHovered, setIsEvenProjectHovered] = useState<boolean | undefined>(undefined)
  const handleHover = (isHovered: boolean, isEvenHovered: boolean | undefined = undefined) => {
    setIsHovered(isHovered)
    setIsEvenProjectHovered(isEvenHovered)
  }

  const projects = [
    {
      title: 'PSPDFKit for Windows',
      description:
        'SDK offering developers powerful APIs for quickly adding document functionalities to a windows application.',
    },
    {
      title: 'PSPDFKit for MAUI',
      description:
        'One SDK to deploy document functionalities on cross-platform apps on iOS, MacOS, Android, and Windows.',
    },
    {
      title: 'Avelyn',
      description:
        'Elevate your document workflow with conversational interactions. Ask questions, make requests, and simplify your document handling.',
    },
    {
      title: 'Shapr3D for Windows',
      description:
        'Design your 3D models on Windows machine - be it on a desktop, laptop, or tablet; with mouse, touch or pen.',
    },
    {
      title: 'Linton',
      description:
        'Seamlessly navigate and interact with millions of points from Renishaw scanner data, presented in a visually appealing 3D environment.',
    },
    {
      title: 'Micro Installation Wizard',
      description:
        'An XML based language developed to allow engineers to create a customizable installer with increased reusability and reduced efforts.',
    },
    {
      title: 'DMIS Parser',
      description:
        'A parser that helps application engineers to visualize, convert and rectify CMM programs to Renishaw format.',
    },
    {
      title: 'Utility Hub',
      description: 'A dev-ex hub for Renishaw developers to access tools, utilities, and resources centrally.',
    },
  ]

  return (
    <div className="relative flex w-full items-center justify-center py-20">
      <div className="relative w-full max-w-3xl py-12">
        {/* Vertical guiding line */}
        <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 transform bg-blue-900"></div>

        {projects.map((project, index) => (
          <div
            key={index}
            className={`group relative mb-12 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            onMouseEnter={() => handleHover(true, index % 2 === 0)}
            onMouseLeave={() => handleHover(false)}
          >
            {/* Project details on alternating sides */}
            <div
              className={`group-hover:scale-110 ${index % 2 === 0 ? 'w-1/2 pr-12 text-right group-hover:-translate-x-6' : 'w-1/2 pl-12 text-left group-hover:translate-x-6'}`}
            >
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>

            {/* Circle Connector */}
            <div
              className={`absolute left-1/2 z-10 flex h-28 w-20 -translate-x-1/2 transform items-center justify-center rounded-full group-hover:w-24 ${index % 2 === 0 ? 'border-l-8' : 'border-r-8'} border-[var(--logo-fg-color)]`}
            ></div>

            {/* Circle */}
            <div className="absolute left-1/2 z-10 flex h-12 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-blue-900 bg-white"></div>

            {/* Line Connector (only for non-last elements) */}
            {index !== projects.length - 1 && (
              <div className="absolute left-1/2 h-36 w-1 -translate-x-1/2 -translate-y-6 transform bg-blue-900"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
