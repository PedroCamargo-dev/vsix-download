# VSIX Downloader

Aplicação web para baixar arquivos `.vsix` (Visual Studio Code Extensions) utilizando Next.js. Suporte para execução em ambiente de desenvolvimento e em container Docker.

## Requisitos

- Node.js e npm (para ambiente de desenvolvimento local)
- Docker e Docker Compose (para execução em container)

## Configuração e Execução

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e defina a variável `DOWNLOAD_PATH` para o caminho onde os arquivos `.vsix` serão baixados:

```dotenv
DOWNLOAD_PATH=public/downloads/vsix
```

### Executando em Ambiente de Desenvolvimento

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd nome-do-repositorio
npm install
```

Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

Acesse em http://localhost:3000.

### Executando com Docker Compose

Na configuração do docker-compose.yml, o volume `./vsix:/app/public/downloads/vsix` é utilizado para mapear o diretório local `./vsix` (do host) para o diretório `/app/public/downloads/vsix` dentro do container.

Essa configuração permite que os arquivos `.vsix` baixados pela aplicação sejam armazenados no diretório vsix no host e estejam acessíveis na aplicação.

#### Exemplo de Configuração

No `docker-compose.yml`, o volume é configurado da seguinte forma:

```yaml
volumes:
  - ./vsix:/app/public/downloads/vsix
```

`./vsix` é o caminho local (do host) onde os arquivos `.vsix` serão armazenados. Esse diretório deve existir na raiz do projeto. Se não existir, crie-o com o comando:

```bash
mkdir vsix
```

- A pasta `./vsix` no host, configurada no `docker-compose.yml`, pode ser qualquer diretório no sistema local. No entanto, para que a aplicação consiga salvar os arquivos `.vsix` sem erros, o diretório escolhido precisa ter permissões adequadas.

Para garantir que o diretório escolhido tem as permissões corretas, use o comando a seguir para definir permissões:

```bash
chmod -R 777 vsix
```

Após todas as configurações acima basta executar o comando:

```bash
docker compose up --build
```
