import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';


// TODO: delete hook? нужен ли он вообще
interface useVideosUniversityProps {
  videoId: string;
  videosCount: number;
  firstVideoId: string;
  firstCurrentDoc: any;
  secondCurrentDoc: any;
  paginationHandler: (arg1: 'down', arg2: true) => void;
  getUpdateVideosHandler: (arg: any) => void;
}

export const useVideosUniversity = () => {
  const approvedViddeoUniversity = async ({
    videoId,
    videosCount,
    firstVideoId,
    firstCurrentDoc,
    secondCurrentDoc,
    paginationHandler,
    getUpdateVideosHandler,
  }: useVideosUniversityProps) => {
    const university = doc(db, `Videos/${videoId}`);
    try {
      await setDoc(university, { status: 'approved' }, { merge: true });
      // перезапросить страницу
      if (videosCount === 1) paginationHandler('down', true);
      else if (firstVideoId === videoId) getUpdateVideosHandler(secondCurrentDoc);
      else getUpdateVideosHandler(firstCurrentDoc);
    } catch (error) {
      console.log('setDoc ERROR ', error);
    }
  };

  return { approvedViddeoUniversity };
};
