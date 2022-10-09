import React, { memo, useEffect, useState } from 'react';
import { useFetchFirebase } from '../../../hooks/useFetchFirebase';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ActionWrapper, Container, ImageWrapper, Line, Logo } from '../../../styled/dashboard';
import Pagination from '../Pagination';
import {
  AllVideoList,
  ApprovalVideoList,
  ApprovedVideoInfo,
  HeadLists,
  IconWrapper,
  Line2,
  NumberVideo,
  Title,
} from './MenuVideos.styled';
import {
  IVideo,
  setAllVideos,
  setApprovedVideos,
} from '../../../redux/slices/universityVideo/universityVideoSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { DateToString } from '../../../hooks/useDateToString';

import acceptIcon from '../../../assets/img/dashboard/apprVideoAccept.svg';
import deleteIcon from '../../../assets/img/dashboard/apprVideoReject.svg';
import reset from '../../../assets/img/dashboard/reset.svg';
import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';
import Videoplayer from '../Videoplayer';
import videoIcon from '../../../assets/img/dashboard/Video.svg';
import ShareLink from '../ShareLink';

interface MenuVideosProps {
  id: string;
}

interface PaginationHandlerProps {
  action: 'up' | 'down';
  where: 'approvedVideos' | 'allVideos';
  forcibly?: boolean;
}
export interface LinkProps {
  isOpen: boolean;
  link: string;
}

// export interface VideoplayerDataProps {
//   url: string;
// }

