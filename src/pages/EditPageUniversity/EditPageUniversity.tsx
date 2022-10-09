import React, { useEffect, useRef, useState } from 'react';
import cameraIcon from '../../assets/img/editPage/camera.svg';
import deleteIconBin from '../../assets/img/editPage/binDelete.svg';
import editIcon from '../../assets/img/editPage/binEdit.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import {
  IUniversity,
  setUserUniversity,
  setUserUniversityImage,
} from '../../redux/slices/university/universitySlice';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { updatePassword } from 'firebase/auth';
import {
  Btn,
  ButtonBlock,
  Container,
  Frame,
  IconWrapper,
  InfoBlock1,
  InputBlock,
  Logo,
  LogoPhoto,
  PhotosBlock,
  PhotoWrapper,
  UniversityAddress,
  UniversityName,
  UniversityTextBlock,
} from './EditPageUniversity.styled';

interface BtnTypeHandlerParam {
  duration: string;
  belonging: string;
}

interface InputPasHandlerParam {
  currency: string;
  new: string;
}
interface InputSizeHandlerParams {
  students: number;
  international: number;
}

const EditPageUniversity: React.FC = () => {
  const dispatch = useAppDispatch();
  const [university, setUniversity] = useState<IUniversity | undefined>();
  const [managePhotosURL, setManagePhotosURL] = useState<string[]>(new Array(4).fill(''));

  const { user } = useAppSelector((state) => state.university);

  const storage = getStorage();

  const firestoreDbUniversity = doc(db, `Universities/${user?.id}`);

  const filePicker = useRef<HTMLInputElement>(null);

  const managePhotoPicker0 = useRef<HTMLInputElement>(null);
  const managePhotoPicker1 = useRef<HTMLInputElement>(null);
  const managePhotoPicker2 = useRef<HTMLInputElement>(null);
  const managePhotoPicker3 = useRef<HTMLInputElement>(null);

  /** сохранить файл на сервер и положить его URL в массив */
  const saveFileReturnURL = (file: File, universityId: string, index: number) => {
    const storageRef = ref(storage, `university/${universityId}/${file.name}`);
    const uploadFile = uploadBytesResumable(storageRef, file);

    uploadFile.on(
      'state_changed',
      /** progress */
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // TODO: progressbar for user
        // console.log(`Upload is ${progress}% done`);
      },
      /** error */
      (error) => {
        // TODO: обработчики ошибок для вывода данных пользователю
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      /** completed */
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then(async (downloadURL) => {
          try {
            setManagePhotosURL((prev) => {
              const newUrl = [...prev];
              newUrl[index] = downloadURL;
              return newUrl;
            });
          } catch (err) {
            // todo: обработчик ошибки, вывод сообщения пользователю
            console.log('setDoc ERROR ', err);
          }
        });
      },
    );
  };

  /** смена аватарки университета */
  const clickFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const storageRef = ref(storage, `university/${university?.id}/${e.target.files[0].name}`);
      const uploadImage = uploadBytesResumable(storageRef, e.target.files[0]);
      uploadImage.on(
        'state_changed',
        /** progress */
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // TODO: progressbar for user
          // console.log(`Upload is ${progress}% done`);
        },
        /** error */
        (error) => {
          // TODO: обработчики ошибок для вывода данных пользователю
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        /** completed */
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
            try {
              await setDoc(firestoreDbUniversity, { image: downloadURL }, { merge: true });
              dispatch(setUserUniversityImage(downloadURL));
            } catch (err) {
              // todo: обработчик ошибки, вывод сообщения пользователю
              console.log('setDoc ERROR ', err);
            }
          });
        },
      );
    }
  };

  const clickHandler = () => {
    filePicker.current?.click();
  };

  const managePhotoPickerHandler0 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      saveFileReturnURL(e.target.files[0], university!.id, 0);
    }
  };

  const managePhotoPickerHandler1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      saveFileReturnURL(e.target.files[0], university!.id, 1);
    }
  };

  const managePhotoPickerHandler2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      saveFileReturnURL(e.target.files[0], university!.id, 2);
    }
  };

  const managePhotoPickerHandler3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      saveFileReturnURL(e.target.files[0], university!.id, 3);
    }
  };

  const managePhotoEdit0 = () => {
    managePhotoPicker0.current?.click();
  };
  const managePhotoEdit1 = () => {
    managePhotoPicker1.current?.click();
  };
  const managePhotoEdit2 = () => {
    managePhotoPicker2.current?.click();
  };
  const managePhotoEdit3 = () => {
    managePhotoPicker3.current?.click();
  };

  const deletePhotoHandler = (ind: number) => {
    setManagePhotosURL((prev) => {
      const newPhotos = [...prev];
      newPhotos[ind] = '';
      return newPhotos;
    });
  };

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUniversity((prev) => {
      if (event.target.name === 'region' && prev)
        return { ...prev, [event.target.name]: event.target.value };
      if (event.target.name === 'price' && prev)
        return { ...prev, [event.target.name]: +event.target.value };
      if (prev) return { ...prev, [event.target.name]: event.target.value.trim() };
    });
  };

  const inputSizeHandler = (params: InputSizeHandlerParams) => {
    setUniversity((prev) => {
      if (prev) return { ...prev, size: { ...params } };
    });
  };

  const inputPasHandler = (param: InputPasHandlerParam) => {
    setUniversity((prev) => {
      if (prev) return { ...prev, password: { ...param } };
    });
  };

  const btnTypeHandler = (param: BtnTypeHandlerParam) => {
    setUniversity((prev) => {
      if (prev) return { ...prev, type: { ...param } };
    });
  };

  const btnHandler = (param: Record<string, string>) => {
    setUniversity((prev) => {
      if (prev) return { ...prev, ...param };
    });
  };

  const btnSaveHandler = async () => {
    // TODO: проверка полей на соотетствие правилам, иначе не отправлять запрос на смену
    if (university) {
      const newUniversity = { ...university, photos: managePhotosURL };
      newUniversity.email.trim();
      newUniversity.name.trim();
      newUniversity.region.trim();
      newUniversity.information.trim();

      if ('password' in newUniversity) {
        const newPassword = newUniversity.password?.new;
        delete newUniversity.password;
        const user = auth.currentUser;
        if (user && newPassword)
          updatePassword(user, newPassword)
            .then(() => {
              // TODO: сообщить пользователю об успешной смене пароля
            })
            .catch((error) => {
              // TODO: сообщить пользователю об ошибке
            });
      }

      try {
        await setDoc(firestoreDbUniversity, newUniversity, { merge: true });
        dispatch(setUserUniversity(newUniversity));
        // TODO: вывести сообщению пользователю что все успешно
      } catch (error) {
        // todo: обработчик ошибки, вывод сообщения пользователю
        console.log('setDoc ERROR ', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setUniversity(user);
      setManagePhotosURL(user.photos);
    }
  }, [user]);

  return (
    <Frame>
      {university && (
        <>
          <PhotoWrapper onClick={clickHandler} url={university.image} urlDef={cameraIcon}>
            <input
              className='uploader'
              ref={filePicker}
              type='file'
              onChange={clickFileHandler}
              accept='image/*,.png,.jpg,.gif,.web'
            />
          </PhotoWrapper>
          <Container>
            <UniversityTextBlock>
              <UniversityName>{university.name}</UniversityName>
              <UniversityAddress>{university.region}</UniversityAddress>
            </UniversityTextBlock>

            <InfoBlock1>
              <InputBlock>
                <label>University Name</label>
                <input
                  name='name'
                  value={university.name}
                  onChange={inputHandler}
                  type='text'
                  placeholder='Name'
                />
              </InputBlock>
              <InputBlock>
                <label>Region</label>
                <input
                  name='region'
                  value={university.region}
                  onChange={inputHandler}
                  type='text'
                  placeholder='Region'
                />
              </InputBlock>
              <InputBlock>
                <label>University Type</label>
                <div className='btn-group'>
                  <Btn
                    onClick={() =>
                      btnTypeHandler({ duration: '2', belonging: university.type.belonging })
                    }
                    marginRight='4px'
                    active={university.type.duration === '2'}>
                    2 year
                  </Btn>
                  <Btn
                    onClick={() =>
                      btnTypeHandler({ duration: '4', belonging: university.type.belonging })
                    }
                    active={university.type.duration === '4'}>
                    4 year
                  </Btn>
                  <Btn
                    onClick={() =>
                      btnTypeHandler({ duration: university.type.duration, belonging: 'private' })
                    }
                    active={university.type.belonging === 'private'}
                    marginRight='4px'>
                    private
                  </Btn>
                  <Btn
                    onClick={() =>
                      btnTypeHandler({ duration: university.type.duration, belonging: 'public' })
                    }
                    active={university.type.belonging === 'public'}>
                    public
                  </Btn>
                </div>
              </InputBlock>
              <InputBlock>
                <label>Phone number</label>
                <input
                  name='phone'
                  value={university.phone}
                  onChange={inputHandler}
                  type='number'
                  placeholder='+000 00 000 000'
                />
              </InputBlock>
              <InputBlock>
                <label>Email</label>
                <input
                  name='email'
                  value={university.email}
                  onChange={inputHandler}
                  type='email'
                  placeholder='Email'
                />
              </InputBlock>
            </InfoBlock1>

            <ButtonBlock>
              <div className='title'>Size of the University</div>
              <InputBlock>
                <div className='input-group'>
                  <label>total ?? of undergraduate students</label>
                  <input
                    name='size'
                    value={university.size.students}
                    onChange={(e) =>
                      inputSizeHandler({
                        students: +e.target.value,
                        international: university.size.international,
                      })
                    }
                    type='number'
                    placeholder='total ?? of undergraduate students
                    '
                  />
                  <label>total ?? of international students</label>
                  <input
                    name='size'
                    value={university.size.international}
                    onChange={(e) =>
                      inputSizeHandler({
                        students: university.size.students,
                        international: +e.target.value,
                      })
                    }
                    type='number'
                    placeholder='total ?? of international students
                    '
                  />
                </div>
              </InputBlock>
            </ButtonBlock>

            <InputBlock width='644px' height='136px'>
              <label>Scholarship infromation</label>
              <textarea
                name='information'
                value={university.information}
                onChange={inputHandler}
                placeholder='Type'
              />
            </InputBlock>
            <InputBlock>
              <label>Cost</label>
              <input
                name='price'
                value={university.price}
                onChange={inputHandler}
                type='number'
                placeholder='Price'
              />
            </InputBlock>

            <ButtonBlock>
              <div className='title'>Accomodation</div>
              <div className='btn-group'>
                <Btn
                  width='140px'
                  active={university.accomodation === 'On Campus'}
                  onClick={() => btnHandler({ accomodation: 'On Campus' })}>
                  On Campus
                </Btn>
                <Btn
                  width='140px'
                  active={university.accomodation === 'Off Campus'}
                  onClick={() => btnHandler({ accomodation: 'Off Campus' })}>
                  Off Campus
                </Btn>
                <Btn
                  width='100px'
                  active={university.accomodation === 'Both'}
                  onClick={() => btnHandler({ accomodation: 'Both' })}>
                  Both
                </Btn>
              </div>
            </ButtonBlock>

            <InfoBlock1>
              <InputBlock>
                <label>Enter your New Password</label>
                <input
                  value={university.password?.currency || ''}
                  onChange={(e) =>
                    inputPasHandler({
                      currency: e.target.value.trim(),
                      new: university.password?.new || '',
                    })
                  }
                  name='currency'
                  type='password'
                  placeholder='New Password'
                />
                {university.password &&
                  university.password?.currency.length > 0 &&
                  university.password?.currency.length < 6 && <div>{`password < 6 chars`}</div>}
              </InputBlock>
              <InputBlock>
                <label>Repeat your New Password</label>
                <input
                  value={university.password?.new || ''}
                  onChange={(e) =>
                    inputPasHandler({
                      currency: university.password?.currency || '',
                      new: e.target.value.trim(),
                    })
                  }
                  name='new'
                  type='password'
                  placeholder='Repeat New Password'
                />
                {university.password &&
                university.password?.new.length > 0 &&
                university.password?.new.length < 6 ? (
                  <div>{`password < 6 chars`}</div>
                ) : university.password?.new === university.password?.currency ? (
                  ''
                ) : (
                  <div>{`passwords do not match`}</div>
                )}
              </InputBlock>
            </InfoBlock1>

            <PhotosBlock>
              <div className='title'>Manage Photos</div>
              <ul>
                <li>
                  <LogoPhoto url={managePhotosURL[0]} urlDef={cameraIcon} />
                  <input
                    className='uploader'
                    ref={managePhotoPicker0}
                    type='file'
                    onChange={managePhotoPickerHandler0}
                    accept='image/*,.png,.jpg,.gif,.web'
                  />
                  <IconWrapper onClick={managePhotoEdit0} top='96px' left='59px' width='30px'>
                    <Logo src={editIcon} width='20px' />
                  </IconWrapper>
                  <IconWrapper
                    onClick={() => deletePhotoHandler(0)}
                    top='96px'
                    left='95px'
                    width='30px'>
                    <Logo src={deleteIconBin} width='24px' />
                  </IconWrapper>
                </li>
                <li>
                  <LogoPhoto url={managePhotosURL[1]} urlDef={cameraIcon} />
                  <input
                    className='uploader'
                    ref={managePhotoPicker1}
                    type='file'
                    onChange={managePhotoPickerHandler1}
                    accept='image/*,.png,.jpg,.gif,.web'
                  />
                  <IconWrapper onClick={managePhotoEdit1} top='96px' left='59px' width='30px'>
                    <Logo src={editIcon} width='20px' />
                  </IconWrapper>
                  <IconWrapper
                    onClick={() => deletePhotoHandler(1)}
                    top='96px'
                    left='95px'
                    width='30px'>
                    <Logo src={deleteIconBin} width='24px' />
                  </IconWrapper>
                </li>
                <li>
                  <LogoPhoto url={managePhotosURL[2]} urlDef={cameraIcon} />
                  <input
                    className='uploader'
                    ref={managePhotoPicker2}
                    type='file'
                    onChange={managePhotoPickerHandler2}
                    accept='image/*,.png,.jpg,.gif,.web'
                  />
                  <IconWrapper onClick={managePhotoEdit2} top='96px' left='59px' width='30px'>
                    <Logo src={editIcon} width='20px' />
                  </IconWrapper>
                  <IconWrapper
                    onClick={() => deletePhotoHandler(2)}
                    top='96px'
                    left='95px'
                    width='30px'>
                    <Logo src={deleteIconBin} width='24px' />
                  </IconWrapper>
                </li>
                <li>
                  <LogoPhoto url={managePhotosURL[3]} urlDef={cameraIcon} />
                  <input
                    className='uploader'
                    ref={managePhotoPicker3}
                    type='file'
                    onChange={managePhotoPickerHandler3}
                    accept='image/*,.png,.jpg,.gif,.web'
                  />
                  <IconWrapper onClick={managePhotoEdit3} top='96px' left='59px' width='30px'>
                    <Logo src={editIcon} width='20px' />
                  </IconWrapper>
                  <IconWrapper
                    onClick={() => deletePhotoHandler(3)}
                    top='96px'
                    left='95px'
                    width='30px'>
                    <Logo src={deleteIconBin} width='24px' />
                  </IconWrapper>
                </li>
              </ul>
            </PhotosBlock>
            <Btn
              onClick={btnSaveHandler}
              active
              save
              width='192px'
              marginBottom='38px'
              marginRight='0px'
              marginLeft='452px'>
              Save
            </Btn>
          </Container>
        </>
      )}
    </Frame>
  );
};

export default EditPageUniversity;
