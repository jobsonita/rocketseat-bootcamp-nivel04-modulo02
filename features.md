- RF: Requisitos Funcionais
- RNF: Requisitos Não Funcionais
- RN: Regras de negócio

# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail; :heavy_check_mark:
- O usuário deve receber um e-mail com instruções de recuperação de senha; :heavy_check_mark:
- O usuário deve poder resetar sua senha; :heavy_check_mark:

**RNF**

- Utilizar <s>Mailtrap</s> Nodemailer com Ethereal Email para testar envios em ambiente de desenvolvimento; :heavy_check_mark:
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para resetar senha deve expirar em 2h; :heavy_check_mark:
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder alterar dados do seu perfil; :heavy_check_mark:

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado; :heavy_check_mark:
- Para atualizar sua senha, o usuário deve informar a senha antiga; :heavy_check_mark:
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados; :heavy_check_mark:
- O usuário deve poder listar os dias com horários disponíveis na agenda do prestador; :heavy_check_mark:
- O usuário deve poder listar horários disponíveis em um dia específico na agenda do prestador; :heavy_check_mark:
- O usuário deve poder realizar um novo agendamento com um prestador; :heavy_check_mark:

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente; :heavy_check_mark:
- Os agendamentos devem estar disponíveis entre 8h e 18h (Primeiro às 8h, último às 17h); :heavy_check_mark:
- O usuário não pode agendar em um horário já ocupado; :heavy_check_mark:
- O usuário não pode agendar em um horário que já passou; :heavy_check_mark:
- O usuário não pode agendar serviços consigo mesmo; :heavy_check_mark:
