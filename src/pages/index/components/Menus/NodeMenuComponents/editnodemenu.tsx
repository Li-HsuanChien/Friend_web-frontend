import React, {useContext, useState, Dispatch } from 'react';
import { UserUpdate } from '../../../../../lib/UserDataFunctions';
import { useToken } from '../../../../../lib/hooks/useToken';
import { AppContext } from '../../../../../AppContext';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ConfirmationModal from '../../../../../lib/confirmationModal';
import styled from 'styled-components';
//TBD add bio
const EditStyle = styled.div`

  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;

  form {
    height: auto; 
    width: 95%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  form * {
    font-family: 'Poppins', sans-serif;
  }

  form h3 {
    text-align: center;
    color: black;
    margin-bottom: 1%;
  }
  
  input[type=url],
  textarea,
  input[type='date'],
  input[type='file'],
  select {
    background-color: white;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
    width: 90%;
    color: black;
    align-self: end;
    box-sizing: border-box;
    resize: none;
    text-align: end;
  }

  input[type=url],
  textarea,
  input[type='date'],
  input[type='file'] {
    margin-bottom: 5px; /* Reduce bottom margin */
  }

  input[type='file']::file-selector-button {
    font-family: 'Poppins', sans-serif;
    border: thin solid grey;
    border-radius: 3px;
  }

  form select {
    width: 100%;
    background-color: white;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
    color: black;
    align-self: end;
    box-sizing: border-box; 
  }

  ::placeholder {
    color: #e5e5e5;
  }
`
const Button = styled.button`
  position: absolute;
  bottom: 10%; 
  left: 50%; 
  transform: translateX(-50%); 
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border-radius: 10px; 
  border: none;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #222;
  }
`;


const Toggle = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: flex-end;

  input[type="checkbox"] {
    display: none;
  }

  label {
    cursor: pointer;
    margin-right: 10px;
    padding: 8px 15px;
    border-radius: 20px;
    border: 2px solid #ccc;
    color: #555;
    transition: all 0.3s ease;
  }

  input[type="checkbox"]:checked + label {
    background-color: black;
    color: white;
    border-color: white;
  }
`;
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

const EditNodeMenu: React.FC<{setEditState: Dispatch<boolean>, editState: boolean}> = ({setEditState, editState}) =>{
  const { clickeduser } = useContext(AppContext);
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [jwt] = useToken();
  const [bio, setBio] = useState<string>(clickeduser?.bio as string);
  const [horoscopeState, setHoroscopeState] = useState<boolean>(clickeduser?.show_horoscope ? clickeduser.show_horoscope: false);
  const [date, setDate] = useState<string>(clickeduser?.date_of_birth as string);
  const [gender, setGender] = useState<string>();
  const [facebook, setFacebook] = useState<string>(clickeduser?.facebook_link as string);
  const [snapchat, setSnapchat] = useState<string>(clickeduser?.snapchat_link as string);
  const [instagram, setInstagram] = useState<string>(clickeduser?.instagram_link as string);
  const [image, setImage] = useState<File>();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setEditState(!editState);
    try{
      if(bio || gender || date || horoscopeState || instagram || facebook || snapchat || image){
        UserUpdate(jwt as string, bio, gender, date, horoscopeState, instagram, facebook, snapchat, image)
        .then((result) => console.log(result));
      }
      //TBD visuals
    } catch(error)  {
      console.error(error)
      return;
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const selectedFile = e.target.files[0];
          setImage(selectedFile);
        }
      };

  return (
    <>
      <EditStyle>
        <Close onClick={()=>setEditState(false)} />
          <form>
            <h3>Edit</h3>

            <label htmlFor="bio">Bio</label>
            <textarea
              placeholder="Bio....."
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <label htmlFor='Image'>headshoot</label>
            <input
              type='file'
              id='Image'
              name='Image_url'
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => {
                handleImageChange(e);
              }}/>

            <label htmlFor="Gender">Gender</label>
            <select id="Gender" name="Gender" onChange={(e)=>setGender(e.target.value)} value={clickeduser?.gender}>
              <option value="M">Cis Gender Male</option>
              <option value="F">Cis Gender Female</option>
              <option value="N">NonBinary</option>
              <option value="NA">Prefer Not To Say</option>
            </select>

            <label htmlFor="Date_of_birth">Birthday</label>
            <input
              type="date"
              placeholder="Birthday"
              id="Date_of_birth"
              value={date}
              onChange={(e) => setDate(e.target.value)} />

            <Toggle>
            <input type="checkbox"
                   id="horoscope"
                   name="showhoroscope"
                   checked={horoscopeState}
                   onChange={() => setHoroscopeState(!horoscopeState)}
                   />
            <label htmlFor="horoscope">Showhoroscope?</label>
            </Toggle>

            <label htmlFor="facebook_link">Facebook Link</label>
            <input
              type="url"
              placeholder="facebook link"
              id="facebook_link"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)} />

            <label htmlFor="snapchat_link">Snapchat Link</label>
            <input
              type="url"
              placeholder="snapchat link"
              id="snapchat_link"
              value={snapchat}
              onChange={(e) => setSnapchat(e.target.value)} />

            <label htmlFor="instagram_link">Instagram Link</label>
            <input
              type="url"
              placeholder="instagram link"
              id="instagram_link"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)} />

            <Button type="button" onClick={() => setConfirmState(!confirmState)} >confirm</Button>
          </form>
      </EditStyle>
      {confirmState && <ConfirmationModal func={handleSubmit}setState={setConfirmState} details='Are you sure?'></ConfirmationModal>}
    </>
  )
}

export default EditNodeMenu;
