import { createFileRoute } from '@tanstack/react-router'
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';

const HomeScreen = () => {
  return (
    <div className="flex flex-col mx-auto w-screen min-h-screen px-40">
      <Navbar />
      <Card className='flex grow w-full'>
        <embed src='https://eu.umami.is/share/aCix7F05Y6i36FEc/bidai.hammad-tariq.me' className='w-full' />
      </Card>
    </div>
  );
};

export const Route = createFileRoute('/_admin/')({
  component: HomeScreen
})