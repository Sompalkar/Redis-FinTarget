import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { register as registerUser } from '../api/auth';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      // console.log('Submitting data:', { username, password }); // Log the data being submitted
       await registerUser(username, password);

     
      navigate('/login');

    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
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
          <Button type="submit">Register</Button>
        </form>
        <Button onClick={() => navigate('/login')} className="w-full mt-2">
          Already have an account? <span className='text-blue-600'>Login</span>
        </Button>
      </div>
    </div>
  );
};

export default Register;
