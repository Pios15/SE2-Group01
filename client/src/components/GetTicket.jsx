import { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from 'react-bootstrap/';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function GetTicket() {
  const [showModal, setShowModal] = useState(false);
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceTitle, setServiceTitle] = useState('');
  const [qrCode, setQrCode] = useState(null); // State to store the QR code image
  const [loadingQrCode, setLoadingQrCode] = useState(false); // State for loading

  const handleShowModal = (title, description) => {
    setServiceTitle(title);
    setServiceDescription(description);
    setShowModal(true);
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setServiceDescription('');
    setServiceTitle('');
    setQrCode(null);
    setLoadingQrCode(false);
  };

  const fetchQrCode = async () => {
    try {
      setLoadingQrCode(true); // Start loading state

      // Generate the QR code from the random string
      const generatedQrCode = null;

      // Set the QR code in state
      setQrCode(generatedQrCode);
    } catch (error) {
      console.error('Error fetching QR code:', error);
      alert('Failed to generate ticket. Please try again.');
    } finally {
      setLoadingQrCode(false); // Stop loading state
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        //backgroundImage: getBackground().backgroundImage,
        backgroundColor: '#8fc2f4', //#5ebb55
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      <Container fluid className="flex-grow-1 d-flex flex-column min-w-80">
        <div>
          <Container fluid className="p-0">
            <Row
              className="justify-content-center align-items-center m-0"
              style={{ height: '100vh' }}
            >
              <Col md={6} className="p-5 mb-5">
                <div className="ml-5 mb-5 p-5">
                  <Card
                    className="p-3"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.55)',
                      paddingLeft: '20px',
                    }}
                  >
                    <Card.Body>
                      <Card.Title
                        className="text-center mb-4 primary-font-baloo"
                        style={{ fontSize: '36px' }}
                      >
                        Post Office
                      </Card.Title>
                      <Card.Title
                        className="text-center mb-4 primary-font-baloo"
                        style={{ fontSize: '24px' }}
                      >
                        Choose service
                      </Card.Title>
                      <Form>
                        <Form.Group
                          className="mb-4 primary-font-baloo"
                          controlId="username"
                        >
                          <Row>
                            <Col className="d-flex flex-column justify-content-center">
                              <Button
                                type="button"
                                className="mt-1"
                                style={{
                                  backgroundColor: 'white', // Background color
                                  border: '10px solid #5ebbac', // Green border
                                  color: 'white', // Text color
                                  padding: '10px 20px', // Button padding
                                  borderRadius: '10px', // Rounded corners
                                }}
                                onClick={() =>
                                  handleShowModal(
                                    'Mail Service',
                                    'Send and receive emails securely at our post office.',
                                  )
                                }
                              >
                                <img
                                  src="./images/email.png"
                                  alt="icon description"
                                  style={{
                                    width: '100px',
                                    height: '100px',
                                    marginRight: '8px',
                                  }}
                                />
                              </Button>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group
                          className="mb-4 primary-font-baloo"
                          controlId="password"
                        >
                          <Row>
                            <Col className="d-flex flex-column justify-content-center">
                              <Button
                                type="button"
                                className="mt-1"
                                style={{
                                  backgroundColor: 'white', // Background color
                                  border: '10px solid #5ebbac', // Green border
                                  color: 'white', // Text color
                                  padding: '10px 20px', // Button padding
                                  borderRadius: '5px', // Rounded corners
                                }}
                                onClick={() =>
                                  handleShowModal(
                                    'Delivery Service',
                                    'We offer fast and reliable parcel delivery services.',
                                  )
                                }
                              >
                                <img
                                  src="./images/delivery.png"
                                  alt="icon description"
                                  style={{
                                    width: '100px',
                                    height: '100px',
                                    marginRight: '8px',
                                  }}
                                />
                              </Button>
                            </Col>
                          </Row>
                        </Form.Group>
                        <Form.Group
                          className="mb-4 primary-font-baloo"
                          controlId="password"
                        >
                          <Row>
                            <Col className="d-flex flex-column justify-content-center">
                              <Button
                                type="button"
                                className="mt-1"
                                style={{
                                  backgroundColor: 'white', // Background color
                                  border: '10px solid #5ebbac', // Green border
                                  color: 'white', // Text color
                                  padding: '10px 20px', // Button padding
                                  borderRadius: '5px', // Rounded corners
                                }}
                                onClick={() =>
                                  handleShowModal(
                                    'Mobile Banking',
                                    'Manage your finances and payments through our mobile banking services.',
                                  )
                                }
                              >
                                <img
                                  src="./images/mobile-banking.png"
                                  alt="icon description"
                                  style={{
                                    width: '100px',
                                    height: '100px',
                                    marginRight: '8px',
                                  }}
                                />
                              </Button>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>

      {/* Modal Component */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{serviceTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingQrCode ? (
            <p>Loading QR Code...</p>
          ) : qrCode ? (
            <div className="text-center">
              <img
                src={qrCode}
                alt="Generated QR Code"
                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
              />
              <p>Your ticket has been generated.</p>
              <p className="mb-1">Use this QR code to see your ticket.</p>
            </div>
          ) : (
            <p>{serviceDescription}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Go Back
          </Button>
          <Button variant="primary" onClick={fetchQrCode} hidden={!!qrCode}>
            Get Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GetTicket;
