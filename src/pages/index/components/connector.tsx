import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserNode from './node';
import { Pos, ConnectionData } from '../../../lib/Types';

const LineBox = styled.svg<{ fullposdata?: fullPosdata }>`
  position: fixed;
  ${({ fullposdata }) => fullposdata ? `top: ${fullposdata.top}vh;` : '0'};
  ${({ fullposdata }) => fullposdata ? `left: ${fullposdata.left}vh;` : '0'};
  ${({ fullposdata }) => fullposdata ? `width: ${fullposdata.width}vh;` : '0'};
  ${({ fullposdata }) => fullposdata ? `height: ${fullposdata.height}vh;` : '0'};
  z-index: -1;

  line { 
    stroke: white;
    stroke-width: 3px;
    transition: stroke-width 0.1s ease-in;
  }
  
  line:hover {
    transition: stroke-width 0.1s ease-out;
    cursor: pointer;
    stroke: white;
    stroke-width: 6px; 
    
  }
`

interface LinePos extends Pos{
  angle: number,
}

interface fullPosdata{
  top: number,
  left: number,
  height: number,
  width:  number
}
interface parent{
  id: string,
  username: string
}
interface Props {
  data: ConnectionData;
  parent: parent,
  nodesize: number,
  startposdata: Pos;
  endposdata: LinePos;
}
interface LineData{
  x1: number,
  x2: number,
  y1: number,
  y2: number,
}

const MainConnection: React.FC<Props> = (props) => {
  const {
    id,
    date_established,
    closeness,
    nicknamechildtoparent,
    nicknameparenttochild,
    inviter,
    invitee
  } = props.data;
  const parent_id = props.parent.id;
  const parent_username = props.parent.username;
  const inviterIsParent = inviter === parent_id;
  const child_id = inviterIsParent? invitee: inviter;
  const [childNodeSize, setChildNodeSize] = useState<number>(80);
  const [childName, setchildName] = useState<string>('');
  const [lineData, setLineData] = useState<LineData>({
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  })
  const [fullPosdata, SetFullPosData] = useState<fullPosdata>({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  })
  useEffect(() => {
    const nodesize = props.nodesize;
    if(closeness === 'friend'){
      setChildNodeSize(nodesize - 15);
    } else if(closeness === 'closefriend'){
      setChildNodeSize(nodesize - 10);
    } else{
      setChildNodeSize(nodesize - 5);
    }
    const startPosx = props.startposdata.posx;
    const startPosy = props.startposdata.posy;
    const endPosx = props.endposdata.posx;
    const endPosy = props.endposdata.posy;
    SetFullPosData({
      top: Math.min(startPosy, endPosy),
      left: Math.min(startPosx, endPosx),
      height: Math.abs(startPosy - endPosy),
      width:  Math.abs(startPosx - endPosx),
    })
    if((endPosy < startPosy && endPosx > startPosx) || (endPosy > startPosy && endPosx < startPosx)){
      setLineData({
                  x1: 0,
                  y1 : 100,
                  x2 : 100,
                  y2 : 0
                })
    } else {
      setLineData({
        x1: 0,
        y1 : 0,
        x2 : 100,
        y2 : 100
      })
    }
  }, [window.innerHeight, window.innerWidth, props])
  const handleLineCLick = (e:any) =>{
    e.stopPropagation();
  }


  return (
    <>
      <LineBox fullposdata={fullPosdata} height={fullPosdata.height} width={fullPosdata.width} id={`connection ${id}`}>
        <g onMouseOver={(e) => e.stopPropagation()}>
          <line
            x1={`${lineData.x1}%`}
            y1={`${lineData.y1}%`}
            x2={`${lineData.x2}%`}
            y2={`${lineData.y2}%`}
            onClick={handleLineCLick}
          />
          <title>{`Connection ID: ${id}\nDate Established: ${date_established}\nCloseness: ${closeness}\n`}
                  {nicknameparenttochild && `${childName}'s Nick Name to ${parent_username}is ${nicknameparenttochild}\n`}
                  {nicknamechildtoparent && `${parent_username}'s Nick Name to ${childName} is ${nicknamechildtoparent}\n`}</title>
        </g>
      </LineBox>
      <UserNode user_id = {child_id}
                posData={props.endposdata}
                connectionState = {false}
                nodesize={childNodeSize}
                parent_id={parent_id}
                setchildName={setchildName}
                ></UserNode>
    </>
  );
};

export default MainConnection;
