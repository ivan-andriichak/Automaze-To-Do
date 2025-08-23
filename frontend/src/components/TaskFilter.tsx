interface TaskFilterProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  sort: 'asc' | 'desc';
  setSort: (value: 'asc' | 'desc') => void;
}

export default function TaskFilter({ search, setSearch, status, setStatus, sort, setSort }: TaskFilterProps) {
  return (
    <div className="p-6 border-b border-gray-200 dark:border-gray-300 flex space-x-4 items-center">
   <span className="relative flex-1">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search tasks..."
    className="w-full p-2 border rounded pr-8"
    style={{ paddingRight: '2.5rem' }}
  />
     {search.trim() && (
       <button
         type="button"
         onClick={() => setSearch('')}
         className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
         aria-label="Clear search"
       >
         &#10006;
       </button>
     )}
</span>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border rounded">
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value as 'asc' | 'desc')} className="p-2 border rounded">
        <option value="asc">Priority Asc</option>
        <option value="desc">Priority Desc</option>
      </select>
    </div>
  );
}