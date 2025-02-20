O desafio da materia seria o seguinte:

    Teclado Virtual para Sites 
 
     Você já deve ter visto o seguinte tipo de teclado: O usuário tem sempre a escolha de botões para escolher a ordem dos dígitos da senha de acesso. Como temos duas possibilidades em cada botão, fica mais difícil alguém que esteja “olhando por cima do ombro” ver a combinação de dígitos. Para uma senha de 6 dígitos, demos 26 = 64 possibilidades de “adivinhação” de senha. Como os sites normalmente bloqueiam a conta na terceira tentativa errada de digitação, a segurança é bastante elevada. O objetivo deste desafio é: 
     • Discutir na equipe (e documentar) a abordagem que será feita, com explicação dos motivos de ter sido escolhida a abordagem pela equipe. 
     • Implementar um frontend básico para apresentação dos dados e clique nos botões; 
     • Implementar um BD MySQL para armazenamento dos dados dos usuários (não é necessário um CRUD de usuários) 
     • Ao abrir a tela com o teclado, a página deve solicitar ao servidor um ID de sessão, que deverá ter codificado em seu interior os pares de teclas e a ordem em que devem ser apresentadas na tela (desta forma, sempre teremos um teclado diferente – tanto em pares como em ordem de apresentação). 
     • A forma de envio destas informações para “montagem” do frontend deve ser definida pela equipe e documentada para validação futura. A equipe deve tomar cuidado para que os dados não sejam interceptados e interpretados facilmente (texto puro). 
     • O frontend deve interpretar estes dados, apresentar na tela os botões na ordem correta (com os pares de números corretos), e deve enviar a ordem dos botões clicados para validação no servidor. 
     • Ao submeter os dados ao servidor, o ID de sessão deve ser inativado após a validação dos dados (estando corretos ou não, deve ser apresentado um novo teclado), e o ID de sessão não deve ser apresentado em sessões consecutivas (garantir que esse intervalo seja de pelo menos 1000 sessões). 
     • Implementar a lógica para validação da senha no backend. Deve ser validado se o ID de sessão não foi marcado como “inativado” para evitar possíveis ataques. 
     • Deve-se observar a otimização da lógica, para diminuir o máximo possível as interações cliente-servidor e consultas ao Banco de Dados. A equipe deverá apresentar: 

     1) O front end criado no framework de sua preferência 
     2) O backend criado no framework/linguagem de sua preferência 
     3) A estrutura do banco de dados (o tipo do banco de dados é de sua escolha, não precisa obrigatoriamente ser relacional) 
     4) Testes de software que garantam o correto funcionamento do sistema 
     5) Uma apresentação (PowerPoint) para apresentação no seminário. 
     
     Forma de avaliação: Os alunos avaliarão a implementação de seus colegas, dando notas para tópicos que serão definidos em sala de aula. 
     Para evitar distorções, a maior nota (ou maiores, em caso de existir mais de uma igual – exemplo: todos os alunos dão nota 10) e a menor nota (ou mais de uma, caso existir mais de uma igual – exemplo: todos os alunos dão nota 5) serão descartadas, e a média será feita com as notas restantes, incluindo a do professor. 
     Caso todas as notas dos alunos sejam descartadas, a nota do professor é a que será atribuída ao grupo. 
     Técnicas avançadas de programação abordadas neste exercício: Criptografia de Dados (encryption): A equipe precisa garantir que os dados trocados entre o frontend e o backend não sejam facilmente interceptados e compreendidos (por exemplo, usando AES ou RSA para a codificação do ID de sessão). 
     Autenticação e Autorização Segura: O sistema deve garantir que o ID de sessão não possa ser reutilizado ou interceptado por terceiros. Utilização de técnicas para autenticação e garantir que cada sessão tenha um tempo de vida limitado selected.