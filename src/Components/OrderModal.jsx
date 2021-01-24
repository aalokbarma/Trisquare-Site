import React, { useState } from 'react';
import '../css/OrderModal.css';
import Modal from 'react-modal';

function OrderModal() {
    const[modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <div className = "modal">
            <button className = "openButton" onClick = {() => setModalIsOpen(true)}>Open Modal</button>
            <Modal
                isOpen = {modalIsOpen}
                shouldCloseOnOverlayClick = {false}
                shouldCloseOnEsc ={true}
                onRequestClose = {() => setModalIsOpen(false)}>
                <h2>Modal Title</h2>
                <p>Modal Body</p>
                <div>
                    <button onClick = {() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>
    )
}
export default OrderModal
