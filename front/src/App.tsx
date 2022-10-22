import { Login, Private } from '@/pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './components';
import { AuthGuard } from './guards';
import { PrivateRoutes, PublicRoutes } from './models';
import { createUser } from './redux/states/userSlice';
import { getLocalStorage, RoutesWithNotFound } from './utilities';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (() => {
      if (getLocalStorage('user')) {
        dispatch(createUser(getLocalStorage('user')));
      }
    })();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RoutesWithNotFound>
          <Route path="/*" element={<>Not found</>} />
          <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>
        </RoutesWithNotFound>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
