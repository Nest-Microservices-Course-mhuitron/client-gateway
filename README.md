# Client Gateway


## Dev

1. Clonar repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `.env-template`
4. Levantar servidor de NATS
````
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
````
5. Ejecutar `npm run start:dev`

