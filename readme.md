<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0ABAB5&height=260&section=header&text=Automation&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Claudio%20Junior%20Tech&descAlignY=56&descAlign=50">
  <h1 align="center">Projeto de Automação de Testes Playwright</h1>
</p> 

<p align="center">
  <a href="#-produto">Produto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-objetivo">Objetivo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-estrutura">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-execução">Execução</a>
</p> 

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/-Playwright-7DADC1?style=for-the-badge&logo=playwright&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
  <img alt="License" src="https://img.shields.io/badge/-Allure%20Reports-FF8400?style=for-the-badge&logo=allure&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/-JUnit-25A162?style=for-the-badge&logo=junit&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/-DevContainer-0DB7ED?style=for-the-badge&logo=docker&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/-VSCode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white">
</p>

<p align = "center">
<b>:crossed_swords: Sauce Demo </b>
</p>

## 💻 Produto

<p>O site "https://www.saucedemo.com/" é um site de demonstração utilizado para fins de treinamento e prática de testes de software, especialmente para automação de testes. Este site é associado à empresa Sauce Labs, que oferece serviços de automação de testes em nuvem.</p>      

## 🎯 Objetivo

O projeto de automação tem como objetivo ajudar a executar muitos casos de testes de forma consistente e repetidamente
em diferentes ambientes, permitindo um melhor escalonamento dos casos de testes. Também é um objetivo a melhoria da
qualidade do software com um todo, pois testes automatizados proveem uma melhor cobertura quando se tratam de testes que
buscam validar se defeitos antigos e que já foram resolvidos não ressurgiram (testes de regressão).

## 🌌 Estrutura

Para organização do projeto o mesmo foi separado em diversas pastas para que ficassem distribuidas de acordo com suas
funções.

- ### **pw-ja-qa-e2e**
    - ***.devcontainer***
        - É usada para configurar ambientes de desenvolvimento remotos ou contêineres de desenvolvimento.
    - ***Reports***
        - Contém os arquivos de relatório gerados após a execução dos testes.
    - ***Testes***
        - Contém subpastas que possuem relacionamento direto com os testes a serem executados.
    - ***Testes/examples***
        - Contém arquivos em formato csv contendo massas de testes para exemplos de cenários.
    - ***Testes/pages***
        - Contém arquivos page seguindo a estrutura e padrão do page objects.
    - ***Testes/specs***
        - Contém os arquivos ".spec.js" onde são expecificados os cenários de testes
    - ***.env***
        - Contém dados a serem utilizados durante o teste.
    - ***ci.Dockerfile***
        - O arquivo Dockerfile é usado para definir e criar imagens Docker. As instruções descrevem como a imagem deve ser montada, incluindo quais dependências e configurações precisam ser incluídas.
    - ***package.json***
        - O arquivo package.json é um arquivo de manifesto. Ele desempenha um papel fundamental na gestão das dependências, configurações e scripts de um projeto.
    - ***playwright.config.js***
        -  É um arquivo de configuração usado com a biblioteca Playwright, ele permite que configurar diferentes aspectos da execução de testes ou tarefas de automação usando o Playwright.
    - ***removeReports.sh***
        - Contém instruções para remoção de arquivos de relatório do projeto.

## ⏩ Execução

- Clone o repositório
- Baixe o NodeJs
- Baixe o Java para visualizacao de reports
- Executar o comando ```npm install``` na raiz do projeto para instalar todas as dependencias
- Executar o comando ```npm test``` na raiz do projeto para executar todos os testes.
- Executar o comando ```allure serve reports/allure-results``` na raiz do projeto para abrir o report do Allure.
- Acessar HMTL do Playwright Report para visualização do report do Playwright.
