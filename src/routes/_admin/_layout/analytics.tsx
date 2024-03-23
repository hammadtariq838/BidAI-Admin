import { Card } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

const Analytics = () => {
  return (
    <Card className='flex grow w-full'>
      <embed src='https://eu.umami.is/share/aCix7F05Y6i36FEc/bidai.hammad-tariq.me' className='w-full' />
    </Card>
  )
}

export const Route = createFileRoute('/_admin/_layout/analytics')({
  component: Analytics
})