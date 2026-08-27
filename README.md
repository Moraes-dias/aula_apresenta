# backend-aula-4o-periodo

API REST de CRUD de carros feita com Spring Boot, Spring Data JPA e SQLite.
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

O banco é criado automaticamente em `./data/demo.db` e, na primeira execução,
é populado com 5 carros pelo `DatabaseSeeder`.

## Endpoints

| Método | Rota            | Descrição              | Resposta            |
|--------|-----------------|------------------------|---------------------|
| GET    | `/carros`       | Lista todos os carros  | `200` + lista       |
| GET    | `/carros/{id}`  | Busca um carro pelo id | `200` + carro       |
| POST   | `/carros`       | Cria um carro          | `201` + carro       |
| PUT    | `/carros/{id}`  | Atualiza um carro      | `200` + carro       |
| DELETE | `/carros/{id}`  | Remove um carro        | `204` sem corpo     |

Quando o id não existe, a API responde `404` com a mensagem de erro.

### Exemplo

```bash
# listar
curl http://localhost:8080/carros

# criar
curl -X POST http://localhost:8080/carros \
  -H "Content-Type: application/json" \
  -d '{"modelo":"Kwid","marca":"Renault"}'
```

## Estrutura

```
src/main/java/com/aula/exemplo/demo/
├── config/DatabaseSeeder.java     # popula o banco com 5 carros
├── controller/CarroController.java
├── model/Carro.java
├── repository/CarroRepository.java
└── service/CarroService.java
```
