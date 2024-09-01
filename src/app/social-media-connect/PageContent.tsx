'use client'

import { GithubIcon } from '@app/components/icons/github-icon'

import { LinkedInIcon } from '../components/icons/linkedin-icon'
import { StackOverFlowIcon } from '../components/icons/stackoverflow-icon'

export default function PageContent() {
  return (
    <div className="w-full max-w-5xl items-center justify-between space-x-3 font-mono text-sm lg:flex">
      <a aria-label="Github" href="https://github.com/Take-A-Byte">
        <GithubIcon />
      </a>
      <a aria-label="Stack Overflow" href="https://stackoverflow.com/users/10287964/shantanu-methikar">
        <StackOverFlowIcon />
      </a>
      <a aria-label="LinkedIn" href="https://www.linkedin.com/in/mshantanu18">
        <LinkedInIcon />
      </a>
    </div>
  )
}
