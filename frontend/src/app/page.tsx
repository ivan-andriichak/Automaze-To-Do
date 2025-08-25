import TaskManager from '../components/TaskManager';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = searchParams ? await searchParams : {};
  const initialSearch = params.search?.toString() || '';
  const initialStatus = params.status?.toString() || 'all';
  const initialSort = params.sort === 'asc' ? 'asc' : 'desc';

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
