import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react';
import { db } from '../../firebase';

const AmbassadorUploadVideo = () => {
  const uploadVideoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: при переносе в проект заменить ambassadorId, universityID, universityName firstName на данные пользователя
    if (e.target.files) {
      const storage = getStorage();
      // TODO заглушка амбассадора
      const ambassadorId = 'cesbz5GUqmPeKBnsQ9hR7eKsyw72';
      const firstName = 'Luci';

      const videoTitle = `${Date.now()}_${e.target.files[0].name}`;
      const videoFile = e.target.files[0];
      /** путь до файла в Storage*/
      const storageRef = ref(storage, `Videos/${ambassadorId}/${videoTitle}`);

      // загружаем файл в Storage и получаем его данные
      const uploadTask = uploadBytesResumable(storageRef, videoFile);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
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
        () => {
          // получаем ссылку на файл и записываем все нужные данные в коллекцию Videos
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              const docRef = await addDoc(collection(db, `Videos`), {
                ambassadorID: ambassadorId,
                ambassadorName: firstName,
                comments: [],
                createdAt: new Date(),
                duration: '',
                id: '',
                likes: [],
                status: 'pending',
                tag: '',
                title: videoTitle,
                universityID: 'JqAHTIGan3QgMScoeM4c0q3KjKJ2',
                universityName: 'TSU',
                url: downloadURL,
              });

              const videoFileRef = doc(db, `Videos/${docRef.id}`);
              const video = document.createElement('video');
              video.src = URL.createObjectURL(videoFile);
              video.oncanplay = async function () {
                const durationSec = video.duration;
                // const hour = (durationSec / 3600).toFixed();
                const minute = ((durationSec % 3600) / 60).toFixed();
                const sec = (durationSec % 60).toFixed();

                const duration = `
                ${minute}:
                ${sec === '0' ? '00' : +sec < 10 ? `0${sec}` : sec}`;

                // const duration = `
                // ${hour === '0' ? '00' : +hour < 10 ? `0${hour}` : hour}:
                // ${minute === '0' ? '00' : +minute < 10 ? `0${minute}` : minute}:
                // ${sec === '0' ? '00' : +sec < 10 ? `0${sec}` : sec}`;

                try {
                  await setDoc(videoFileRef, { id: docRef.id, duration }, { merge: true });
                } catch (error) {
                  console.log('setDoc ERROR ', error);
                }
              };

              // записываем Id видеофайла в коллекцию videos нужного амбасадора,
              const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
              const querySnapshot = await getDoc(ambassador);
              if (querySnapshot.exists()) {
                const data = querySnapshot.data();
                data.videos.push(docRef.id);
                try {
                  await setDoc(ambassador, { videos: data.videos }, { merge: true });
                } catch (error) {
                  console.log('setDoc ERROR ', error);
                }
              }
            } catch (error) {
              console.log('Error adding document: ', error);
            }
          });
        },
      );
    }
  };
  return <input onChange={uploadVideoHandler} type='file' placeholder='push me' accept='video/*' />;
};

export default AmbassadorUploadVideo;
