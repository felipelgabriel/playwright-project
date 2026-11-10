# language: pt

  @web @smoke
  Funcionalidade: Acesso à página inicial

    Como visitante da pousada
    Quero acessar a página inicial
    Para conhecer os serviços oferecidos

  Cenario: Acessar a página inicial com sucesso
    Dado que acesso a aplicação Restful Booker
    Então a página inicial deve ser carregada corretamente