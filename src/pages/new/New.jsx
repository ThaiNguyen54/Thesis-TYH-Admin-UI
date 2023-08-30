import './new.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AxiosClient from "../../axiosclient";

const New = ({ title }) => {
  const [file, setFile] = useState('');
  const [inputData, setInputData] = useState({ Name: '', Des: '' });
  const navigate = useNavigate();

  const handleSelectFile = (e) => setFile(e.target.files[0]);


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = new FormData();
      data.append("my_file", file);
      data.name = file.name;
      data.append("Name", inputData.Name)
      data.append("Des", inputData.Des)
      // data.Name = inputData.Name;
      // data.Des = inputData.Des;
      console.log(data)

      const res = await axios.post("https://geminisoftvn.ddns.net:7001/ver1/hairstyle", data).then(result => {
        alert("Added a new hairstyle successfully")
        navigate('/Hair')
      });

      // const res = await axios.post("https://localhost:7001/ver1/hairstyle", data).then(result => {
      //   alert("Added a new hairstyle successfully")
      //   navigate('/Hair')
      // });

    } catch (error) {
      alert(error.message);
    }
  }

  return (
  // eslint-disable-next-line react/react-in-jsx-scope
    <div className="new">
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <div className="newContainer">
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <div className="top">
          {/* eslint-disable-next-line react/react-in-jsx-scope */}
          <h1>{title}</h1>
        </div>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <div className="bottom">
          {/* eslint-disable-next-line react/react-in-jsx-scope */}
          <div className="left">
            {/* eslint-disable-next-line react/react-in-jsx-scope */}
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=""
            />
          </div>
          {/* eslint-disable-next-line react/react-in-jsx-scope */}
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <div className="formInput">
                {/* eslint-disable-next-line react/react-in-jsx-scope */}
                <label htmlFor="file">
                  {/* eslint-disable-next-line react/react-in-jsx-scope */}
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                {/* eslint-disable-next-line react/react-in-jsx-scope */}
                <input
                    type="file"
                    id="file"
                    onChange={ handleSelectFile }
                    style={{ display: 'none' }}
                    multiple={false}
                />
              </div>

              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <div className="formInput" key="1">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,react/react-in-jsx-scope */}
                <label>Name</label>
                {/* eslint-disable-next-line react/react-in-jsx-scope */}
                <input type="text" onChange={(e) => setInputData({ ...inputData, Name: e.target.value })} />
              </div>

              {/* <div className="formInput" key='2'> */}
              {/*  <label>Url</label> */}
              {/*  <input type='text' onChange={e => setInputData({...inputData, Url: e.target.value})} /> */}
              {/* </div> */}

              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <div className="formInput" key="3">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,react/react-in-jsx-scope */}
                <label>Description</label>
                {/* eslint-disable-next-line react/react-in-jsx-scope */}
                <input type="text" onChange={(e) => setInputData({ ...inputData, Des: e.target.value })} />
              </div>
              {/* eslint-disable-next-line react/button-has-type,react/react-in-jsx-scope */}
              <button>Add</button>
              {/*{file && (*/}
              {/*    <>*/}
              {/*      <button onClick={handleUpload}>Add</button>*/}
              {/*    </>*/}
              {/*)}*/}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

