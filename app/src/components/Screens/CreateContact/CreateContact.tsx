import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createContactAction } from "../../../actions/contactsAction";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom'

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const history = useNavigate();

  const dispatch = useDispatch();

  const contactCreate = useSelector((state:any) => state.contactsCreate);
  const { loading, error, contact } = contactCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(createContactAction(title, content, category));
    if (!title || !content || !category) return;

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
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                value={title}
                placeholder='Enter the title'
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control
               type='content'
                value={content}
                placeholder='Enter the content'
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='content'
                value={category}
                placeholder='Enter the Category'
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type='submit' variant='primary'>
              Create Note
            </Button>
            <Button className='mx-2' onClick={resetHandler} variant='danger'>
              Reset Feilds
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
