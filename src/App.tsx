import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import authService from './services/auth';
import { login, logout } from './store/AuthSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

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
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  }
  else {
    return null;
  }
}
