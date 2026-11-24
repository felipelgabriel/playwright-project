# language: pt

@api @authentication
Funcionalidade: Autenticação na API

  Como consumidor da API Restful Booker
  Quero realizar autenticação
  Para acessar operações protegidas

  Cenario: CT001 - Autenticar usuário com credenciais  válidas
    Quando realizo a autenticação na API com usuário "admin" e senha "password"
    Então a API deve autenticar o usuário com sucesso