import React, { Suspense } from 'react';
import { privateRoutes, publicRoutes, PathRouting } from '../router';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

const AppRouter: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return isAuth ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {privateRoutes.map(({ path, Component }) => (
          <Route path={path} element={<Component />} key={path} />
        ))}
        <Route path='*' element={<Navigate to={PathRouting.HOME_ROUTER} key='*' />} />
      </Routes>
    </Suspense>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {publicRoutes.map(({ path, Component }) => (
          <Route path={path} element={<Component />} key={path} />
        ))}
        <Route path='*' element={<Navigate to={PathRouting.HOME_ROUTER} key='*' />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
