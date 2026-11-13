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
    Quando consulto a reserva recém-criada
    Então os dados da reserva devem corresponder aos dados enviados