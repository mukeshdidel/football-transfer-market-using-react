import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from './AuthContext';
import './styles/user.css';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { token, setToken , user, setUser} = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      if(!username || !password) {
        setMessage("fill all the fields")
        return;
      }
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { token, user } = response.data;
      setMessage('Login successful!');
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      navigate('/home');

    } catch (error) {
      console.error(error);
      setMessage('Login failed.');
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
      </form>
      <p>{message}</p>
    </div>
  );
}


