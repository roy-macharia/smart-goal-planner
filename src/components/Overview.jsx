import { differenceInDays, parseISO, format } from 'date-fns';
export default function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: {totalSaved}</p>
      <p>Completed: {completed}</p>
      <ul className="mt-4 list-disc list-inside">
        {goals.map(g => {
          const daysLeft = differenceInDays(parseISO(g.deadline), new Date());
          const status = daysLeft < 0 ? 'Overdue' : daysLeft <= 30 ? '⚠️ Warning' : 'On Track';
          return (
            <li key={g.id}>
              {g.name} - {format(parseISO(g.deadline), 'MMM d, yyyy')} ({daysLeft} days left): {status}
            </li>
          );
        })}
      </ul>
    </div>
  );
}