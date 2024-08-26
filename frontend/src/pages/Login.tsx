import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../api/auth';
import { tokenState } from '../state/atoms';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenState);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      console.log('Submitting data:', { username, password }); // Log the data being submitted
      const result = await login(username, password);
      setToken(result.token);
      localStorage.setItem('token', result.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Username"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Button type="submit">Login</Button>
        </form>
        <Button onClick={() => navigate('/register')} className="w-full mt-2">
          Don't have an account? <span className='text-blue-600'>Register</span>
        </Button>
      </div>
    </div>
  );
};

export default Login;
