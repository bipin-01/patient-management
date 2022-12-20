import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../actions/userAction";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState<string>('')

  const history = useNavigate();

  const dispatch: any = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;


  const userUpdate = useSelector((state: any) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history("/");
    } else {
      const name = userInfo.authData ? userInfo.authData.data.name: userInfo.name;
        const email = userInfo.authData
          ? userInfo.authData.data.email
          : userInfo.email;
            const pic = userInfo.authData
              ? userInfo.authData.data.pic
              : userInfo.pic;

      setName(name);
      setEmail(email);
      setPic(pic);
    }
  }, [history, userInfo]);
  const postDetails = (pics: any) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage("");
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "patientmanagement");
      data.append("cloud_name", "dxlepos58");
      fetch(`https://api.cloudinary.com/v1_1/dxlepos58/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } 
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <MainScreen title='EDIT PROFILE'>
      <div>
        <Row className='profileContainer'>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant='success'>
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId='pic'>
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e: any) => postDetails(e.target.files[0])}
                  id='custom-file'
                  type='image/png'
                  label='Upload Profile Picture'
                  custom
                />
              </Form.Group>
              <Button type='submit'>
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className='profilePic' />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
