import { Company } from '@/types/enums/company'
import PageContent from './PageContent'

export default function Renishaw({ params }: { params: { company: Company } }) {
  console.log(params.company)
  return <PageContent />
}
