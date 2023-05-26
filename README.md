
## Description

Controle de estoque backend - NestJS
## Installation

```bash
$ yarn
```

## MongoDB config

```json
# insert a new user in user collection
{
  "_id": {
    "$oid": "6428a3d154224b3ab444d4ca"
  },
  "nome": "teste 1",
  "username": "teste@teste.com",
  "password": "$2b$10$31fJzkv7PfY6IMZNex9lv.GPyx9eRLOQx2BHaaHg2gOqkBchnoAUO",
  "deleted": false,
  "createdAt": {
    "$date": {
      "$numberLong": "1680384977649"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1685122380443"
    }
  },
  "__v": 0,
  "permissoes": [
    "MEU_PERFIL",
    "ADMINISTRAR",
    "ENTRADA_SAIDA",
    "APH",
    "PROVISOES",
    "AQUATICO",
    "LIMPEZA",
    "UNIFORME",
    "DIVERSOS"
  ]
}
```

## Running the app

```bash
# development
$ yarn start:dev
```
