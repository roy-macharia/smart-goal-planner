import { useEffect, useState } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoal } from './services/api';
import GoalList from './components/GoalList';
import AddGoalForm from './components/AddGoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getGoals().then(res => setGoals(res.data));
  }, []);

  const handleAddGoal = async (goal) => {
    const res = await createGoal(goal);
    setGoals([...goals, res.data]);
  };

  const handleUpdateGoal = async (id, updates) => {
    await updateGoal(id, updates);
    setGoals(goals.map(goal => goal.id === id ? { ...goal, ...updates } : goal));
  };

  const handleDeleteGoal = async (id) => {
    await deleteGoal(id);
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="container">
      <h1>🎯 Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm onAddGoal={handleAddGoal} />
      <DepositForm goals={goals} onDeposit={handleUpdateGoal} />
      <GoalList
        goals={goals}
        onUpdate={handleUpdateGoal}
        onDelete={handleDeleteGoal}
      />
    </div>
  );
}

export default App;