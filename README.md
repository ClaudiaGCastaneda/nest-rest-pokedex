<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


# Ejecutar desarrollo

1. Clonar el repositorio
2. Ejecutar
`````
npm install
`````
3. Tener Nest CLI instalado

````
npm i -g @nest/cli
````

4. Levantar la base de datos

````
docker-compose up -d
````

5. Clonar el archivo __.env_template__ y renombrar la copia a __.env__

6. Llenar las variables de entorno definidas en el ````.env````

7. Ejecutar la aplicación en dev

````
npm run start:dev
````

8. Reconstruir la base de datos con la semilla

````
http://localhost:3000/api/v2/seed
````


### Stack usado
* Mongo DB
* Nest

# Build de producción
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
````
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
````
4. Para no generar el buid 
````
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
`````
