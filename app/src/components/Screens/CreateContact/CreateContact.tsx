import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createContactAction } from "../../../actions/contactsAction";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );

    const [dateOfBirth, setDateOfBirth] = useState<any>(new Date());

  const history = useNavigate();

  const dispatch = useDispatch();

  const contactCreate = useSelector((state:any) => state.contactsCreate);
  const { loading, error, contact } = contactCreate;
  const [picMessage, setPicMessage] = useState("");

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
      } else {
        return setPic("Please Selct an image");
      }
    };

  const resetHandler = () => {
    setName("");
    setNumber("");
    setEmail("");
    setPic("");
    setDateOfBirth("");
  };

    const cancelHandler = (e: any) => {
      history("/mypatients");
    };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(createContactAction(name, email, number, pic, dateOfBirth));
    if (!name || !email || !number) return;

    resetHandler();
    history("/mypatients");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title='Create a Contact'>
      <Card>
        <Card.Header>Create a new Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                value={name}
                placeholder='Enter the name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter the email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='number'>
              <Form.Label>Number</Form.Label>
              <Form.Control
                type='number'
                value={number}
                placeholder='Enter Phone Number'
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='birth'>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type='date'
                name='datepic'
                placeholder='DateRange'
                value={dateOfBirth}
                onChange={(e: any) => setDateOfBirth(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='pic'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                onChange={(e: any) => {
                  postDetails(e.target.files[0]);
                }}
                id='custom-file'
                type='image/png'
                label='Upload Profile Picture'
                custom
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type='submit' variant='primary'>
              Create Contact
            </Button>
            <Button className='mx-2' onClick={resetHandler} variant='danger'>
              Reset Feilds
            </Button>

            <Button variant='primary' onClick={cancelHandler} className='mx-2'>
              Cancel
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
