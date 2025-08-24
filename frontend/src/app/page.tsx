import TaskManager from '@/components/TaskManager';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const initialSearch = searchParams?.search?.toString() || '';
  const initialStatus = searchParams?.status?.toString() || 'all';
  const initialSort = searchParams?.sort === 'asc' ? 'asc' : 'desc';

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }>
      <TaskManager
        initialSearch={initialSearch}
        initialStatus={initialStatus}
        initialSort={initialSort}
      />
    </Suspense>
  );
}
