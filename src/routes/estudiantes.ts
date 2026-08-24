import { Router } from 'express';

const router = Router();


interface Estudiante {
  id: number;
  name: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// GET / - Obtener todos o filtrar por bootcamp
router.get('/', (req, res) => {
  const bootcamp = req.query.bootcamp as string;

  if (bootcamp) {
    const estudiantesFiltrados = estudiantes.filter(
      (estudiante) => estudiante.bootcamp === bootcamp
    );
    return res.json(estudiantesFiltrados);
  }

  res.json(estudiantes);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((est) => est.id === id);

  if (!estudiante) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }

  res.json(estudiante);
});


router.post('/', (req, res) => {
  const datosEstudiante = req.body;

  if (!datosEstudiante.email) {
    return res.status(400).json({ mensaje: "El campo email es obligatorio" });
  }

  const nuevoId = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1].id + 1 : 1;
  
 
  const nuevoEstudiante: Estudiante = {
    id: nuevoId,
    name: datosEstudiante.name, 
    email: datosEstudiante.email,
    bootcamp: datosEstudiante.bootcamp
  };

  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});


router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const datosActualizados = req.body;

  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);
  
  if (indice === -1) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }

  
  estudiantes[indice] = { ...estudiantes[indice], ...datosActualizados, id };
  res.json(estudiantes[indice]);
});


router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (indice !== -1) {
    estudiantes.splice(indice, 1);
  }
  
  res.json({ mensaje: `Estudiante ${id} eliminado` });
});
  
export default router;