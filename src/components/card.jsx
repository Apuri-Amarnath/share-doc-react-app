import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/firebase";

function FileCard(props) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.fileURL).then((url) => setUrl(url));
  }, [props.fileURL, firebase]);

  const handleDownload = () => {
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = props.name; // Set the filename for download
      link.click();
    } else {
      console.error("Download URL is not available.");
    }
  };
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This document {props.name} was uploaded on {props.uploadedTime} and
          modified on {props.modifiedTime}
        </Card.Text>
        <div className="d-flex container p-1">
          <Button variant="primary" onClick={handleDownload}>
            Download
          </Button>
          <Button variant="primary" className="ms-2">
            Update Document
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FileCard;
