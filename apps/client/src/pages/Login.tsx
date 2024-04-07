import React, { useState } from 'react';
import * as styles from './Login.css';
import { useLoginMutation } from '../generated/hooks';
import { setToken } from '../shared/token';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@example.com');
  const { mutateAsync } = useLoginMutation();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={async () => {
          const data = await mutateAsync({ email });
          setToken(data.login);
          navigate('/', { replace: true });
        }}
      >
        login
      </button>
    </div>
  );
};

export default Login;
