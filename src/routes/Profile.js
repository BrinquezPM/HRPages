import React, { useState } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import "../App.css";
import MailIcon from '../Images/mailLogo.svg';
import EditIcon from '../Images/pencil-outline.svg';
import DeactivateIcon from '../Images/trash-can-outline.svg';
import UsernameIcon from '../Images/account-outline.svg';
import ContactIcon from '../Images/phone-outline.svg';
import SampleProfile from '../Images/profile-pic-sample.svg';

function Profile() {

    // const [currProfile, setCurrProfile] = useState(true);

    // function handleClick() {
    //     setCurrProfile(false);
    // }
    
    return(
        <div style={{marginLeft: 270}} className='App container'>
        <Stack gap={4}>
            <Stack gap={1}>
                <h1>Profile</h1>
                <Stack direction='horizontal' gap={3}>
                    <img src={SampleProfile} alt='sample profile' />
                    <div>
                        <h4>user.name</h4>
                        <h6><img src={MailIcon} alt='Mail' /> user.email</h6>
                        <Button variant='success'>
                            <img src={EditIcon} alt='Edit Profile' /> Edit Profile
                        </Button> {'\t'}
                        <Button variant='danger'>
                            <img src={DeactivateIcon} alt='Deactivate' /> Deactivate
                        </Button>
                    </div>
                </Stack>
            </Stack>
            <Stack>
                <h5><img src={UsernameIcon} alt='username' /> Username</h5>
                <p><span>user.username</span></p>
                <h5><img src={ContactIcon} alt='contact number' /> Contact Number</h5>
                <p><span>user.contactNumber</span></p> 
            </Stack>
        </Stack>
        </div>
    )
}

export default Profile;