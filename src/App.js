import React, { useState } from 'react';
import axios from 'axios';
import './App.css'


const ContentLoader = () => (
  <div className="content-loader-container">
    <div className="lds-facebook"><div></div><div></div><div></div></div>
  </div>
);

const App = () => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {

      const bstr = e.target.result;
      axios.post('http://localhost:4000/upload/excel', { file: bstr })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setFile(null);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const onFileChange = (e) => {
    const f = e.target.files[0];
    console.log(f.size);
    setFile(f)
  };

  return (
    <div className="container pt-5">
      <header className="App-header">
        <div className="jumbotron bg-transparent position-relative">
          {loading && <ContentLoader />}
          <div className="d-flex flex-row align-items-center">
            <img className="rocketlabs-logo mx-5" src="https://blog.rocketlabs.mx/content/images/2019/02/rlabs-1.png" alt="rocketlabs" />
            <div className="flex-fill text-right">
              <h1 className="display-4">Excel upload!</h1>
              <p className="lead">Select an Excel file and upload it to firebase!</p>
            </div>
          </div>
          <hr />
          <div className="row justify-content-center pt-3">
            <div className="col-sm-12 col-md-4">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <div className="custom-file">
                    <input type="file" name="file" className="custom-file-input" id="file" onChange={onFileChange} />
                    <label className="custom-file-label" htmlFor="file">Choose file</label>
                  </div>
                  <div className="input-group-append">
                    <button
                      disabled={!file}
                      className="btn btn-outline-primary"
                      type="submit">Upload</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );

}

export default App;
