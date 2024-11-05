# 🚀 VSIX Download

Este projeto foi criado para resolver um problema comum encontrado no **code-server**: a dificuldade em instalar extensões `.vsix` de forma rápida e simples. Com o **VSIX Download**, você baixar extensões diretamente, facilitando o processo de instalação em ambientes como o code-server, onde o gerenciamento de extensões pode ser mais desafiador.

## 📋 Pré-requisitos

- **Node.js** e **npm** para execução em ambiente de desenvolvimento local.
- **Docker** e **Docker Compose** para execução em container Docker.

## ⚙️ Configuração e Execução

### 🌐 Variáveis de Ambiente

Para definir o diretório onde os arquivos `.vsix` serão armazenados, crie um arquivo `.env.local` na raiz do projeto e adicione a variável `DOWNLOAD_PATH`:

```dotenv
DOWNLOAD_PATH=public/downloads/vsix
```

### 💻 Executando em Ambiente de Desenvolvimento Local

1. Clone o repositório e instale as dependências:

   ```bash
   git clone https://github.com/PedroCamargo-dev/vsix-download.git
   cd vsix-download
   npm install
   ```

2. Inicie a aplicação em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

### 🐳 Executando com Docker Compose

Para rodar a aplicação em um container Docker, configure o `docker-compose.yml` para definir as variáveis de ambiente e mapear o diretório de downloads para o sistema de arquivos local.

#### 📝 Configuração no `docker-compose.yml`

No arquivo `docker-compose.yml`, configure as variáveis de ambiente e o volume conforme abaixo:

```yaml
services:
  app:
    build:
      context: .
    ports:
      - "3000:3000"
    environment:
      DOWNLOAD_PATH: /app/public/downloads/vsix
    volumes:
      - ./vsix:/app/public/downloads/vsix
```

- **`environment`**: Configura a variável `DOWNLOAD_PATH` para o diretório de downloads no container (`/app/public/downloads/vsix`).
- **`volumes`**: Mapeia o diretório local `./vsix` para o diretório `/app/public/downloads/vsix` no container, permitindo que os arquivos `.vsix` fiquem acessíveis no host.

#### 📁 Preparação do Diretório de Download

Verifique se o diretório `vsix` existe na raiz do projeto. Se não existir, crie-o:

```bash
mkdir vsix
```

Ajuste as permissões para permitir gravação:

```bash
chmod -R 777 vsix
```

#### ▶️ Executando com Docker Compose

Após configurar o arquivo `docker-compose.yml` e criar o diretório de download, inicie a aplicação com Docker Compose:

```bash
docker compose up --build
```
