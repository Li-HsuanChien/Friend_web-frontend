import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../AppContext';
import { useUser } from '../../../../lib/hooks/useUser';
import MainConnectionMenu from './ConnectionMenuFeature/mainconnectionmenu';
import DefaultConnectionMenu from './ConnectionMenuFeature/defaultconnectionmenu';



const ConnectionMenu= () =>{
  const user = useUser();
  const current_user_id = user ? user.user_id: null;
  const { clickedconnection } = useContext(AppContext);

  return(
    <>
      {/* <MenuStyle>
        {clickedconnection?.inviter===current_user_id || clickedconnection?.invitee===current_user_id
          ? <MainConnectionMenu/>
          : <DefaultConnectionMenu/>}
      </MenuStyle> */}
        {clickedconnection?.inviter!==current_user_id || clickedconnection?.invitee!==current_user_id
          ? <MainConnectionMenu/>
          : <DefaultConnectionMenu/>}

    </>
  )
}
export default ConnectionMenu;
