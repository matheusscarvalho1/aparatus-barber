- Ao enviar a busca no input de busca que esta em @app_components\search-input.tsx, leve o usuário para a página "/barbershop?search=value".

- Busque no banco de dados todas as barbearias que possuem SERVIÇOS com um nome que contenham o valor buscado pelo usuário.

- Use o componente @app_components\barbershop-item.tsx para listar as barbearias.

- Também renderize abaixo do input de busca os botões de busca rápida que estão em https://www.figma.com/design/GCvGz6IW2ND5G4qU2CaQZI/Aparatus-%7C-Alunos--Copy-?node-id=1-6114&t=Iv0iGSfs6pzDHJje-4. Ao clicar em um botão, leve o usuário para a página de busca daquele botão. Por exemplo, se eu em "Cabelo" quero buscar por "cabelo".

- Use os icones do lucid-react nos botões.

- Caso não haja barbearias encontradas, renderize uma mensagem dizendo isso.

- Armazene o valor do input em um state.
