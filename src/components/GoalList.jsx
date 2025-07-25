import GoalItem from './GoalItems';
export default function GoalList({ goals, onDelete }) {
  return (
    <div className="grid gap-4">
      {goals.map(goal => (
        <GoalItem key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </div>
  );
}