import express from 'express';
import rutasEstudiantes from './routes/estudiantes';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json' with { type: 'json' };

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('El servidor está corriendo');
});


app.use('/api/estudiantes', rutasEstudiantes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación de Swagger en http://localhost:${PORT}/api-docs`);
});