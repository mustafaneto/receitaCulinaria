# Receitas Culinárias - Desafio A4PM

Este projeto faz parte do processo seletivo para a vaga de Desenvolvedor WEB (FullStack).

## Instalação

Siga estas etapas para configurar o projeto em sua máquina local.

### 1. Clone o repositório

```sh
git clone https://github.com/mustafaneto/receitaCulinaria.git
cd receitaCulinaria
```

### 2. Configurar o Backend

#### 2.1 Navegue até a pasta do backend:

```sh
cd backend
```

#### 2.2 Instale as dependências:

```sh
npm install
```

#### 2.3 Inicie o servidor:

```sh
npm start
```

### 3. Configurar o Frontend

#### 3.1 Abra um novo terminal e navegue até a pasta frontend:

```sh
cd frontend
```

#### 3.2 Instale as dependências:

```sh
npm install
```

#### 3.3 Inicie o servidor:

```sh
npm run dev
```

### 4. Configurações do Banco de Dados

#### 4.1 Execute o script SQL para criar as tabelas necessárias:

Execute o script do arquivo script.sql no MySQL

#### 4.2 Configure suas variáveis de ambiente no arquivo backend/.env 

Exemplos de variáveis:

```sh
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=teste_receitas_rg_sistemas
JWT_SECRET=segredo
```

#### Usuário padrão cadastrado

#### Login:

```sh
mustafa
```

#### Senha:

```sh
123
```
