import React, { useEffect, useRef, useState } from 'react';
import {
  AuthErrorCode,
  clearStatus,
  setOpen,
  setStatus,
  setUserAuth,
  Status,
} from '../../../redux/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import AppleIcon from '../../../assets/img/socialNetwork/AppleAuth.png';
import AndroidIcon from '../../../assets/img/socialNetwork/AndroidAuth.png';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setUserUniversity } from '../../../redux/slices/university/universitySlice';
import { ContainerClick } from '../SignUp/SignUp';
import {
  Btn,
  Container,
  ErrorMessage,
  Frame,
  Header,
  IconMarket,
  InputBlock,
  ResetPassword,
} from './SignIn.styled';

export interface IUserDataLogin {
  email: string;
  password: string;
}
export enum StepAuth {
  ROLE_SELECTION = 'roleSelection',
  STUDENT = 'student',
  AMBASSADORS = 'ambassadors',
  UNIVERSITY = 'university',
  OTHER = 'other',
  RESET_PASSWORD = 'resetPassword',
}

const SignIn: React.FC = () => {
  const [step, setStep] = useState<StepAuth>(StepAuth.ROLE_SELECTION);
  const [userData, setUserData] = useState<IUserDataLogin>({ email: '', password: '' });
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string>();
  const { isAuth, status, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const userDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const loginHandler = () => {
    // TODO: auth firebase
    if (userData.email.length >= 5 && userData.password.length >= 6) {
      signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then(async ({ user }) => {
          const university = doc(db, `Universities/${user.uid}`);
          const querySnapshot = await getDoc(university);
          // todo вернулся универ
          if (querySnapshot.exists()) {
            const {
              id,
              email,
              name,
              location,
              region,
              form,
              website,
              image,
              photos,
              prospectsCount,
              ambassadorsCount,
              approvedVideosCount,
              chatGroupCount,
              type,
              size,
              unique,
              information,
              accomodation,
              phone,
              price,
            } = querySnapshot.data();
            dispatch(setUserAuth({ id, email }));
            dispatch(
              setUserUniversity({
                id,
                email,
                name,
                location,
                region,
                form,
                website,
                image,
                photos,
                prospectsCount,
                ambassadorsCount,
                approvedVideosCount,
                chatGroupCount,
                type,
                size,
                information,
                accomodation,
                phone,
                price,
              }),
            );
          } else {
            const university = doc(db, `Ambassadors/${user.uid}`);
            const querySnapshot = await getDoc(university);
            // todo вернулся амбассадор, дописать когда будет сделан его функционал и стейт
            if (querySnapshot.exists()) {
            } else {
              setStep(StepAuth.STUDENT);
            }
          }
        })
        .catch((err) => {
          const errorCode: keyof typeof AuthErrorCode = err.code;
          const errorMessage = AuthErrorCode[errorCode] || 'unknown error';

          dispatch(setStatus({ status: Status.ERROR, errorMessage }));
        });
    }

    // dispatch(loginUser(userData));
  };

  const resetPasswordHandler = () => {
    if (userData.email.length > 5) {
      // TODO запрос на поиск университета/амбассадора

      sendPasswordResetEmail(auth, userData.email);
    }
  };

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const _event = event as ContainerClick;

      if (
        containerRef.current &&
        frameRef.current &&
        _event.path.includes(frameRef.current) &&
        !_event.path.includes(containerRef.current)
      ) {
        dispatch(setOpen(''));
      }
    };

    document.body.addEventListener('click', clickOutsideHandler);

    return () => {
      document.body.removeEventListener('click', clickOutsideHandler);
      dispatch(clearStatus());
    };
  }, []);

  useEffect(() => {
    if (isAuth) dispatch(setOpen(''));
  }, [isAuth]);

  return (
    <Frame ref={frameRef}>
      <Container ref={containerRef}>
        <Header>Login</Header>
        {step === StepAuth.ROLE_SELECTION && (
          <div className='btn-role-selectors'>
            <Btn onClick={() => setStep(StepAuth.STUDENT)}>Student</Btn>
            <Btn onClick={() => setStep(StepAuth.OTHER)}> Other</Btn>
            {/* <Btn active>Next</Btn> */}
          </div>
        )}
        {step === StepAuth.STUDENT && (
          <div className='market-icon'>
            <a href='https://apps.apple.com/ru/app/telegram/id686449807'>
              <IconMarket url={AppleIcon} />
            </a>
            <a href='https://play.google.com/store/apps/details?id=org.telegram.messenger'>
              <IconMarket url={AndroidIcon} />
            </a>
          </div>
        )}
        {step === StepAuth.OTHER && (
          <>
            <InputBlock>
              <label>Email</label>
              <input
                onChange={userDataHandler}
                value={userData.email}
                id='email'
                placeholder='enteryouremail@here.com'
              />
            </InputBlock>
            <InputBlock>
              <label htmlFor='password'>Password</label>
              <input
                onChange={userDataHandler}
                value={userData.password}
                id='password'
                type='password'
                placeholder='Enter your Password'
              />
            </InputBlock>
            <ResetPassword onClick={() => setStep(StepAuth.RESET_PASSWORD)}>
              Forgot Password?
            </ResetPassword>
            {status === Status.ERROR && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {userData.password.length > 0 && userData.password.length < 6 && (
              <ErrorMessage>password must be more than 6 characters</ErrorMessage>
            )}
            <Btn onClick={loginHandler} active>
              Login
            </Btn>
          </>
        )}
        {/*  // TODO: верстка + обработчики ошибок */}
        {step === StepAuth.RESET_PASSWORD && (
          <>
            <div className='reset-password'>Are you sure you want to reset your password?</div>
            <InputBlock>
              <label>Email</label>
              <input
                onChange={userDataHandler}
                value={userData.email}
                id='email'
                placeholder='enteryouremail@here.com'
              />
            </InputBlock>
            <ErrorMessage>{resetPasswordMessage}</ErrorMessage>
            <Btn onClick={resetPasswordHandler} active>
              RESET
            </Btn>
          </>
        )}
      </Container>
    </Frame>
  );
};

export default SignIn;
