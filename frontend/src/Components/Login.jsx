import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './AuthContext';
import './styles/user.css';
import { api } from './api/data';

export default function Login() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const { token, setToken , user, setUser} = useAuth();

  const [logs, setLogs] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      if(!username || !password) {
        setMessage("fill all the fields")
        return;
      }

      const response = await api.post('login', { username, password });
      const { token, user } = response.data;
      setMessage('Login successful!');
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setLogs('Success: ' + JSON.stringify(response.data));

      navigate('/');

    } catch (error) {
      console.error(error);
      setMessage('Login failed.');
      setLogs('Error: ' + JSON.stringify(error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className='user'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <h3>Don't have an account? <Link to="/signup" style={{color: 'blue'}}>Sign up</Link></h3>
      </form>
      <p>{message}</p>

      <pre>{logs}</pre>
    </div>
  );
}


