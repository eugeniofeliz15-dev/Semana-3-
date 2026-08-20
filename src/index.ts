import express from 'express';

import rutasEstudiantes from './routes/estudiantes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('El servidor está corriendo');
});


app.use('/api/estudiantes', rutasEstudiantes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});