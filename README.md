# paypalsandbox-playwright

# COMANDOS:
- `yarn playwright test` --> para rodar o teste: acessa a pasta do projeto (a dica é fazer pelo terminal do gitbash) e da o comando `yarn playwright test`

- `yarn playwright test --headed` --> para rodar sem ser no modo headless, ou seja, nesse caso a tela aparece

- `yarn playwright test --debug` --> para rodar no modo debug - vai step by step
- `yarn playwright test tasks --debug` --> em que "tasks" é o nome da suite de teste que quer rodar

# Instalação/Pré Condição:

## Instalar o Node versão 18
- https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi

## Configurar o Yarn:
- no cmd:
    - `corepack enable` - para habilitar as features adicionais do node que vêm por padrão desligadas
    - `yarn --version` - só pra conferir que o yarn ta instalado

## Instalação do Playwright
- [Documentação do Playwright](https://playwright.dev/docs/intro)
- Execute o seguinte comando dentro da pasta do seu projeto: `yarn create playwright`

# dependências:
## Faker:
- `npm install faker`
- `yarn add faker`
### 