# language: pt

  @web @booking
  Funcionalidade: Consulta de Disponibilidade

    Como visitante da pousada
    Quero consultar a disponibilidade de quartos
    Para planejar minha hospedagem

  Cenario: Consultar disponibilidade para um período válido
    Dado que acesso a aplicação Restful Booker
    Quando informo a data de entrada "15/12/2026"
    E informo a data de saída "18/12/2026"
    E solicito a consulta de disponibilidade
    Então o sistema deve processar minha consulta