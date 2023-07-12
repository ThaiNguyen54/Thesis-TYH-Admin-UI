import "./new.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [inputData, setInputData] = useState({Name: '',  Des: ''})
  const navigate = useNavigate()


  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3001/ver1/hairstyle/' + file.name, inputData)
        .then(res => {
          alert('Data Added Successfully');
          navigate('/')
        }).catch(err => console.log(err))
  }

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput" key='1'>
                <label>Name</label>
                <input type='text' onChange={e => setInputData({...inputData, Name: e.target.value})} />
              </div>

              {/*<div className="formInput" key='2'>*/}
              {/*  <label>Url</label>*/}
              {/*  <input type='text' onChange={e => setInputData({...inputData, Url: e.target.value})} />*/}
              {/*</div>*/}

              <div className="formInput" key='3'>
                <label>Description</label>
                <input type='text' onChange={e => setInputData({...inputData, Des: e.target.value})} />
              </div>
              <button>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

