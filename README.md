# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

A URL base da aplicação:
https://motorshop-icql.onrender.com

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](DERMANAGECONTACTS.png)

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---
## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Por enquanto, não foi implementada autenticação.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [POST - /login](#12-login-de-usuário)
	- [GET - /users/profile](#13-mostrar-dados-do-usuário-logado)
    - [PATCH - /users/:id](#14-atualização-de-usuários)
    - [DELETE - /users/:id](#15-deleção-de-usuários)
- [Contacts](#2-contacts)
    - [POST - /contacts](#21-criação-de-um-contato)
    - [GET - /contacts](#22-listar-contatos-do-usuário)
    - [PATCH - /contacts](#23-atualizar-um-contato)
    - [DELETE - /contacts](#24-deletar-um-contato)


---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| UUID         | string | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário.                            |
| cpf      | string | O cpf do usuário.                            |
| phone      | string | O Telefone do usuário.                            |
| birthdate      | string | Data de nascimento do usuário.                            |
| description      | string | Descrição do  usuário.                            |
| password   | string | A senha de acesso do usuário                    |
| address      | string | obsjeto com endereço do usuário.                            |
| createdAt      | Date | Data da criação do usuário   |
| updatedAt      | Date | Data de atualização do usuário   |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /users     | Criação de um usuário.
| POST     | /login     | Rota para login de usuário.
| GET      | /users/profile    | Lista o usuario logado, usando o token como parâmetro.
| PATCH      | /users/:id     | Atualiza usuário, usando o UUID como parametro.
| DELETE      | /users/:id     | Deleta um usuário usando o UUID como parametro.

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users/profile`

### Exemplo de Request:
```
POST /users/profile
Host: https://motorshop-icql.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Fernando Henrique",
	"email": "fernando@kenzie.com",
	"cpf": "02847892167",
	"phone": "62981540735",
	"birthdate": "1993-11-11",
	"description": "Vendedor há mais de 10 anos de experiencia no mercado pronto para te atender",
	"typeUser": "seller",
	"password": "1234",
	"confirmPassword": "1234",
	"address": {
		"cep": "74310375",
		"state": "Goias",
		"city": "Goiânia",
		"street": "Afonso pena",
		"number": "452",
		"complement": "minha casinha linda"
	}
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"name": "Fernando Henrique",
	"email": "fernando@kenzie.com",
	"profileImage": null,
	"cpf": "02898932167",
	"phone": "62981540735",
	"birthdate": "1993-11-11",
	"description": "Vendedor há mais de 10 anos de experiencia no mercado pronto para te atender",
	"typeUser": "seller",
	"address": {
		"cep": "74310375",
		"state": "Goias",
		"city": "Goiânia",
		"street": "Afonso pena",
		"number": "452",
		"complement": "minha casinha linda",
		"id": "26e7ce99-3c55-480d-8a59-caf47fde7153"
	},
	"id": "9794c20e-4715-44b1-a97e-0b3545cad0da",
	"createdAt": "2023-03-09T02:09:41.981Z",
	"updatedAt": "2023-03-09T02:09:41.981Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already exists |
| 409 Conflict   | CPF already exists |

---
### 1.2. **Login de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/login`

### Exemplo de Request:
```
POST /users
Host: https://motorshop-icql.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "juverson@kenzie.com",
	"password": "1234"
}
```

### Exemplo de Response:
```
200 ok
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlVXNlciI6InNlbGxlciIsImlhdCI6MTY3ODM2OTg0NSwiZXhwIjoxNjc4MzczNDQ1LCJzdWIiOiJmYTg2MWIzYi00N2Y4LTQwZTktOWZmOS1kOTljNjExYzZlNmQifQ.9dRns2n_SLaHMah-ijpDlLBsKn2WRXc_EAp3R3oZr_8",
	"id": "fa861b3b-47f8-40e9-9ff9-d99c611c6e6d",
	"typeUser": "seller",
	"name": "Juverson Lessa"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 403 Forbidden   | Dados inválidos |

---


### 1.3. **Mostrar dados do Usuário Logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/profile`

### Exemplo de Request:
```
GET /users/user
Host: https://motorshop-icql.onrender.com
Authorization: Barear token
Content-type: application/json
```

Usuário deve estar logado e passar o token no no Header.


### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "9794c20e-4715-44b1-a97e-0b3545cad0da",
	"name": "Fernando Henrique",
	"profileImage": null,
	"email": "fernando@kenzie.com",
	"cpf": "02898932167",
	"phone": "62981540735",
	"birthdate": "1993-11-11",
	"description": "Vendedor há mais de 10 anos de experiencia no mercado pronto para te atender",
	"typeUser": "seller",
	"createdAt": "2023-03-09T02:09:41.981Z",
	"updatedAt": "2023-03-09T02:09:41.981Z",
	"vehicles": [
		{
			"id": "e1f30185-f4ed-465b-973b-21f031423450",
			"type": "car",
			"adType": null,
			"title": "BMW M8",
			"description": "O BMW M8 é o veículo mais caro da marca alemã vendido no Brasil. Ele é também o veículo de topo da linha M com motor V8 4.4 bi-turbo de 625 cv e 76,5 kgfm de torque, gerenciado pela caixa automática de oito marchas e tração integral",
			"km": "20000",
			"year": 2022,
			"value": "198000",
			"imageGalery": {
				"id": "57ba2d16-788d-47a5-8923-2e0a649226f9",
				"photos": [
					{
						"id": "dbd7ef54-0bf8-493c-939c-edfdfc5426ab",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/f5tyrjhvwnqwfihetj1n",
						"public_id": "f5tyrjhvwnqwfihetj1n"
					}
				]
			}
		},
		{
			"id": "d726aa2f-1233-48a9-b9e5-a68d4cc99551",
			"type": "car",
			"adType": null,
			"title": "Renault Captur",
			"description": "O BMW M8 é o veículo mais caro da marca alemã vendido no Brasil. Ele é também o veículo de topo da linha M com motor V8 4.4 bi-turbo de 625 cv e 76,5 kgfm de torque, gerenciado pela caixa automática de oito marchas e tração integral",
			"km": "20000",
			"year": 2022,
			"value": "198000",
			"imageGalery": {
				"id": "5aba2ed0-fa86-4ee0-a986-89deb126bfa1",
				"photos": [
					{
						"id": "37040d1c-f3ee-4bf5-a316-cdfdc6390394",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/gt6gsia9sdx2gwyf7qtw",
						"public_id": "gt6gsia9sdx2gwyf7qtw"
					}
				]
			}
		},
		{
			"id": "c1ac5dfc-3707-45a1-855b-8fc48ebe208c",
			"type": "motorcycle",
			"adType": null,
			"title": "Fazer 150",
			"description": "A Yamaha Ys 150 Fazer 2022 é o modelo de moto ideal para quem busca unir a personalidade esportiva ao cotidiano da vida, a moto perfeita.",
			"km": "135000",
			"year": 2020,
			"value": "16000",
			"imageGalery": {
				"id": "d1957c08-2cf7-47e2-a610-9baa3fd08120",
				"photos": [
					{
						"id": "ee54936f-a1ea-4cea-bb22-4399c86e6dea",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/l7ybjncv89t3ckwsdqa9",
						"public_id": "l7ybjncv89t3ckwsdqa9"
					}
				]
			}
		},
		{
			"id": "f5cd0bf2-f2b9-4a44-be00-e75f0c498c0c",
			"type": "motorcycle",
			"adType": null,
			"title": "Nova CB 300F Twister 2023",
			"description": "Mais que evolução: aquela twistada. A nova CB 300F Twister 2023 está mais forte, estilosa, confortável e segura. Acesse e confira todas as novidades!",
			"km": "10000",
			"year": 2023,
			"value": "19800",
			"imageGalery": {
				"id": "d2c04b64-8b6b-4f44-bc0e-8dc6206a053b",
				"photos": [
					{
						"id": "3275bec4-f8f2-4784-9d43-f04e509a5c33",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/cg92oqjj6q3faqvfmjwu",
						"public_id": "cg92oqjj6q3faqvfmjwu"
					},
					{
						"id": "8a3cb621-f146-4aec-85f4-755ca5d0b5ef",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/ce3qmyqw0tvtoueafbqj",
						"public_id": "ce3qmyqw0tvtoueafbqj"
					},
					{
						"id": "4b647e8d-6c5d-4f91-b296-4293f591fbe0",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/g021cmkypg5zvgkiadci",
						"public_id": "g021cmkypg5zvgkiadci"
					}
				]
			}
		},
		{
			"id": "46c50b06-5abe-4a5d-b416-63e2eca4d538",
			"type": "car",
			"adType": null,
			"title": "Honda Civic 2023",
			"description": "O BMW M8 é o veículo mais caro da marca alemã vendido no Brasil. Ele é também o veículo de topo da linha M com motor V8 4.4 bi-turbo de 625 cv e 76,5 kgfm de torque, gerenciado pela caixa automática de oito marchas e tração integral",
			"km": "0",
			"year": 2023,
			"value": "145000",
			"imageGalery": {
				"id": "f0861304-5ca7-49ac-9e07-ffe841ba323c",
				"photos": [
					{
						"id": "092b3407-a3f7-4bba-b637-682f24dfbb93",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/zbthhlakybfqh40lk7nu",
						"public_id": "zbthhlakybfqh40lk7nu"
					},
					{
						"id": "24d6a8d7-05d8-44a9-ac2a-4384ea32ab0d",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/e9lxv2svntpjbaym7hvm",
						"public_id": "e9lxv2svntpjbaym7hvm"
					},
					{
						"id": "c14fa5a5-461c-4db1-a784-4c7f05d5e59c",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/vqehn1r4eah1mokhmjfh",
						"public_id": "vqehn1r4eah1mokhmjfh"
					},
					{
						"id": "342920da-3e7e-4e51-add6-f98b57c4fa59",
						"urlImage": "http://res.cloudinary.com/dkmsixizk/image/upload/wp5pwzlywabkle7fkvvz",
						"public_id": "wp5pwzlywabkle7fkvvz"
					}
				]
			}
		}
	],
	"address": {
		"id": "26e7ce99-3c55-480d-8a59-caf47fde7153",
		"cep": "74310375",
		"state": "Goias",
		"city": "Goiânia",
		"street": "Rua deu certo de novo",
		"number": "507",
		"complement": "minha casinha linda"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized  | Missing authorization token. |

---

### 1.4. **Atualização de Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/profile`

### Exemplo de Request:
```
PATCH /users/profile
Host: https://motorshop-icql.onrender.com
Authorization: Barear token
Content-type: application/json
```

Usuário deve estar logado e passar o token no no Header, só é possivel atualizar o próprio usuário.

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
	"fullName": "Joao Vitor",
	"telephone": "629815404335",
	"email": "joao@kenzie.com"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "48912294-dfd8-40b5-a1c7-670344e127f7",
	"fullName": "Joao Vitor",
	"email": "joao@kenzie.com",
	"telephone": "629815404335",
	"createdAt": "2023-02-02T22:24:45.163Z",
	"updatedAt": "2023-02-02T23:00:33.583Z",
	"contacts": []
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized  | Missing authorization token. |
| 401 Unauthorized  | Unauthorized |
| 400 Bad Request  | Invalid key, can only update name, telephone, email, password. |

---

### 1.6. **Deleção de Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:
```
GET /users/48912294-dfd8-40b5-a1c7-670344e127f7
Host: https://motorshop-icql.onrender.com
Authorization: Barear token
Content-type: application/json
```

Usuário deve estar logado e passar o token no no Header, só é possível deletar o próprio usuário.

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
204 No Content
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized  | Missing authorization token. |
| 401 Unauthorized  | Unauthorized |

---

## 2. **Contacts**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Contact é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| UUID         | string | Identificador único do contato                  |
| name       | string | O nome do contato.                              |
| email      | string | O e-mail do contato.                            |
| createdAt      | Date | Data da criação do contato   |
| updatedAt      | Date | Data de atualização do contato   |
user_id | string | FK

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /contacts     | Criação de um contato.
| GET      | /contacts    | Lista os contatos pertencentes ao usuario logado
| PATCH      | /contacts/:id     | Atualiza contato, usando o UUID como parametro.
| DELETE      | /contacts/:id     | Deleta um contato usando o UUID como parametro.

---

### 2.1. **Criação de um Contato**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /contacts
Host: https://motorshop-icql.onrender.com
Authorization: Barear token
Content-type: application/json
```

O usuário deve estar logado para criar um contato

### Corpo da Requisição:
```json
{
	"name": "Contato de Teste",
	"email": "email@teste.com",
	"telephone": "29389320"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "8ba4059c-c9b7-4a51-b9ed-a46c5aa3152b",
	"name": "Contato de Teste",
	"email": "email@teste.com",
	"telephone": "29389320",
	"createdAt": "2023-02-02T23:27:27.652Z",
	"updatedAt": "2023-02-02T23:27:27.652Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized  | Missing authorization token. |
| 401 Unauthorized  | Unauthorized |

---

### 2.2. **Listar Contatos do Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /contacts
Host: https://motorshop-icql.onrender.com
Authorization: Barear token
Content-type: application/json
```

O usuário deve estar logado para listar os seus contatos criados, e só pode listas os seus próprios contatos

### Corpo da Requisição:
```json
vazio
```

### Exemplo de Response:
```
200 Ok
```

```json
{
	"id": "8ba4059c-c9b7-4a51-b9ed-a46c5aa3152b",
	"name": "Contato de Teste",
	"email": "email@teste.com",
	"telephone": "29389320",
	"createdAt": "2023-02-02T23:27:27.652Z",
	"updatedAt": "2023-02-02T23:27:27.652Z"
},
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized  | Missing authorization token. |

---

### 2.3. **Atualizar um Contato**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:
```
POST /contacts/8ba4059c-c9b7-4a51-b9ed-a46c5aa3152b
Host: https://motorshop-icql.onrender.com
Authorization: Barear token
Content-type: application/json
```

O usuário deve estar logado para atualizar os seus contatos criados, e só pode atualizar os seus próprios contatos

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
{
	"name": "Pedro Henrique",
	"telephone": "62981547895",
	"email": "pedrohenrique@flamengo.com"
}
```

### Exemplo de Response:
```
200 Ok
```

```json
{
	"id": "8ba4059c-c9b7-4a51-b9ed-a46c5aa3152b",
	"name": "Pedro Henrique",
	"email": "pedrohenrique@flamengo.com",
	"telephone": "62981547895",
	"createdAt": "2023-02-02T23:27:27.652Z",
	"updatedAt": "2023-02-02T23:39:22.875Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized  | Missing authorization token. |
| 400 Bad Request | Invalid UUID, must be 36 characters|
| 400 Bad Request | Invalid key, can only update name, telephone, email|
| 404 Not Found | Contact not found |

---

### 2.4. **Deletar um Contato**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:
```
POST /contacts/8ba4059c-c9b7-4a51-b9ed-a46c5aa3152b
Host: https://motorshop-icql.onrender.com
Authorization: Barear token
Content-type: application/json
```

O usuário deve estar logado para deletar os seus contatos criados, e só pode deletar os seus próprios contatos

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id     | string      | Identificador único do usuário (User) |

### Corpo da Requisição:
```json
vazio
```

### Exemplo de Response:
```
204 No Content
```

```json
vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized  | Missing authorization token. |
| 400 Bad Request | Invalid UUID, must be 36 characters|
| 404 Not Found | Contact not found |

---
