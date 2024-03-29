import React, {useContext } from 'react';
import { AppContext } from '../../../../../AppContext';
import { determineHoroscope } from '../../../../../lib/determineHoroscope';
import { FaFacebookSquare } from 'react-icons/fa';
import { CiInstagram } from 'react-icons/ci';
import { FaSnapchat } from 'react-icons/fa6';
import { Url } from 'url';
import { genderLookup } from '../../../../../lib/lookupfunction';
import { Gender } from '../../../../../lib/Types';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { closeMenu } from '../../../../../actions';
import styled from 'styled-components';
import { backendurl } from '../../../../../lib/Backendpoint';

const Close = styled(IoIosCloseCircleOutline)`
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2); 
  }
  position: absolute;
  top: 3%;
  right: 5%;
`;

const DefaultNodeMenu: React.FC = () =>{
  const { dispatch } = useContext(AppContext)
  const { clickeduser } = useContext(AppContext);

  return(
    <>
      <p>@{clickeduser?.username}</p>
          <img
              width="90%"
              height="90%"
              src={`${backendurl}${clickeduser?.headshot as Url}`}
              alt="Headshot
              "
              />
          <span>Bio:</span>
          <div>{clickeduser?.bio}</div>
          <span>Gender: </span>
          <p>{genderLookup(clickeduser?.gender as Gender)}</p>
          <span>Birthday: </span>
          <p>{clickeduser?.date_of_birth}{
            determineHoroscope(clickeduser?.show_horoscope as boolean, clickeduser?.date_of_birth as string)
          }</p>
          <a href= {clickeduser?.instagram_link as string} style={{color:'#d62976'}}><CiInstagram /></a>
          <a href= {clickeduser?.facebook_link as string} style={{color:'blue'}}><FaFacebookSquare /></a>
          <a href= {clickeduser?.snapchat_link as string} style={{color:'yellow'}}><FaSnapchat /></a>
          <p>{clickeduser?.created_time}</p>
          <Close onClick={()=>dispatch(closeMenu())} />
    </>
  )
}

export default DefaultNodeMenu;
