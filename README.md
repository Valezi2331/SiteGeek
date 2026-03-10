Aqui está um guia técnico completo do projeto **SiteGeek** para seus estudos e futuras manutenções. Este resumo detalha cada peça do quebra-cabeça que você montou no seu Zorin OS.

---

### 1. Stack Tecnológica (A Base)

* **Linguagem:** JavaScript (Padrão **ES Modules**, usando `import` e `export`).
* **Ambiente de Execução:** Node.js (Backend) e Navegador (Frontend).
* **Banco de Dados:** SQLite (Banco de dados em arquivo, leve e eficiente).
* **Sistema Operacional:** Linux (Zorin OS).

---

### 2. Frameworks e Bibliotecas (O "Mastigado")

#### **No Frontend (Pasta `client`)**

* **React (via Vite):** Framework para criar a interface. O React cuida da sincronização entre o que o usuário digita e o que o código processa.
* *Conceito Chave:* **useState** (usado para criar "memória" temporária nos campos Valor e Descrição antes de enviar).


* **Axios:** É o seu "estafeta" ou "correio". Ele pega os dados que estão no React e faz uma viagem até o servidor (Backend) para entregá-los. Sem o Axios, o site ficaria isolado.

#### **No Backend (Pasta `server`)**

* **Express:** O framework que transforma o Node.js em um servidor web. Ele fica "ouvindo" as chamadas que o Axios faz.
* **CORS:** Esta é a biblioteca de segurança (o "porteiro"). Por padrão, navegadores bloqueiam um site (porta 5173) de falar com uma API (porta 3001). O CORS diz: *"Pode deixar o React entrar, eu conheço ele"*.
* **SQLite3 & SQLite:** * `sqlite3` é o driver (o motor que mexe no arquivo).
* `sqlite` (com `open`) é uma ferramenta que permite usar o banco de dados com comandos modernos (`async/await`), deixando o código mais limpo.



---

### 3. Comandos para Ligar o Sistema

Para que o projeto funcione, três "motores" precisam rodar simultaneamente em terminais separados:

1. **O Backend (O Cérebro):**
* Terminal na pasta `SiteGeek/server`:
* Comando: `node index.js`
* *Escutando na porta:* **3001**


2. **O Frontend (A Interface):**
* Terminal na pasta `SiteGeek/client`:
* Comando: `npm run dev`
* *Escutando na porta:* **5173**


3. **O Grafana (Os Gráficos):**
* Rodando como serviço no sistema.
* *Acesso pelo navegador:* `localhost:3000`



---

### 4. O Fluxo do Dado (Caminho que a informação percorre)

1. **Input:** Você digita o valor no formulário React.
2. **Envio:** O **Axios** dispara um comando `POST` para `http://localhost:3001/salvar`.
3. **Recepção:** O **Express** recebe o pacote e o **CORS** autoriza.
4. **Gravação:** O Node executa um comando SQL (`INSERT INTO`) e salva o dado no arquivo `/var/lib/sqlite_data/database.sqlite`.
5. **Visualização:** O **Grafana** lê esse mesmo arquivo via SQL e atualiza o gráfico.

---

### 5. Detalhes para Manutenção e Estudo

* **Conflito de Portas:** O Grafana ocupa a porta 3000 por padrão. Por isso, seu servidor Node deve sempre rodar em uma porta diferente, como a **3001**.
* **CORS:** Se o site disser "Erro ao conectar" e o servidor estiver ligado, verifique se a linha `app.use(cors())` está presente no `index.js`.
* **Permissões no Linux:** O arquivo do banco de dados foi movido para `/var/lib/sqlite_data/` para que o Grafana tivesse permissão total de leitura. Se você formatar o PC ou mudar de pasta, precisará dar permissão de escrita de novo (`chmod`).
* **Query SQL no Grafana:** Para o gráfico de tempo funcionar, a coluna de data precisa ser convertida de texto para tempo real usando: `strftime('%s', timestamp) AS time`.

---

### 6. Comandos de Instalação (Caso precise refazer do zero)

```bash
# No Server
npm install express cors sqlite3 sqlite

# No Client
npm install axios

```

Este sistema é um exemplo real de **Arquitetura de Microserviços** simplificada. Você tem uma camada de apresentação (React), uma camada de lógica de negócios (Node) e uma camada de dados (SQLite/Grafana).
