import { useState } from 'react';
export default function AddGoalForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', targetAmount: '', category: '', deadline: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, savedAmount: 0 })
    });
    setForm({ name: '', targetAmount: '', category: '', deadline: '' });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="targetAmount" type="number" value={form.targetAmount} onChange={handleChange} placeholder="Target Amount" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required />
      <button type="submit">Add Goal</button>
    </form>
  );
}