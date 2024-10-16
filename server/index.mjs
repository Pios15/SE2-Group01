import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import ticketRoutes from './routers/TicketRoutes.mjs';

const app = new express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const port = 3001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
app.use('/api/ticket', ticketRoutes);
