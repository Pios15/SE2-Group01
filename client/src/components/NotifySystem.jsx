import { useState } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { changeTicketStatus } from '../../API/API';
import '../components/gameStyle.css';

function NotifySystem() {
  const { ticketId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleShowModal = async (status, content) => {
    const res = await changeTicketStatus(status, ticketId);
    if (res) {
      setModalContent(content);
      setShowModal(true);
    } else {
      throw new Error('Failed to change status');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        backgroundColor: '#8fc2f4', // Background color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Card
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.55)',
            padding: '50px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '600px',
            height: '300px',
          }}
        >
          <Card.Body>
            <Card.Title
              className="text-center mb-4 primary-font-baloo"
              style={{ fontSize: '36px' }}
            >
              Change status
            </Card.Title>
            <Row className="h-100" style={{ alignItems: 'center' }}>
              <Col className="d-flex justify-content-center">
                <Button
                  className="mx-2"
                  style={{
                    backgroundColor: '#d9534f',
                    border: 'none',
                    padding: '20px 35px',
                    borderRadius: '10px',
                    fontSize: '18px',
                  }}
                  onClick={() =>
                    handleShowModal(2, 'This ticket has been canceled.')
                  }
                >
                  Cancel
                </Button>
              </Col>
              <Col className="d-flex justify-content-center">
                <Button
                  className="mx-2"
                  style={{
                    backgroundColor: '#5bc0de',
                    border: 'none',
                    padding: '20px 35px',
                    borderRadius: '10px',
                    fontSize: '18px',
                  }}
                  onClick={() =>
                    handleShowModal(3, 'This ticket is currently in progress.')
                  }
                >
                  Serving
                </Button>
              </Col>
              <Col className="d-flex justify-content-center">
                <Button
                  className="mx-2"
                  style={{
                    backgroundColor: '#5cb85c',
                    border: 'none',
                    padding: '20px 35px',
                    borderRadius: '10px',
                    fontSize: '18px',
                  }}
                  onClick={() =>
                    handleShowModal(
                      1,
                      'This ticket has been served successfully.',
                    )
                  }
                >
                  Done
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Body>
            <p>{modalContent}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default NotifySystem;
