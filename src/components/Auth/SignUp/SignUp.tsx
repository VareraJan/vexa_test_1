import React, { useEffect, useRef, useState } from 'react';
import AppleIcon from '../../../assets/img/socialNetwork/AppleAuth.png';
import AndroidIcon from '../../../assets/img/socialNetwork/AndroidAuth.png';
import { StepAuth } from '../SIgnIn/SignIn';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { createUser } from '../../../redux/slices/auth/asyncActions';
import { clearStatus, setOpen } from '../../../redux/slices/auth/authSlice';
import { Btn, Container, Frame, Header, IconMarket, InputBlock, TermsOfUse } from './SignUp.styled';

export interface IUserDataCreate {
  email: string;
  password: string;
  universityName: string;
}

export type ContainerClick = MouseEvent & { path: Node[] };

const SignUp: React.FC = () => {
  const [step, setStep] = useState<StepAuth>(StepAuth.ROLE_SELECTION);

  const [userData, setUserData] = useState<IUserDataCreate>({
    email: '',
    password: '',
    universityName: '',
  });
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const dispatch = useAppDispatch();
  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const userDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const createHandler = () => {
    dispatch(createUser(userData));
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
        <Header>{step === StepAuth.UNIVERSITY ? 'Instruction' : 'Sign Up'}</Header>
        {step === StepAuth.ROLE_SELECTION && (
          <div className='btn-role-selectors'>
            <Btn onClick={() => setStep(StepAuth.STUDENT)}>Student</Btn>
            <Btn onClick={() => setStep(StepAuth.AMBASSADORS)}> Ambassador</Btn>
            <Btn onClick={() => setStep(StepAuth.UNIVERSITY)}> Institution</Btn>
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
        {step === StepAuth.AMBASSADORS && (
          <>
            <InputBlock>
              <label>University Name</label>
              <input
                onChange={userDataHandler}
                value={userData.universityName}
                id='universityName'
                placeholder='Enter University Name'
              />
            </InputBlock>
            <InputBlock>
              <label>Email</label>
              <input
                onChange={userDataHandler}
                value={userData.email}
                id='email'
                placeholder='enteryouremail@here.com'
              />
            </InputBlock>
            {/* //TODO проверка на количество символов > 6 */}
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
            <TermsOfUse>Terms of Use</TermsOfUse>
            <Btn onClick={createHandler} active>
              Sign Up
            </Btn>
          </>
        )}

        {step === StepAuth.UNIVERSITY && (
          <>
            <p>
              To register an Institutional account on VEXA, all you need to do is fill out the below
              information and submit, the VEXA team will reach out to you to set up your account!
              <br />
              <br />- Name of Institution
              <br />- Your name
              <br />- Your email address (must be .edu format)
              <br />
              <br />
              In case you have any questions, do not hesitate to reach out to info@vexa.live
              directly.
            </p>
          </>
        )}
      </Container>
    </Frame>
  );
};

export default SignUp;
