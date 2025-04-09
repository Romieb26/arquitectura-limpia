// Configuración centralizada para las rutas de la API
export const API_CONFIG = {
  baseUrl: 'http://localhost:8000',
  endpoints: {
    vehiculos: '/vehiculos/',  // Endpoint para la API de vehículos
    titulares: '/titulares/'   // Endpoint para la API de titulares
  },
  // Configuración específica para diferentes operaciones si la API requiere rutas personalizadas
  vehiculosOperations: {
    getAll: '/vehiculos/',           // GET - obtener todos los vehículos
    create: '/vehiculos/',           // POST - crear un vehículo
    update: '/vehiculos/:id/',       // PUT - actualizar un vehículo (reemplazar :id con el ID real)
    delete: '/vehiculos/:id/',       // DELETE - eliminar un vehículo (reemplazar :id con el ID real)
    getById: '/vehiculos/:id/'       // GET - obtener un vehículo por ID (reemplazar :id con el ID real)
  }
}; 