# language: pt

@api @offices
Funcionalidade: Consulta de escritórios
  Como consumidor da API Mifos
  Quero consultar os escritórios cadastrados
  Para obter informações sobre as unidades disponíveis

  Cenário: CT001 - Consultar lista de escritórios
    Quando consulto a lista de escritórios
    Então a API deve retornar status 200
    E a resposta deve conter uma lista de escritórios
