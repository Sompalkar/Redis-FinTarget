import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Button from '../components/Button';
import { createTask } from '../api/auth';
import { tokenState, taskCountState } from '../state/atoms';

const Dashboard: React.FC = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [taskCount, setTaskCount] = useRecoilState(taskCountState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateTask = async () => {
    try {
      const result = await createTask(token);
      setTaskCount((prev) => prev + 1);
      setMessage(result.message);
    } catch (err: any) {
      if (err.response && err.response.status === 429) {
        setError('Rate limit exceeded. Task queued.');
      } else {
        setError('Failed to create task');
      }
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setTaskCount(0);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Dashboard</h2>
        <div className="mt-8 space-y-6">
          <p className="text-center text-xl font-bold">Tasks created: {taskCount}</p>
         <div className=' w-full gap-8 flex  justify-between pt-10 pb-5 '>
         <Button onClick={handleCreateTask}>Create Task</Button>
         <Button onClick={handleLogout}>Logout</Button>
         </div>
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;