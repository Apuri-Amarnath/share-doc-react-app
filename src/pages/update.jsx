import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useFirebase } from "../context/firebase";
import FileCard from "../components/card";

const UpdatePage = () => {
  const firebase = useFirebase();
  const user = firebase.getCurrentUser();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    firebase.listAllFiles().then((files) => setFiles(files.docs));
  }, [user, firebase]);
  return (
    <>
      <Navbar />
      <div className="container p-4">
        {files.map((file) => (
          <FileCard {...file.data()} />
        ))}
      </div>
      ;
    </>
  );
};

export default UpdatePage;
