import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import authService from './services/auth';
import { login, logout } from './store/AuthSlice';

export default function App() {

  const [Loading, setLoading] = useState<Boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) dispatch(login(userData));
      else dispatch(logout());
    })
    .finally(() => setLoading(false))
  }, []);

  if(!Loading) {
    return (
      <div className='w-screen min-h-screen'>
        hello world
      </div>
    )
  }
  else {
    return null;
  }
}
