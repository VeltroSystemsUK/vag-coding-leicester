import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Loader2, UserPlus } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface User {
  id: string;
  email: string;
  name: string;
}

export default function UsersManager() {
  const { fetchUsers, addUser, deleteUser, changePassword } = useAdmin();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPassword, setEditingPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [newUser, setNewUser] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    // Add fallback user if no users exist
    if (data.length === 0) {
      setUsers([{ id: 'legacy-admin', email: 'admin@vagleicester.co.uk', name: 'Admin' }]);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newUser.email.trim() || !newUser.password.trim()) {
      setError('Email and password are required');
      return;
    }
    setSaving(true);
    setError('');
    const success = await addUser(newUser.email, newUser.password, newUser.name);
    if (success) {
      setSuccess('User added successfully');
      setNewUser({ email: '', password: '', name: '' });
      setShowForm(false);
      loadUsers();
    } else {
      setError('Failed to add user. Ensure Supabase is configured.');
    }
    setSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Delete user "${user.email}"? This cannot be undone.`)) return;
    if (user.id === 'legacy-admin') {
      setError('Cannot delete legacy admin account');
      return;
    }
    const success = await deleteUser(user.id);
    if (success) {
      setSuccess('User deleted');
      loadUsers();
    } else {
      setError('Failed to delete user');
    }
    setTimeout(() => setError(''), 3000);
  };

  const handlePasswordChange = async (userId: string) => {
    if (!newPassword.trim()) {
      setError('New password is required');
      return;
    }
    setSaving(true);
    const success = await changePassword(userId, newPassword);
    if (success) {
      setSuccess('Password changed successfully');
      setEditingPassword(null);
      setNewPassword('');
    } else {
      setError('Failed to change password. Ensure Supabase is configured.');
    }
    setSaving(false);
    setTimeout(() => setError(''), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/40 text-sm">{users.length} users</p>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 bg-brand hover:bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">{success}</div>}

      {/* Add Form */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white">New User</h3>

          <input
            value={newUser.email}
            onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))}
            placeholder="Email address *"
            type="email"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
          />

          <input
            value={newUser.name}
            onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))}
            placeholder="Display name (optional)"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
          />

          <input
            value={newUser.password}
            onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))}
            placeholder="Temporary password *"
            type="password"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors text-sm"
          />

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="flex-1 bg-brand hover:bg-brand-accent disabled:opacity-50 text-white font-bold text-sm uppercase tracking-widest py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Add User
            </button>
            <button
              onClick={() => { setShowForm(false); setNewUser({ email: '', password: '', name: '' }); setError(''); }}
              className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="bg-white/5 border border-white/[0.07] rounded-xl p-4 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold">
                  {(user.name || user.email)[0].toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{user.name || 'No name'}</span>
                    {user.id === 'legacy-admin' && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">legacy</span>
                    )}
                  </div>
                  <span className="text-white/40 text-xs">{user.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editingPassword === user.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm w-32"
                    />
                    <button
                      onClick={() => handlePasswordChange(user.id)}
                      disabled={saving}
                      className="p-2 rounded-lg bg-brand/20 hover:bg-brand/30 text-brand"
                    >
                      <Loader2 className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => { setEditingPassword(null); setNewPassword(''); }}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/30"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingPassword(user.id)}
                      className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-white/30 text-xs transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="p-2 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-white/20 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
        <h4 className="text-white font-bold text-sm mb-2">Setup Instructions</h4>
        <p className="text-white/40 text-xs mb-2">
          To enable full user management, create a table in Supabase:
        </p>
        <pre className="text-white/30 text-xs bg-black/30 p-3 rounded-lg overflow-x-auto">
{`CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and grant access as needed`}
        </pre>
      </div>
    </div>
  );
}