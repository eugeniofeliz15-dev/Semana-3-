import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

app.get('/', (req, res) => {
  res.send('El servidor está corriendo');
});

app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

app.post('/api/estudiantes', (req, res) => {
  const datosEstudiante = req.body;

  if (!datosEstudiante.email) {
    return res.status(400).json({ mensaje: "El campo email es obligatorio" });
  }

  const nuevoId = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1;
  const nuevoEstudiante: Estudiante = {
    id: nuevoId,
    nombre: datosEstudiante.nombre,
    email: datosEstudiante.email,
    bootcamp: datosEstudiante.bootcamp
  };

  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

app.put('/api/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const datosActualizados = req.body;

  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);
   if (indice === -1) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }

  estudiantes[indice] = { ...estudiantes[indice], ...datosActualizados, id };

  res.json(estudiantes[indice]);
});

app.delete('/api/estudiantes/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (indice !== -1) {
    estudiantes.splice(indice, 1);
  }
  res.json({ mensaje: `Estudiante ${id} eliminado` });
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});