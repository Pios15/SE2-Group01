import { Container } from 'react-bootstrap/';
import { Route, Routes } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GetTicket from './components/GetTicket';
import NotifySystem from './components/NotifySystem';
import DisplayCall from './components/displayCall';
import './components/gameStyle.css';

const App = () => {
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
        <Routes>
          <Route
            path="/displayCall"
            element={<DisplayCall counter="1" ticketNumber="1A" />}
          />

          <Route path="/" element={<GetTicket />} />
          <Route path="/notifySystem/:ticketId" element={<NotifySystem />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
