import { useEffect, useState } from 'react';
import AddGoalForm from './components/AddGoalForm';
import GoalList from './components/GoalList';
import DepositForm from './components/DepositForm';
import OverviewDashboard from './components/Overview';

export default function App() {
  const [goals, setGoals] = useState([]);

  const loadGoals = async () => {
    try {
      const res = await fetch('http://localhost:3000/goals');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadGoals(); }, []);

  const handleAdd = () => loadGoals();
  const handleDelete = async id => {
    await fetch(`http://localhost:3000/goals/${id}`, { method: 'DELETE' });
    loadGoals();
  };
  const handleDeposit = () => loadGoals();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <OverviewDashboard goals={goals} />
      <AddGoalForm onAdd={handleAdd} />
      <DepositForm goals={goals} onDeposit={handleDeposit} />
      <GoalList goals={goals} onDelete={handleDelete} />
    </div>
  );
}