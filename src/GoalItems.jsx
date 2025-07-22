import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function GoalItem({ goal, onUpdate, onDelete }) {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100).toFixed(1);
  const remaining = goal.targetAmount - goal.savedAmount;
  const daysLeft = dayjs(goal.deadline).diff(dayjs(), 'day');

  const isComplete = goal.savedAmount >= goal.targetAmount;
  const isOverdue = dayjs().isAfter(goal.deadline) && !isComplete;
  const isWarning = daysLeft <= 30 && daysLeft >= 0 && !isComplete;

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '1em', padding: '1em' }}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Saved: ${goal.savedAmount} / ${goal.targetAmount}</p>
      <div style={{ background: '#eee', height: '10px', width: '100%' }}>
        <div style={{ width: `${progress}%`, background: '#4caf50', height: '100%' }}></div>
      </div>
      <p>{remaining > 0 ? `$${remaining} remaining` : 'Goal achieved!'}</p>
      <p>Deadline: {goal.deadline} ({daysLeft} days left)</p>
      {isWarning && <p style={{ color: 'orange' }}>⚠️ Less than 30 days remaining!</p>}
      {isOverdue && <p style={{ color: 'red' }}>❌ Overdue</p>}
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
}