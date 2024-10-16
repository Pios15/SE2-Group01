import { Card, Col, Container, Row } from 'react-bootstrap/';

import PropTypes from 'prop-types';

function DisplayCall({ counter, ticketnumber }) {
  return (
    <Container fluid className="flex-grow-1 d-flex flex-column min-w-80">
      <div>
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
                <Card.Body className="text-center">
                  {/* Images Row */}
                  <Row className="justify-content-center align-items-center mb-4">
                    <Col style={{ marginRight: '13rem' }}>
                      <img
                        src="../../public/images/walking.png"
                        alt="icon description"
                        style={{
                          width: '200px',
                          height: '200px',
                        }}
                      />
                    </Col>
                    <Col className="ml-8">
                      <img
                        src="../../public/images/post-office.png"
                        alt="icon description"
                        style={{
                          width: '200px',
                          height: '200px',
                        }}
                      />
                    </Col>
                  </Row>

                  {/* Arrow Image Row */}
                  <Row className="justify-content-center align-items-center mb-3">
                    <Col xs="auto">
                      <img
                        src="../../public/images/arrow-right.png"
                        alt="arrow"
                        style={{
                          width: '100px',
                          height: '100px',
                        }}
                      />
                    </Col>
                  </Row>

                  {/* Text Row */}
                  <Row className="justify-content-center align-items-center">
                    <Col
                      className="text-bold"
                      style={{ fontSize: '120px', marginRight: '10rem' }}
                    >
                      <div className="large-number">{ticketnumber}</div>
                    </Col>
                    <Col className="text-bold" style={{ fontSize: '120px' }}>
                      <div className="large-number">{counter}</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

DisplayCall.propTypes = {
  counter: PropTypes.string,
  ticketnumber: PropTypes.string,
};

export default DisplayCall;
