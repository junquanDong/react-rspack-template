import React, { useState } from 'react';
import { Button } from 'antd';
import { login } from '@/store/user';

const Login = (props: WithPageProps) => {

  const [loading, setLoading] = useState(false);
  const handerLogin = () => {
    setLoading(true);
    setTimeout(() => {
      props.dispatch(login(''));
      setLoading(false);
    }, 1000);
  }
  return (
    <div>
      <h1>Login</h1>
      <Button
        loading={loading}
        onClick={handerLogin}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;