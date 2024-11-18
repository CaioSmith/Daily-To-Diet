# Regras da Aplicação

### Funcionalidades

- [x] **Criação de Usuário**
  - Deve ser possível criar um novo usuário.

- [x] **Identificação do Usuário**
  - O sistema deve ser capaz de identificar o usuário entre as requisições.

- [x] **Registro de Refeição**
  - Deve ser possível registrar uma refeição com as seguintes informações:
    - [X] Nome
    - [X] Descrição
    - [X] Data e Hora
    - [X] Status da Dieta (dentro ou fora da dieta)
  - [X] As refeições devem ser relacionadas a um usuário (ou seja, cada refeição pertence a um usuário específico).

- [ ] **Edição de Refeição**
  - Deve ser possível editar uma refeição, podendo alterar todos os dados acima (nome, descrição, data, hora, e status da dieta).

- [ ] **Exclusão de Refeição**
  - Deve ser possível apagar uma refeição registrada.

- [ ] **Listagem de Refeições**
  - Deve ser possível listar todas as refeições de um usuário.

- [ ] **Visualização de Refeição Única**
  - Deve ser possível visualizar os detalhes de uma refeição específica.

- [ ] **Métricas do Usuário**
  - O sistema deve fornecer as seguintes métricas do usuário:
    - [ ] Quantidade total de refeições registradas
    - [ ] Quantidade total de refeições dentro da dieta
    - [ ] Quantidade total de refeições fora da dieta
    - [ ] Melhor sequência de refeições dentro da dieta (a maior sequência de refeições consecutivas dentro da dieta).

- [X] **Autenticação e Autorização**
  - O usuário **somente pode visualizar, editar ou apagar** as refeições que ele mesmo criou.
