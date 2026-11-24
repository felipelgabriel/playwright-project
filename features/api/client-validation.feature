# language: pt

@api @booking
Funcionalidade: Gerenciamento de reservas

  Como consumidor da API Restful Booker
  Quero criar uma reserva
  Para registrar a hospedagem de um visitante

  Cenario: CT001 - Criar uma reserva com dados válidos
    Quando realizo a autenticação na API com usuário "admin" e senha "password"
    Então a API deve autenticar o usuário com sucesso
    Quando envio os dados de uma nova reserva
    Então a API deve criar a reserva com sucesso
    Quando consulto as reservas do quarto recém-utilizado
    Então os dados da reserva devem corresponder aos dados enviados

  @known-defect
  Cenário: CT002 - Consultar individualmente uma reserva pelo ID
    Quando realizo a autenticação na API com usuário "admin" e senha "password"
    Então a API deve autenticar o usuário com sucesso
    Quando envio os dados de uma nova reserva
    Então a API deve criar a reserva com sucesso
    Quando consulto individualmente a reserva recém-criada
    Então a consulta individual deve retornar HTTP 200

  @api @booking @update @known-defect
  Cenário: Atualizar os dados de uma reserva existente
    Quando realizo a autenticação na API com usuário "admin" e senha "password"
    Então a API deve autenticar o usuário com sucesso
    Quando envio os dados de uma nova reserva
    Então a API deve criar a reserva com sucesso
    Quando atualizo os dados da reserva recém-criada
    Então a API deve atualizar a reserva com sucesso
    Quando consulto as reservas do quarto recém-utilizado
    Então os dados atualizados devem corresponder aos dados enviados

  @api @booking @delete
  Cenário: Excluir uma reserva existente
    Quando realizo a autenticação na API com usuário "admin" e senha "password"
    Então a API deve autenticar o usuário com sucesso
    Quando envio os dados de uma nova reserva
    Então a API deve criar a reserva com sucesso
    Quando excluo a reserva recém-criada
    Então a API deve excluir a reserva com sucesso
    Quando consulto as reservas do quarto recém-utilizado
    Então a reserva excluída não deve existir na listagem