// TODO: будет время - вынести логику в хуки
const MenuVideos: React.FC<MenuVideosProps> = memo(({ id }) => {
  // Videoplayer
  const [isOpenVideoplayer, setIsOpenVideoplayer] = useState(false);
  const [shareLink, setShareLink] = useState<LinkProps>({ isOpen: false, link: '' });
  const [videoplayerData, setVideoplayerData] = useState<IVideo>();

  const [statusDataReject, setStatusDataReject] = useState(false);
  const {
    videos: videosApproved,
    currentPage: currentPageApproved,
    pageLimit: pageLimitApproved,
    firstCurrentDoc: firstCurrentDocApproved,
    lastCurrentDoc: lastCurrentDocApproved,
    secondCurrentDoc: secondCurrentDocApproved,
  } = useAppSelector((state) => state.universityVideos.approvedVideos);
  const { videos, currentPage, pageLimit, firstCurrentDoc, lastCurrentDoc, secondCurrentDoc } =
    useAppSelector((state) => state.universityVideos.allVideos);

  const { fetchDataFirebase } = useFetchFirebase();

  const dispatch = useAppDispatch();

  const queryStatus = statusDataReject ? 'reject' : 'approved';

  /** запросить данные списка */
  const getVideosHandler = async (universityID: string, where: 'approvedVideos' | 'allVideos') => {
    const queryStatusOpt = where === 'approvedVideos' ? 'pending' : queryStatus;
    const pageLimitOpt = where === 'approvedVideos' ? pageLimitApproved : pageLimit;
    const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
      universityID,
      nameCollection: 'Videos',
      queryStatus: queryStatusOpt,
      pageLimit: pageLimitOpt,
    });

    const sliceOpt = {
      videos: List,
      currentPage: 1,
      firstCurrentDoc: firstVisible,
      lastCurrentDoc: lastVisible,
      secondCurrentDoc: secondVisible,
    };
    if (where === 'approvedVideos') dispatch(setApprovedVideos(sliceOpt));
    else dispatch(setAllVideos(sliceOpt));
  };

  /** перезапросить данные списка */
  const getUpdateVideosHandler = async (start: IVideo, where: 'approvedVideos' | 'allVideos') => {
    const queryStatusOpt = where === 'approvedVideos' ? 'pending' : queryStatus;
    const pageLimitOpt = where === 'approvedVideos' ? pageLimitApproved : pageLimit;

    const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
      universityID: id,
      nameCollection: 'Videos',
      queryStatus: queryStatusOpt,
      pageLimit: pageLimitOpt,
      start,
    });

    const sliceOpt = {
      videos: List,
      currentPage: where === 'approvedVideos' ? currentPageApproved : currentPage,
      firstCurrentDoc: firstVisible,
      lastCurrentDoc: lastVisible,
      secondCurrentDoc: secondVisible,
    };
    if (where === 'approvedVideos') dispatch(setApprovedVideos(sliceOpt));
    else dispatch(setAllVideos(sliceOpt));
  };

  const paginationHandler = async ({ action, where, forcibly }: PaginationHandlerProps) => {
    if (action === 'down') {
      if (!forcibly && where === 'approvedVideos') {
        if (currentPageApproved === 1) return;
        if (currentPageApproved - 1 === 1) return getVideosHandler(id, 'approvedVideos');
      }
      if (!forcibly && where === 'allVideos') {
        if (currentPage === 1) return;
        if (currentPage - 1 === 1) return getVideosHandler(id, 'allVideos');
      }

      const queryStatusOpt = where === 'approvedVideos' ? 'pending' : queryStatus;
      const pageLimitOpt = where === 'approvedVideos' ? pageLimitApproved : pageLimit;
      const endOpt = where === 'approvedVideos' ? firstCurrentDocApproved : firstCurrentDoc;

      const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
        universityID: id,
        nameCollection: 'Videos',
        queryStatus: queryStatusOpt,
        pageLimit: pageLimitOpt,
        end: endOpt,
      });

      const slice = where === 'approvedVideos' ? setApprovedVideos : setAllVideos;

      dispatch(
        slice({
          videos: List,
          currentPage: where === 'approvedVideos' ? currentPageApproved - 1 : currentPage - 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    }

    if (
      (action === 'up' && videosApproved.length === pageLimitApproved) ||
      (action === 'up' && videos.length === pageLimit)
    ) {
      const queryStatusOpt = where === 'approvedVideos' ? 'pending' : queryStatus;
      const pageLimitOpt = where === 'approvedVideos' ? pageLimitApproved : pageLimit;
      const startAftOpt = where === 'approvedVideos' ? lastCurrentDocApproved : lastCurrentDoc;

      const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
        universityID: id,
        nameCollection: 'Videos',
        queryStatus: queryStatusOpt,
        pageLimit: pageLimitOpt,
        startAft: startAftOpt,
      });

      if (!List.length) return;

      const slice = where === 'approvedVideos' ? setApprovedVideos : setAllVideos;

      dispatch(
        slice({
          videos: List,
          currentPage: where === 'approvedVideos' ? currentPageApproved + 1 : currentPage + 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    }
  };

  const setStatusVideoUniversityHandler = async (
    videoId: string,
    whereUpdate: 'approvedVideos' | 'allVideos',
    status: 'approved' | 'reject',
  ) => {
    const university = doc(db, `Videos/${videoId}`);
    try {
      await setDoc(university, { status }, { merge: true });
      if (whereUpdate === 'allVideos') {
        // перезапросить AllVideos
        if (videos.length === 1)
          paginationHandler({ action: 'down', where: 'allVideos', forcibly: true });
        else if (videos[0].id === videoId) getUpdateVideosHandler(secondCurrentDoc, 'allVideos');
        else getUpdateVideosHandler(firstCurrentDoc, 'allVideos');
      }

      if (whereUpdate === 'approvedVideos') {
        // перезапросить Approved Videos
        if (videosApproved.length === 1)
          paginationHandler({ action: 'down', where: 'approvedVideos', forcibly: true });
        else if (videosApproved[0].id === videoId)
          getUpdateVideosHandler(secondCurrentDocApproved, 'approvedVideos');
        else getUpdateVideosHandler(firstCurrentDocApproved, 'approvedVideos');
        // обновить AllVideos
        getVideosHandler(id, 'allVideos');
      }
    } catch (error) {
      console.log('setDoc ERROR ', error);
    }
  };

  // const ShareVideosUniversityHandler = (url: string) => {
  //   // TODO: реализовать логику "поделиться видео"
  // };

  const numberVideo = (index: number, currentPage: number, itemsToPage: number) => {
    let number;
    if (currentPage === 1) {
      number = index + 1;
    }
    number = (currentPage - 1) * itemsToPage + index + 1;

    return number < 10 ? `0${number}` : number;
  };

  const statusDataRejectHandler = () => {
    setStatusDataReject((prev) => !prev);
  };

  useEffect(() => {
    getVideosHandler(id, 'allVideos');
  }, [statusDataReject]);

  useEffect(() => {
    getVideosHandler(id, 'approvedVideos');
  }, []);

  return (
    <>
      <Container>
        <Line />
        <Title>
          New Videos for Approval{' '}
          <ImageWrapper url={reset} onClick={() => getVideosHandler(id, 'approvedVideos')} />
        </Title>
        <ApprovalVideoList>
          {videosApproved.map((video) => (
            <li key={video.id}>
              {/* // todo: изображение или превью? + проигрыватель видео */}
              <IconWrapper
                url={videoIcon}
                onClick={() => {
                  setVideoplayerData(video);
                  setIsOpenVideoplayer(true);
                }}>
                <ActionWrapper
                  acceptApproved
                  width='31px'
                  onClick={(e) => {
                    e.stopPropagation();
                    setStatusVideoUniversityHandler(video.id, 'approvedVideos', 'approved');
                  }}>
                  <Logo src={acceptIcon} width='18px' />
                </ActionWrapper>
                <ActionWrapper
                  deleteApproved
                  width='31px'
                  onClick={(e) => {
                    e.stopPropagation();
                    setStatusVideoUniversityHandler(video.id, 'approvedVideos', 'reject');
                  }}>
                  <Logo src={deleteIcon} width='16px' />
                </ActionWrapper>
              </IconWrapper>
              <ApprovedVideoInfo>
                {/* //todo добавить тултип для title */}
                <div className='title'>{video.title}</div>
                <div className='sub-title'>{DateToString(video.createdAt.seconds)}</div>
              </ApprovedVideoInfo>
            </li>
          ))}
        </ApprovalVideoList>
        {!!videosApproved.length && (
          <Pagination
            currentPage={currentPageApproved}
            pageDown={() => paginationHandler({ action: 'down', where: 'approvedVideos' })}
            pageUp={() => paginationHandler({ action: 'up', where: 'approvedVideos' })}
          />
        )}
      </Container>
      <Container height='720px'>
        <Line />
        <Title width='130px'>
          All Videos <ImageWrapper url={reset} onClick={() => getVideosHandler(id, 'allVideos')} />{' '}
          <ImageWrapper
            url={statusDataReject ? delOrange : delGrey}
            onClick={statusDataRejectHandler}
          />
        </Title>
        <HeadLists>
          <div className='name'>
            Name <Logo src={vectorDown} width='16px' />
          </div>
          <div className='date'>Date</div>
          <div className='duration'>Duration</div>
          <div className='category'>Category</div>
          <div className='likes'>Likes</div>
          <div className='author'>Authors</div>
          {!statusDataReject && <div className='trash'>Trash</div>}
        </HeadLists>
        <Line2 />
        <AllVideoList>
          {videos.map((video, ind) => (
            <li key={video.id}>
              <div className='number'>
                <NumberVideo>{numberVideo(ind, currentPage, pageLimit)}</NumberVideo>
              </div>
              <div className='icon'>
                <IconWrapper
                  url={videoIcon}
                  onClick={() => {
                    setVideoplayerData(video);
                    setIsOpenVideoplayer(true);
                  }}></IconWrapper>
              </div>
              <div className='name'>
                <Title center>{video.title}</Title>
              </div>
              <div className='date'>{DateToString(video.createdAt.seconds)}</div>
              <div className='duration'>{video.duration}</div>
              <div className='category'>{video.tag || 'none tag'}</div>
              <div className='likes'>{video.likes.length}</div>
              <div className='author'>{video.ambassadorName}</div>
              {video.status !== 'reject' ? (
                <div
                  className='trash'
                  onClick={() =>
                    setStatusVideoUniversityHandler(video.id, 'allVideos', 'reject')
                  }></div>
              ) : (
                <ActionWrapper
                  accept
                  width='31px'
                  onClick={() =>
                    setStatusVideoUniversityHandler(video.id, 'allVideos', 'approved')
                  }>
                  <Logo src={acceptIcon} width='18px' />
                </ActionWrapper>
              )}
              <div
                className='share'
                onClick={() => setShareLink({ isOpen: true, link: video.url })}></div>
            </li>
          ))}
        </AllVideoList>
        {!!videos.length && (
          <Pagination
            currentPage={currentPage}
            pageDown={() => paginationHandler({ action: 'down', where: 'allVideos' })}
            pageUp={() => paginationHandler({ action: 'up', where: 'allVideos' })}
          />
        )}
      </Container>
      {isOpenVideoplayer && videoplayerData && (
        <Videoplayer
          // isOpen={isOpenVideoplayer}
          setIsOpen={setIsOpenVideoplayer}
          videoData={videoplayerData}
          setVideoData={setVideoplayerData}
        />
      )}
      {shareLink.isOpen && <ShareLink setIsOpen={setShareLink} publicLink={shareLink} />}
    </>
  );
});

export default MenuVideos;
