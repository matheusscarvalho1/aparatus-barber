## Tarefas

- No componente app_components\service-item.tsx , ao clicar em "Reservar" abra o sheet que está em https://www.figma.com/design/GCvGz6IW2ND5G4qU2CaQZI/Aparatus-%7C-Alunos--Copy-?node-id=78-1818&t=xh9b0KXO9hinrddX-4 usando o componente Sheet do shadcn.

- Use o componente Calendar do shadcn para renderizar o calendário.

- Ao clicar em um dia do calandário, exiba horários fixos (das 09h às 16h, de meia em meia hora. Exemplos: 09:00, 09:30, 10:00)

- Ao clicar no horário, exiba as informações do:
- Nome e preço do serviço (dividido por 100, em reais innteiros, não em centavos)
- Data selecionada no calendário
- Horário selecionado
- Nome da barbearia

Ao clicar no botão de 'x' feche o sheet.
Habilite o botão de confirmar APENAS quando o dia e horário estiverem sido selecionados.

## Requisitos técnicos

- Armazene o dia selecionado como Date em um state.
- Armazene o horário selecionado como string em um state (por exemplo: "09:00").
- Receba como prop o serviço que está agendado e sua barbearia.
