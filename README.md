
## Iniciando o projeto dentro do container


#### Clone o repositório

```bash
# Clonando o repositório na pasta customer-api.
$ git clone https://github.com/joaobezerradev/customer-api.git

# Copie e preencha as variaves de ambiente.
$ cd customer-api && cp .env.example .env

# Subir container
$ docker-compose up -d

# Abrir terminal do container
$ docker exec -it api sh

```

### Instalando dependencias

```bash
# dependencias do package-lock.json
$ npm ci
```

### Executando

```bash
# development
$ npm run start:dev
```

- URL Swagger - http://localhost:3333/api
- API acessível em http://localhost:3333

## Testando

```bash
# run all tests
$ npm test

# run test coverage
$ npm run test:cov
```
