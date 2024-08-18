import { useEffect } from 'react';
import './index.css';

import { useNavigate } from '@modern-js/runtime/router';

export default () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/weekly');
  }, []);
};
