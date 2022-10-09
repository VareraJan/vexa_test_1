import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { logOutAuth, setOpen } from '../../redux/slices/auth/authSlice';
import { removeUserUniversity } from '../../redux/slices/university/universitySlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { privateRoutes, publicRoutes } from '../../router';
import SignIn from '../Auth/SIgnIn';
import SignUp from '../Auth/SignUp';
import vexaLogo from '../../assets/img/logo-vexa_1.svg';
import { A, Btn, BtnGroup, Container, Img, LinkContainer, Nav } from './Navigation.styled';

const Navigation: React.FC = () => {
  const { isOpen, isAuth } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.university);
  const [name, setName] = useState('');

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOutAuth());
        dispatch(removeUserUniversity());
      })
      // todo обработать ошибку при логауте
      .catch();
  };

  useEffect(() => {
    if (user && 'name' in user) {
      setName(user.name);
    }
    // else if ('firstName' in user) {
    //   setName(user.firstName)
    // }
  }, [user]);

  return (
    <>
      <Container>
        <Nav>
          <Img src={vexaLogo} />
          {isAuth ? (
            <>
              <LinkContainer>
                {privateRoutes.map((obj) =>
                  obj.title ? (
                    <Link to={obj.path} key={obj.path}>
                      <A active={obj.path === pathname}>{obj.title}</A>
                    </Link>
                  ) : (
                    ''
                  ),
                )}
              </LinkContainer>

              <BtnGroup>
                <Btn>{name}</Btn>
                <Btn active onClick={signOutHandler}>
                  Sign Out
                </Btn>
              </BtnGroup>
            </>
          ) : (
            <>
              <LinkContainer>
                {publicRoutes.map((obj) =>
                  obj.title ? (
                    <Link to={obj.path} key={obj.path}>
                      <A active={obj.path === pathname}>{obj.title}</A>
                    </Link>
                  ) : (
                    ''
                  ),
                )}
              </LinkContainer>

              <BtnGroup>
                <Btn onClick={() => dispatch(setOpen('login'))}>Log-In</Btn>
                <Btn active onClick={() => dispatch(setOpen('registration'))}>
                  Create Account
                </Btn>
              </BtnGroup>
            </>
          )}
        </Nav>
      </Container>
      {isOpen === 'login' && <SignIn />}
      {isOpen === 'registration' && <SignUp />}
    </>
  );
};

export { Navigation };
// export default Navigation;
