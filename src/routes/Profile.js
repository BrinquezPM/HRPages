import React, { useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import "../App.css";

function Profile() {

    // const [currProfile, setCurrProfile] = useState(true);

    // function handleClick() {
    //     setCurrProfile(false);
    // }
    
    return(
        <div style={{marginLeft: 270}}>
        <Container>
            <Row>
                <Col>
                    {/* <h1>{currProfile ? 'Profile' : 'User Profile'}</h1> */}
                    <h1>Profile1</h1>
                </Col>
                <Col>
                    <h1>Profile</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>profile pic</h6>
                </Col>
                <Col>
                    <h4>user.name</h4>
                    <h6>icon.mail</h6>
                    <Button variant='success'>
                        Edit Profile
                    </Button>
                    <Button variant='danger'>
                        Deactivate
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>icon.username</h6>
                </Col>
                <Col>
                    <h5>Username</h5>
                    <h6>user.username</h6>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>icon.contact number</h6>
                </Col>
                <Col>
                    <h5>Contact Number</h5>
                    <h6>user.contactNumber</h6>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Profile;