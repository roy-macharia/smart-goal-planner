import { useState } from 'react';

export default function AddGoalForm({ onAddGoal }) {
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    savedAmount: 0,
    category: '',
    deadline: '',
    createdAt: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal({ ...form, targetAmount: +form.targetAmount, savedAmount: +form.savedAmount });
    setForm({ ...form, name: '', targetAmount: '', category: '', deadline: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input type="number" placeholder="Target Amount" value={form.targetAmount} onChange={e => setForm({ ...form, targetAmount: e.target.value })} required />
      <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
      <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}