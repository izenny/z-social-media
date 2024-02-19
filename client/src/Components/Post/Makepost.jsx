import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Makepost.css";
import { MakeNewPostData } from "../../Api/PostApi";
import { useSelector } from "react-redux";
const MyVerticallyCenteredModal = (props) => {
  const { onHide, show } = props; // Destructure onHide and show from props
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleImageChange = (e) => {
    // Handle image upload logic here
    const file = e.target.files[0];
    setPostImage(file);
  };
  const userData = useSelector((state) => state.userDetails.userInfo[0]);
  const handleSubmit = async () => {
    // Handle form submission here
    if (userData) {
      var id = userData._id;
      // console.log(id);
    }
    try {
      console.log(id);
      const newPostData = {
        author: id,
        content: postText,
        image: postImage,
      };
      const createdPost = await MakeNewPostData(id, newPostData);
      console.log("fdgjddjjhmh", newPostData);
      console.log("Created post:", createdPost);
      onHide(); // Close the modal after successful creation
    } catch (error) {
      // Handle error
      console.error("Failed to create post:", error);
    }
    // Close the modal
    onHide(); // Call onHide directly
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="postText">
            <Form.Label>Post Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={postText}
              onChange={handleTextChange}
            />
          </Form.Group>
          <Form.Group controlId="postImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Makepost = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="newpost">
      <Button className="make-post-bn" onClick={() => setModalShow(true)}>
        Make New Post
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Makepost;
