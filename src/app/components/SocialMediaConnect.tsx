import { GithubIcon } from '@app/components/icons/github-icon'
import { LinkedInIcon } from './icons/linkedin-icon'
import { StackOverFlowIcon } from './icons/stackoverflow-icon'

export default function SocialMediaConnect() {
  return (
    <div className="flex w-full max-w-5xl items-center max-w-fit justify-between space-x-3 font-mono text-sm">
      <a aria-label="Github" href="https://github.com/Take-A-Byte" target="_blank" rel="noopener noreferrer">
        <GithubIcon />
      </a>
      <a
        aria-label="Stack Overflow"
        href="https://stackoverflow.com/users/10287964/shantanu-methikar"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StackOverFlowIcon />
      </a>
      <a aria-label="LinkedIn" href="https://www.linkedin.com/in/mshantanu18" target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </a>
    </div>
  )
}
