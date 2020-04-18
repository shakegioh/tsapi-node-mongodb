# TSAPI Node Mongodb

Boilerplate para API em node/typescript com banco de dados Mongodb rodando em docker-compose.

## Quickstart

Primeiramente crie um arquivo `.env` na raiz do repositório, copie os dados do arquivo `.env.example` e, se você quiser, pode editar o .env que você criou.

Os comandos a seguir devem ser executados assim que você clonar o repositório.

```bash
yarn install
yarn local
yarn logs
```

### Desinstalar do seu ambiente local

Remove os containers docker e volumes do docker-compose. Por enquanto só tem isso, então não vai influenciar em nada o seu setup.

```bash
yarn local:uninstall
```

## TODO

Contribuições são bem vindas!

- Ao rodar o docker localmente, dá problema para conectar no banco de dados, pois o container ainda não foi iniciado, tem que ter uma forma de esperar até o banco subir antes de tentar conectar, algo tipo "wait-for-it".
- Criar build para produção
