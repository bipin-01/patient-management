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

  console.log(id, "this is id") 
  

  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

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


  useEffect(() => {
    const fetching = async () => {
      const { data }: any = await axios.get(`/api/mypatients/${id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler: any = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e: any) => {
    e.preventDefault();
    dispatch(updateContactAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history("/mypatients");
  };

  return (
    <MainScreen title='Edit Note'>
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter the title'
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control
                placeholder='Enter the content'
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
              />
            </Form.Group>
           

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='content'
                placeholder='Enter the Category'
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
              />
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
