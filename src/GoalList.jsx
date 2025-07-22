import GoalItem from './GoalItem';

export default function GoalList({ goals, onUpdate, onDelete }) {
  return (
    <div>
      <h2>Your Goals</h2>
      {goals.map(goal => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}