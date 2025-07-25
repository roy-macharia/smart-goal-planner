import { useState } from 'react';
export default function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState(goals[0]?.id || '');
  const [amount, setAmount] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const goal = goals.find(g => g.id === parseInt(goalId));
    if (!goal) return;
    const newAmount = goal.savedAmount + parseFloat(amount);
    await fetch(`http://localhost:3000/goals/${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: newAmount })
    });
    setAmount('');
    onDeposit();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-semibold mb-4">Make a Deposit</h2>
      <select value={goalId} onChange={e => setGoalId(e.target.value)} required>
        <option value="" disabled>Select goal</option>
        {goals.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Deposit</button>
    </form>
  );
}