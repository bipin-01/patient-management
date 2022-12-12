import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./MyContacts.css";
import MainScreen from "../../MainScreen";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteContactAction, listNotes } from "../../../actions/contactsAction";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";


function MyContacts({search}: any) {

  const dispatch = useDispatch();
  const history = useNavigate();

  const contactList = useSelector( (state: any) => 
    state.contactsList
  )


  const { contacts, error } = contactList;

  const userLogin = useSelector((state:any) => state.userLogin);

  const { userInfo } = userLogin;

    const contactCreate = useSelector((state: any) => state.contactsCreate);
    const { success:successCreate } = contactCreate;

    const contactUpdate: any = useSelector(
      (state: any) => state.contactsUpdate
    );
    const { success: successUpdate } = contactUpdate;

  const contactDelete = useSelector((state: any) => state.contactsDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = contactDelete;

  const deleteHandler = (id: any) => {
    if (window.confirm("Are You SUre?")) {
      dispatch(deleteContactAction(id))
    }
  };

  useEffect(() => {
    dispatch(listNotes())
    if(!userInfo) {
      history("/")
    }
  }, [dispatch, history, userInfo, successCreate, successUpdate, successDelete]);

  
  return (
    <MainScreen title={`Welcome Back ${userInfo.authData.data.name}`}>
      <Link to='/createcontact'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Add Patient
        </Button>
      </Link>
      {errorDelete && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loadingDelete && <Loading />}
      {contacts?.filter((filteredContact: any)=> 
      filteredContact.title.toLowerCase().includes(search)
      ).map((info: any) => (
        <Accordion key={info._id}>
          <Card style={{ margin: 10 }} key={info._id}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Toggle as={Card.Text} variant='link' eventKey='0'>
                  {info.title}
                </Accordion.Toggle>
              </span>
              <div>
                <Button href={`/mypatients/${info._id}`}>Edit</Button>
                <Button
                  variant='danger'
                  className='mx-2'
                  onClick={() => deleteHandler(info._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <h4>
                  <Badge variant='success'>Category - {info.category}</Badge>
                </h4>
                <blockquote className='blockquote mb-0'>
                  <p>{info.content}</p>
                  Created On{" "}
                  <cite title="Source Title">
                    {info.createdAt.substring(0, 10)}
                  </cite>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
}

export default MyContacts;
