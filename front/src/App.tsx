import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import './App.css';
import { LoadRedirection } from './components';
import { AuthGuard } from './guards';
import { PrivateRoutes, PublicRoutes } from './models';
import { store } from './redux';
import { RoutesWithNotFound } from './utilities';
const Login = lazy(() => import('@/pages/Login/Login'));
const Header = lazy(() => import('@/components/Header/Header'));
const Footer = lazy(() => import('@/components/Footer/Footer'));
const Private = lazy(() => import('@/pages/Private/Private'));
function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <>
            <LoadRedirection />
          </>
        }
      >
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
            </RoutesWithNotFound>
            <Footer />
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
