import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Stack } from 'react-bootstrap';
import IconDelete from '../Images/bin 2.svg';
import IconClose from '../Images/close.svg';

function DeactivateModal ({title, message, btnTxt, onConfirm, isOpen, onClose}) {
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal 
            show={isOpen}
            onHide={onClose}
        >
            <Modal.Header style={{border: "none"}}>
                <Button variant='outline-light' onClick={onClose} className='ms-auto'>
                    <img src={IconClose} alt='close'></img>
                </Button>
            </Modal.Header>
            <Modal.Body className='centered-modal-content'>
                <Stack className='centered-modal-content' gap={1}>
                    <img src={IconDelete} alt='Bin'></img>
                    <h2 style={{fontWeight: 'bold'}}>{title}</h2>
                    <h5>{message}</h5>
                </Stack>
            </Modal.Body>
            <Modal.Footer style={{border: "none"}}>
                <Button variant='danger' onClick={handleConfirm} className='d-grid gap-2 col-6 mx-auto'>
                    {btnTxt}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeactivateModal;