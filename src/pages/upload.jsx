import React, { useState } from "react";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "../styles/Uploadpage.css";
import { useFirebase } from "../context/firebase";

const Uploadpage = () => {
  const firebase = useFirebase();
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [messageClassName, setMessageClassName] = useState("");

  const updateProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => file.name.trim() !== ""); // Filter out files with no name
    if (validFiles.length === 0) {
      setSuccessMessage("No valid files dropped. Please try again.");
      setMessageClassName("alert alert-warning");
    } else {
      setFiles(validFiles);
      setSuccessMessage("Files dropped successfully");
      setMessageClassName("alert alert-info");
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => file.name.trim() !== ""); // Filter out files with no name
    if (validFiles.length === 0) {
      setSuccessMessage("No valid files selected. Please select files.");
      setMessageClassName("alert alert-warning");
    } else {
      setFiles(validFiles);
      setSuccessMessage("Files selected ");
      setMessageClassName("alert alert-info");
    }
  };

  const handleUploadClick = async () => {
    const result = await firebase.uploadFilesToServer(files, updateProgress);
    console.log(result);
    if (result.length === 0) {
      setSuccessMessage("No valid files selected. Please select files.");
      setMessageClassName("alert alert-warning");
    } else if (result.length >= 1) {
      setSuccessMessage("Files uploaded successfully");
      setMessageClassName("alert alert-success");
      setFiles([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {successMessage && (
          <div className={messageClassName}>{successMessage}</div>
        )}
        <div
          className={`file-upload ${dragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="upload-label">
            <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            Choose files or drag them here
          </label>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          {uploadProgress > 0 && (
            <progress value={uploadProgress} max="100">
              {uploadProgress}%
            </progress>
          )}
          <button onClick={handleUploadClick}>Start Upload</button>
        </div>
      </div>
    </>
  );
};

export default Uploadpage;
