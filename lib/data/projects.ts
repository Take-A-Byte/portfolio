import { Project } from "@/lib/types/project"

export const projects: Project[] = [
  {
    title: "AMPX Technologies",
    description:
      "Website featuring a 3D product showcase. Acquired and compressed a 3D model, then animated it with JavaScript so clients can explore products in depth.",
    links: [
      {
        title: "ampxtechnologies.com",
        link: "https://ampxtechnologies.com/"
      }
    ],
  },
  {
    title: "Aux Music",
    description:
      "A collaborative music control app that lets everyone at the party add songs to the queue. One host, unlimited friends, one shared playlist powered by YouTube.",
    featured: true,
    links: [
      {
        title: "Learn more",
        link: "/aux-music"
      },
      {
        title: "GitHub",
        link: "https://github.com/Take-A-Byte/AuxMusic"
      }
    ],
  },
  {
    title: "Workflow Automation Mobile App",
    description:
      "Mobile companion app for Nutrient's Workflow platform to view and approve your requests on the go.",
    links: [
      {
        title: "iOS app",
        link: "https://apps.apple.com/pl/app/nutrient-workflow-automation/id6742332469"
      },
      {
        title: "Android app",
        link: "https://play.google.com/store/apps/details?id=io.nutrient.workflow"
      }
    ],
  },
  {
    title: "Avelyn",
    description:
      "A genAI tool which allows user to interact with their document with conversational interactions. Ask questions, make requests, and simplify your document handling.",
    links: [
      {
        title: "avelyn.ai",
        link: "https://avelyn.ai"
      },
    ],
  },
  {
    title: "InsideIT",
    description:
      "Product website for coaching services featuring a dynamic accordion for showcasing their syllabus.",
    links: [
      {
        title: "insideit.in",
        link: "https://www.insideit.in/"
      }
    ],
  },
  {
    title: "Nutrient MAUI SDK",
    description:
      "One SDK to deploy document functionalities on cross-platform apps on iOS, MacOS, Android, and Windows.",
    links: [
      {
        title: "SDK",
        link: "https://www.nuget.org/packages/Nutrient.MAUI.SDK"
      },
      {
        title: "Documentation",
        link: "https://www.nutrient.io/guides/maui/"
      }
    ],
  },
  {
    title: "PSPDFKit Windows SDK",
    description:
      "SDK offering developers powerful APIs for quickly adding document functionalities to a windows application.",
    links: [
      {
        title: "SDK",
        link: "https://www.nuget.org/packages/PSPDFKitUWP"
      },
      {
        title: "Documentation",
        link: "https://www.nutrient.io/guides/windows/"
      },
    ],
  },
  {
    title: "Shapr3D for Windows",
    description:
      "Design your 3D models on Windows machine - be it on a desktop, laptop, or tablet; with mouse, touch or pen.",
    links: [
      {
        title: "Windows store",
        link: "https://apps.microsoft.com/detail/9n4k9qfv4xfc?referrer=appbadge&source=www.shapr3d.com"
      },
    ],
  },
  {
    title: "Linton",
    description:
      "Seamlessly navigate and interact with millions of points from Renishaw scanner data, presented in a visually appealing 3D environment.",
    links: [
      {
        title: "LiDAR Scanning Software",
        link: "https://www.renishaw.com/en/optical-encoders-and-lidar-scanning--39244?srsltid=AfmBOoorPZVompTqQZj4slmuqp4qi8yLOSnjsCF7gWCtHzvEcKowmPkK"
      },
    ],
  },
  {
    title: "Micro Installation Wizard",
    description:
      "An XML based language developed to allow engineers to create a customizable installer with increased reusability and reduced efforts.",
    links: null,
  },
  {
    title: "DMIS Parser",
    description:
      "A parser that helps application engineers to visualize, convert and rectify CMM programs to Renishaw format.",
    links: null,
  },
  {
    title: "Utility Hub",
    description: "A dev-ex hub for Renishaw developers to access tools, utilities, and resources centrally.",
    links: null,
  },
  {
    title: "FistFive Technologies",
    description:
      "Website design and development showcasing engaging, interactive design while maintaining professionalism. Features multiple layout ideas, highlighted content sections, easy navigation, and inquiry notifications.",
    links: [
      {
        title: "fistfivetech.com",
        link: "https://fistfivetech.com/"
      }
    ],
  },
  {
    title: "Insta Khandesh",
    description:
      "Blog website providing day-to-day information and news from the region of Khandesh in Maharashtra.",
    links: [
      {
        title: "instakhandesh.com",
        link: "https://instakhandesh.com/"
      }
    ],
  },
]

export const featuredProject = projects.find((p) => p.featured)!
