import express from 'express';

import serviceRouter from './routes/serviceRouter.mjs';

const app = new express();
const port = 3001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.use('/service', serviceRouter);
