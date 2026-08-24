import { Router } from 'express';

const router = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

// GET / - Obtener todos o filtrar por bootcamp
router.get('/', (req, res) => {
  // #swagger.description = 'Obtiene todos los estudiantes o filtra por bootcamp usando un query param'

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
  // #swagger.description = 'Busca y retorna un estudiante por su ID'

  const id = Number(req.params.id);
  const estudiante = estudiantes.find((est) => est.id === id);

  if (!estudiante) {
    return res.status(404).json({ mensaje: "Estudiante no encontrado" });
  }

  res.json(estudiante);
});


router.post('/', (req, res) => {
  // #swagger.description = 'Crea un nuevo estudiante. El email es obligatorio.'

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


router.put('/:id', (req, res) => {
  // #swagger.description = 'Actualiza la información de un estudiante existente'

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
  // #swagger.description = 'Elimina un estudiante permanentemente'

  const id = Number(req.params.id);
  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (indice !== -1) {
    estudiantes.splice(indice, 1);
  }
  
  res.json({ mensaje: `Estudiante ${id} eliminado` });
});
  
export default router;