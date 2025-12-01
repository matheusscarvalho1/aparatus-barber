## Tarefa

Criar um sheet de cancelamento de reserva que é exibido quando o usuário clica no @app_components\booking-item.tsx.

A interface deve ser **EXATAMENTE** a que está no Figma em https://www.figma.com/design/GCvGz6IW2ND5G4qU2CaQZI/Aparatus-%7C-Alunos--Copy-?node-id=78-2076&t=rGk1fFDYOBlVTOvn-4.

Ao clicar no botão de "Cancelar Reserva" a reserva deve ser cancelada.

## Requisitos Técnicos

- Use o Sheet do shadcn/ui.
- Crie uma server action de cancelar a reserva chamada "cancel-booking" que recebe o ID da reserva e define booking.cancelled = true.
- Os dados exibidos nos Sheet devem ser os mesmos dados do agendamento clicado.
- A imagem do mapa está em @public\map.png.
- Status é confirmado se agendamento é no futuro e finalizado se é no passado.
- Reutilize o componente @app_components\phone-item.tsx para os números de telefone.
