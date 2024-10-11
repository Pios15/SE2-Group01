import express from 'express';

import ticketRoutes from './routers/TicketRoutes.mjs';

const app = new express();
const port = 3001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
app.use('/ticket', ticketRoutes);
