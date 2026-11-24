# language: pt

@api @availability
Funcionalidade: Consulta de disponibilidade via API

  Como consumidor da API Restful Booker
  Quero consultar os quartos disponíveis
  Para obter informações sobre as opções de hospedagem

  Cenário: CT001 - Consultar quartos disponíveis para um período válido
    Quando consulto a disponibilidade pela API entre "2026-12-15" e "2026-12-18"
    Então a API deve retornar o status HTTP 200
    E a resposta deve conter uma lista de quartos disponíveis
    E os dados dos quartos devem possuir uma estrutura válida

  @known-defect
  Cenário: CT002 - API deve rejeitar período com data de entrada posterior à saída
    Quando consulto a disponibilidade pela API entre "2026-12-18" e "2026-12-15"
    Então a API deveria rejeitar a consulta com status HTTP 400

  @known-defect @unstable
  Cenário: CT003 - API deve tratar formato de data inválido
    Quando consulto a disponibilidade pela API entre "15/12/2026" e "18/12/2026"
    Então a API deveria rejeitar a consulta com status HTTP 400