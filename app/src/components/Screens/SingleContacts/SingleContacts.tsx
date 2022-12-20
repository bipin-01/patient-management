import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactAction, updateContactAction } from "../../../actions/contactsAction";
import ErrorMessage from "../../ErrorMessage";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading";
import { useParams} from "react-router-dom";

function SingleNote(match: any) {

  const { id } = useParams();
  
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [picMessage, setPicMessage] = useState("");
      const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      );

  const [dateOfBirth, setDateOfBirth] = useState<any>(new Date());

  const dispatch:any = useDispatch();

  const contactUpdate: any = useSelector((state: any) => state.contactsUpdate);
  const { loading, error } = contactUpdate;

  const contactDelete: any = useSelector((state: any) => state.contactsDelete);
  const { loading: loadingDelete, error: errorDelete } = contactDelete;

  const deleteHandler = (id: any) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContactAction(id));
    }
    history("/mypatients");
  };

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

  useEffect(() => {
    const fetching = async () => {
      
      const { data }: any = await axios.get(`/api/mypatients/${id}`);
      setName(data.name);
      setEmail(data.email);
      setNumber(data.number);
      setDate(data.updatedAt);
      setDateOfBirth(data.dateOfBirth)
      setPic(data.pic)
    };

    fetching();
  }, [id, date]);

  const resetHandler: any = () => {
    setName("");
    setNumber("");
    setEmail("");
    setDateOfBirth('');
    setPic('');
  };

  const updateHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateContactAction(id, name, email, number, pic, dateOfBirth));
    if (!name || !email || !number) return;

    resetHandler();
    history("/mypatients");
  };

  const backHandler = (e: any) => {
    history("/mypatients")
  }

  return (
    <MainScreen title='Edit Note'>
      <Card>
        <Card.Header>Edit your Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter the Name'
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder='Enter the Email Address'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Phone No:</Form.Label>
              <Form.Control
                type='content'
                placeholder='Enter the Number'
                value={number}
                onChange={(e: any) => setNumber(e.target.value)}
              />
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
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant='primary' type='submit'>
              Update Note
            </Button>

            <Button
              className='mx-2'
              variant='danger'
              onClick={() => deleteHandler(id)}
            >
              Delete Note
            </Button>
            <Button
              variant='primary'
              className='mx-2'
              onClick={() => backHandler(id)}
            >
              Back
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
