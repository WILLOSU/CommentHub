Posts = {

    add : () =>{

        var t ={};
        t.content = $("#content").val();
        t.firstname = $("#firstname").val();
        t.lastname = $("#lastname").val();
    
        $.ajax({
            type: 'POST',
            url: '/post',
            data: t,
            dataType: 'json',
            success: Posts.template,
         })

        return false;


    },
    
    template: (data) => {
        console.log(data); 

       var comment = $('<div></div>')
            .attr('id', 'comment-' + data.id)
            .attr('class', 'comment');

       var content =  $('<textarea></textarea>')
            .attr('class', 'content')
            .attr('disabled', true)
            .html(data.content);

       var user = $('<p></p>').attr('class', 'user');
       if(data.user){
        user.html('Por ' + data.user.firstname + " " + data.user.lastname);
    }else{
        user.html('Por ' + $("select[name='users'] option:selected").text());
    }
    
    
            

       var dtCreation = new Date(data.createdAt);
        dtCreation = (dtCreation.getDate() < 10 ? "0" + dtCreation.getDate() : dtCreation.getDate()) +
            "/" + ((dtCreation.getMonth() + 1) < 10 ? "0" + (dtCreation.getMonth() + 1) : (dtCreation.getMonth() + 1)) +
            "/" + dtCreation.getFullYear();

        var date = $('<span></span>')
            .attr('class', 'date')
            .html(dtCreation);
            
            var btnEdit = $('<button></button>').attr('class', 'edit').html('Editar').css('margin-right', '10px');
            var btnSave = $('<button></button>').attr('class', 'save hidden').html('Salvar').css('margin-right', '10px');
            var btnRemove = $('<button></button>').attr('class', 'remove').html('Remover');
                   
        
        $(btnEdit).on('click', (event) =>{
            Posts.enableEdit(event.target);
        });
        
        $(btnSave).on('click', (event) =>{
            Posts.update(event.target);
        });

        $(btnRemove).on('click', (event) =>{
            Posts.remove(event.target);
        });

        $(user).append(date);

        $(comment).append(content);
        $(comment).append(user);
        $(comment).append(btnEdit);
        $(comment).append(btnSave);
        $(comment).append(btnRemove);

        $("#comments").append(comment);


       
    },

    findAll : () => {

        $.ajax({
            type : "GET",
            url : '/post',
            data : {content : $("#content-search").val()},
            success : (data) =>{ // vou varrer, retornar um vetor com vários posts e para cada post eu chamo um métodos template
                $("#comments").empty(); // limpando a div
                for(var post of data){
                    Posts.template(post);
                }

                /*
                    Para chamar o método precisamos que a página (index.html )esteja toda carregada, para chamar o método findAll, vou usar o método do objeto
                    BOM , do browser da jqery que é o Red, quando utilizado quer dizer que
                    que o meu DOM já foi todo carregado!!
                
                */


            },
            error : () => {
                console.log("Ocorreu um erro!");
            },
            dataType : 'json'
        })
    },

    enableEdit : (button) =>{

        var comment = $(button).parent();

        $(comment).children('textarea').prop('disabled', false); // habilita
        $(comment).children('button.edit').hide(); // hide ocultar
        $(comment).children('button.save').show(); // show reesibir

    },

    update : (button) => {
        var comment = $(button).parent();

        var id = $(comment).attr('id').replace('comment-', '');
        var content = $(comment).children('textarea').val();

        $.ajax({
            type : "PUT",
            url : '/post',
            data : {'content' : content, 'id' : id},
            success : (data) =>{ 
                $(comment).children('textarea').prop('disabled', true); // desabilita
                $(comment).children('button.edit').show(); // show reesibir       
                $(comment).children('button.save').hide();  // hide ocultar               

               
            },
            error : () => {
                console.log("Ocorreu um erro!");
            },
            dataType : 'json'
        })
    },

    remove : (button) => {
        var comment = $(button).parent();

        var id = $(comment).attr('id').replace('comment-', '');
       
        $.ajax({
            type : "DELETE",
            url : '/post',
            data : {'id' : id},
            success : (data) =>{ 
               $(comment).remove();
            },
            error : () => {
                console.log("Ocorreu um erro!");
            },
            dataType : 'json'
        })

    }




    }

    User = {
        findAll: () => {
            $.ajax({
                type: "GET",
                url: "/usuarios",
                success: User.loadAll,
                dataType: "json"
            })
        },
    
        loadAll: (data) => {
            var userCombo = $('select[name="users"]'); // Corrigindo o seletor
    
            userCombo.empty(); // Limpa o select antes de adicionar novos usuários
    
            for (let user of data) {
                userCombo.append(
                    $('<option></option>')
                        .attr('value', user.id)
                        .html(user.firstname + ' ' + user.lastname)
                );
            }
        }
    }
    


$(document).ready(() =>{ // posso chamar com segurança que eu não vou ter um retorno undefined
   User.findAll(); 
   Posts.findAll(); // função ready recebe como parametro um função de callback (findAll)
                // então quando minha página acabar de carregar (ready) essa função executa
});