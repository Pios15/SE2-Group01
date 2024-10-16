import express from 'express';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

import TicketDAO from '../DAO/ticketDAO.mjs';
import { getWaitingTime } from '../controllers/TicketController.mjs';

const baseUrl = 'http://localhost:3001';
const ticketDAO = new TicketDAO();

export const router = express.Router();

router.post('/create', async (req, res) => {
  const serviceID = req.body.serviceId;
  try {
    const ticket = await ticketDAO.getTicket(serviceID);
    const service_name = await ticketDAO.get_service_name(serviceID);
    const issue_date = new Date();

    const pdfPath = `./tickets/${ticket.ticket_number}.pdf`;
    const eta = await getWaitingTime(service_name);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc
      .fontSize(30)
      .text('Ticket Information', {
        align: 'center',
      })
      .moveDown(2);
    doc
      .fontSize(20)
      .text(`Ticket Number: ${ticket.ticket_number}`, {
        align: 'left',
      })
      .moveDown(1);
    doc
      .text(`Service: ${service_name}`, {
        align: 'left',
      })
      .moveDown(1);
    doc
      .fontSize(20)
      .text(
        `Date: ${issue_date.toLocaleDateString()} ${issue_date.toLocaleTimeString()}`,
        {
          align: 'left',
        },
      )
      .moveDown(1);
    doc
      .fontSize(20)
      .text(`Estimated Time: ${eta} minutes`, {
        align: 'left',
      })
      .moveDown(2);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.end();
    // generate qr code
    const downloadUrl =
      baseUrl + `/api/ticket/download/${ticket.ticket_number}`;
    const qrcode = await QRCode.toDataURL(downloadUrl);
    res.status(200).json({ qrcode });
  } catch (error) {
    console.warn('Error creating ticket', error);
    res.status(500).json({ 'Database error': error.message });
  }
});

// Download ticket

router.get('/download/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const ticket = ticketDAO.getTicket(ticketId);
  if (!ticketId) {
    res.status(400).send('Ticket ID is required');
  }
  if (fs.existsSync(`./tickets/${ticketId}.pdf`) && ticket) {
    res.download(`./tickets/${ticketId}.pdf`, `ticket-${ticketId}.pdf`, err => {
      if (err) {
        res.status(404).send('Error downloading file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

// Change user status

router.put('/:ticket_number', async (req, res) => {
  const ticket_number = req.params.ticket_number;
  const new_status_code = req.body.status;

  if (!ticket_number || !new_status_code) {
    return res.status(400).send('Invalid ticket number or status');
  }

  try {
    const updated_status = await ticketDAO.change_status(
      ticket_number,
      new_status_code,
    );
    res.status(200).json({ ticket_number, updated_status });
  } catch (error) {
    res.status(500).json({ 'Database error': error.message });
  }
});

export default router;
