# backend-aula-4o-periodo

API REST de CRUD de carros e marcas feita com Spring Boot, Spring Data JPA e SQLite.
Projeto da aula de backend do 4º período.

## Stack

- Java 21
- Spring Boot 4.1.1 (Web MVC + Data JPA)
- SQLite (`sqlite-jdbc` + `hibernate-community-dialects`)
- Maven

## Como rodar

```bash
./mvnw spring-boot:run
```

A aplicação sobe em `http://localhost:8080`.

O banco é criado automaticamente em `./data/demo.db` e, quando está vazio,
é populado pelo `DatabaseSeeder` com 5 marcas e 5 carros.

## Modelo

São duas entidades, com associação **unidirecional** de `Carro` para `Marca`:

```
Carro                        Marca
├── id      (Long)           ├── id   (Long)
├── modelo  (String)         └── nome (String)
└── marca   (Marca)  ──────────────┘
```

- O carro guarda a marca como objeto (coluna `marca_id` na tabela `carro`).
- A marca **não** conhece os carros, então `/marcas` devolve só a marca.

---

# Endpoints

## Marcas

| Método | Rota            | Descrição               | Resposta        |
|--------|-----------------|-------------------------|-----------------|
| GET    | `/marcas`       | Lista todas as marcas   | `200` + lista   |
| GET    | `/marcas/{id}`  | Busca uma marca pelo id | `200` + marca   |
| POST   | `/marcas`       | Cria uma marca          | `201` + marca   |
| PUT    | `/marcas/{id}`  | Atualiza uma marca      | `200` + marca   |
| DELETE | `/marcas/{id}`  | Remove uma marca        | `204` sem corpo |

Corpo de `POST` e `PUT`:

```json
{ "nome": "Renault" }
```

Resposta:

```json
{ "id": 6, "nome": "Renault" }
```

### Exemplos

```bash
# listar marcas
curl http://localhost:8080/marcas

# buscar uma marca
curl http://localhost:8080/marcas/1

# criar marca
curl -X POST http://localhost:8080/marcas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Renault"}'

# atualizar marca
curl -X PUT http://localhost:8080/marcas/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Fiat"}'

# remover marca
curl -X DELETE http://localhost:8080/marcas/1
```

## Carros

| Método | Rota            | Descrição              | Resposta        |
|--------|-----------------|------------------------|-----------------|
| GET    | `/carros`       | Lista todos os carros  | `200` + lista   |
| GET    | `/carros/{id}`  | Busca um carro pelo id | `200` + carro   |
| POST   | `/carros`       | Cria um carro          | `201` + carro   |
| PUT    | `/carros/{id}`  | Atualiza um carro      | `200` + carro   |
| DELETE | `/carros/{id}`  | Remove um carro        | `204` sem corpo |

No `POST` e no `PUT` a marca é enviada apenas pelo **id**:

```json
{ "modelo": "Kwid", "marca": { "id": 6 } }
```

A resposta traz a marca completa:

```json
{ "id": 10, "modelo": "Kwid", "marca": { "id": 6, "nome": "Renault" } }
```

### Exemplos

```bash
# listar carros
curl http://localhost:8080/carros

# buscar um carro
curl http://localhost:8080/carros/4

# criar carro (a marca 6 precisa existir)
curl -X POST http://localhost:8080/carros \
  -H "Content-Type: application/json" \
  -d '{"modelo":"Kwid","marca":{"id":6}}'

# atualizar carro
curl -X PUT http://localhost:8080/carros/4 \
  -H "Content-Type: application/json" \
  -d '{"modelo":"Civic","marca":{"id":2}}'

# remover carro
curl -X DELETE http://localhost:8080/carros/4
```

## Erros

Quando o id não existe, a API responde `404` com a mensagem de erro em texto:

```
GET /carros/999   ->  404  "Carro não encontrado com o id: 999"
GET /marcas/999   ->  404  "Marca não encontrada com o id: 999"
```

Ao criar ou atualizar um carro com uma marca inexistente (ou sem informar o id
da marca), a resposta também é `404` com a mensagem correspondente.

## Estrutura

```
src/main/java/com/aula/exemplo/demo/
├── config/DatabaseSeeder.java       # popula o banco com 5 marcas e 5 carros
├── controller/
│   ├── CarroController.java
│   └── MarcaController.java
├── model/
│   ├── Carro.java
│   └── Marca.java
├── repository/
│   ├── CarroRepository.java
│   └── MarcaRepository.java
└── service/
    ├── CarroService.java
    └── MarcaService.java
```
