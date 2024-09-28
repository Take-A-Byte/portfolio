import Image from 'next/image'

export default function PageContent() {
  type Skill = {
    name: string
    icon: string
  }
  const languages: Skill[] = [
    {
      name: 'C#',
      icon: '/csharp.svg',
    },
    {
      name: 'C++',
      icon: '/cpp.svg',
    },
    {
      name: 'TypeScript',
      icon: '/typescript.svg',
    },
    {
      name: 'C++/CLI',
      icon: '/cpp.svg',
    },
    {
      name: 'WinRT',
      icon: '/cpp.svg',
    },
    {
      name: 'SQL',
      icon: '/sql.svg',
    },
    {
      name: 'Python',
      icon: '/python.svg',
    },
    {
      name: 'Angular',
      icon: '/angular.svg',
    },
    {
      name: 'Swift',
      icon: '/swift.svg',
    },
  ]
  const uiFrameworks: Skill[] = [
    {
      name: 'NextJS',
      icon: '/nextjs.svg',
    },
    {
      name: 'MAUI',
      icon: '/dotnet.svg',
    },
    {
      name: 'Blazor',
      icon: '/blazor.svg',
    },
    {
      name: 'WPF',
      icon: '/dotnet.svg',
    },
    {
      name: 'WinForms',
      icon: '/dotnet.svg',
    },
    {
      name: 'React',
      icon: '/react.svg',
    },
    {
      name: 'Tailwind',
      icon: '/tailwind.svg',
    },
    {
      name: 'Svelte',
      icon: '/svelte.svg',
    },
    {
      name: 'UWP',
      icon: '/dotnet.svg',
    },
    {
      name: 'Angular',
      icon: '/angular.svg',
    },
    {
      name: 'Electron',
      icon: '/electron.svg',
    },
    {
      name: '.NET',
      icon: '/dotnet.svg',
    },
    {
      name: 'Xamarin',
      icon: '/xamarin.svg',
    },
  ]
  const developmentTools: Skill[] = [
    {
      name: 'Git',
      icon: '/git.svg',
    },
    {
      name: 'GitHub',
      icon: '/github.svg',
    },
    {
      name: 'JIRA',
      icon: '/jira.svg',
    },
    {
      name: 'TFS/Azure DevOps',
      icon: '/tfs.svg',
    },
    {
      name: 'Visual Studio',
      icon: '/vs.svg',
    },
    {
      name: 'VS Code',
      icon: '/vscode.svg',
    },
    {
      name: 'Android Studio',
      icon: '/androidstudio.svg',
    },
    {
      name: 'StyleCop',
      icon: '/dotnet.svg',
    },
  ]
  const testingFrameworks: Skill[] = [
    {
      name: 'MSTest',
      icon: '/dotnet.svg',
    },
    {
      name: 'NUnit',
      icon: '/dotnet.svg',
    },
    {
      name: 'XUnit',
      icon: '/dotnet.svg',
    },
    {
      name: 'Jest',
      icon: '/jest.svg',
    },
    {
      name: 'Microsoft Native C++ Unit Testing',
      icon: '/dotnet.svg',
    },
    {
      name: 'Appium',
      icon: '/appium.svg',
    },
  ]
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mt-8 w-1/2 rounded-lg bg-white p-4 drop-shadow-2xl">
        <h1 className="text-4xl font-bold">Skills</h1>

        <h3 className="pt-4 text-xl">Featured</h3>
        <div className="flex flex-wrap">
          {languages.map((language, index) => (
            <div key={index} className="m-1 flex flex-row rounded-md bg-blue-900 px-2 py-2 text-white">
              <Image src={language.icon} alt={language.name} width={24} height={24} className="mr-1.5" />
              {language.name}
            </div>
          ))}
        </div>

        <h3 className="pt-8 text-xl">UI Frameworks</h3>
        <div className="flex flex-wrap">
          {uiFrameworks.map((framework, index) => (
            <div key={index} className="m-1 flex flex-row rounded-md bg-blue-900 px-2 py-2 text-white">
              <Image src={framework.icon} alt={framework.name} width={24} height={24} className="mr-1.5" />
              {framework.name}
            </div>
          ))}
        </div>
        <h3 className="pt-8 text-xl">Development & Other Tools</h3>
        <div className="flex flex-wrap">
          {developmentTools.map((tool, index) => (
            <div key={index} className="m-1 flex flex-row rounded-md bg-blue-900 p-2 text-white">
              <Image src={tool.icon} alt={tool.name} width={24} height={24} className="mr-1.5" />
              {tool.name}
            </div>
          ))}
        </div>

        <h3 className="pt-8 text-xl">Testing Frameworks</h3>
        <div className="flex flex-wrap">
          {testingFrameworks.map((framework, index) => (
            <div key={index} className="m-1 flex flex-row rounded-md bg-blue-900 p-2 text-white">
              <Image src={framework.icon} alt={framework.name} width={24} height={24} className="mr-1.5" />
              {framework.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
