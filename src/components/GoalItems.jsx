export default function GoalItem({ goal, onDelete }) {
  const pct = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  return (
    <div className="card">
      <h3 className="text-lg font-medium">{goal.name}</h3>
      <p className="mb-2">{goal.savedAmount} / {goal.targetAmount}</p>
      <div className="progress-bar mb-4">
        <div style={{ width: `${pct}%` }} />
      </div>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
}