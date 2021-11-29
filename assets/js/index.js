// Variavel para o controle de atualização ao confirmar produtos (Gatilho 5 interações -> Ignorar ou Confirmar).
var contador = 0;      

// Variavel que é carregada com a quantidade de produtos com imagem já cadastradas.
var confirmados = 0;

// Array para controlar os produtos já adicionados (vindos da requisição), evita repetidos.
var listaProdutos = []; 

// Cabeçalho da requisição.
const local   = 'http://localhost/api/v2/validaImagens/v1.00';
const homolog = 'https://api-homologacao.vrconnect.com.br/v2/validaImagens/v1.00'
const token   = 'so6GOYrt6RVZbS5HgGio7QFwebZZ8ejZFg094WxGnaC7BFxTJtFWjetqkROXYyS854A4AMBBv80AgeiAOe9Y6A6ZYzy1bf4nJtlg';
const headers = {   
    headers: {
        "Authorization" : `Bearer ${token}`,
        "loja": 460
    }
} 

// Função para obter imagem do produto no estaticos.nweb e criar imagens selecionaveis no CARD.
async function getImgCardProdutos(nome, idProduto) {
    let url = `${homolog}/gerenciaImagensSugestivas?nome_produto=${nome}`;
    let imgProdutos = ""; // variavél que concatena o retorno.
    
    await axios.get(url, headers)
    .then((response) => {
        let imagens = response.data.return // obtendo valores da requisição
        imagens.forEach(imagem => {
            let id = Math.floor(Math.random() * (1000000 + 1) + 1); // Para criar a referencia com o input:radio e a label no ID do elemento
            imgProdutos += `<input class="image-radio" type="radio" value=${imagem.id_imagem} name="produto${idProduto}" id="prod${(id)}"><label for="prod${(id)}"> <img class="chk_image" src="https://estaticos.nweb.com.br/imgs/nprodutos/t-${imagem.id_imagem}.jpg"></label>`
        })
    })
    .catch((err) => {
        console.log("Erro ao buscar Imagem")
    })

    return imgProdutos;
}

// Função responsável pela carga inicial de Produtos e/ou Atualização a cada 5 interações
// Aqui será criado toda a estrutura dos Cards de produtos.
async function carregamentoInicial() {
    let url = `${homolog}/listaProdutosNaoValidados`;
    await axios.get(url, headers)
    .then((response) => {
        let produtos = response.data.return;

        // Esconder Loading
        $(".loader").css("display", "none");

        // Atualizando as variáveis de  e Total.
        confirmados = produtos[0].confirmados;
        $("#t_confirmados").html(`${confirmados}  `);
        $("#t_produtos").html(` ${produtos[0].total}`);
        
        // Preenchendo a div Dinamicamente
        produtos.forEach( async function (produto) {

            if(listaProdutos.indexOf(produto.nome_sugestivo) === -1) {
                listaProdutos.push(produto.nome_sugestivo);
                let nome_produto = produto.nome_sugestivo.replace(/\s/g, '');
                let imagens =  await getImgCardProdutos(produto.nome_sugestivo.replace(/\s/g, '-'), produto.id_produto);
    
                $("#dinamic_div").append(`        
                    <div class="container carrosel_img" id="card_${produto.id_produto}">
                        <h5 class="prod_info">
                            <span>&#11088; </span>
                            <span>${produto.nome_sugestivo} </span>
                            <span>&#11088; </span>
                        </h5> 

                        
                        <div class="horizontal_slide">
                            ${imagens ? imagens : "<p>Houve um erro ao trazer as imagens!</p>"}
                        </div>
    
    
                        <div class="container_btn_group">
                            <button type="button" class="btn btn-danger"  title="Ignorar a escolha deste produto" onclick=\"confirmaAlteracao(${produto.id_produto}, ${false})\">Ignorar</button>
                            <button type="button" class="btn btn-primary" title="Resetar a seleção de escolha da imagem do produto" onclick=resetRadio(${produto.id_produto})>Resetar Selecionado</button>
                            <button type="button" class="btn btn-success" title="Confirmar escolha da imagem" onclick=\"confirmaAlteracao(${produto.id_produto})\">Confirmar</button>
                        </div>
                    </div>`
                );
    
            }
        });

    })
    .catch((err) => {
        $(".loader").html("<p>Houve um erro na requisição...</p>");
    })
}

// Função que irá realizar a atualização ao clicar no Botão 'Ignorar' ou 'Confirmar'
async function confirmaAlteracao(id, confirmar = true) {
    let url = `${homolog}/gerenciaImagensSugestivas`;
    
    if (confirmar) {
        let imagens = $(`input[name=produto${id}]`);
    
        for (let i = 0, l = imagens.length; i < l; i++)
        {
            if (imagens[i].checked)
            {
                await axios.patch(url, {"acao": "valida", "id_img": imagens[i].value, "id_produto":id}, headers)
                .then((response) => {
                    
                    // Animação
                    $('#card_'+id).css("border-color", "green");
                    $('#card_'+id).hide("slide", {direction: "right"}, 400);
                    
                    confirmados++
                    // Atualizando o valor do contador de atualizados (Sempre)
                    $("#t_confirmados").html(`${confirmados}  `);
                    
                    // Exclui o elemento do HTML após 1 segundo
                    setTimeout(function(){
                        $('#card_'+id).remove();
                    }, 3000);
    
                    contador++;

                    // Após 5 confirmações com sucesso, trazer mais produtos
                    if (contador % 5 == 0) 
                        carregamentoInicial();
                    
                })
                .catch((err) => {
                    console.log("Erro")
                })
    
                return;
            }
        }

        $("#card_"+id).addClass("error");

        alert("É preciso selecionar ao menos uma imagem para Confirmar!");

        setTimeout(function(){
            $("#card_"+id).removeClass("error");
        }, 1500);
        
    }
    else {
        await axios.patch(url, {"acao": "ignorar", "id_img": -1, "id_produto":id}, headers)
        .then((response) => {
            // Animação
            $('#card_'+id).hide("slide", {direction: "left"}, 400);
            $('#card_'+id).css("border-color", "red");

            confirmados++
            // Atualizando o valor do contador de atualizados (Sempre)
            $("#t_confirmados").html(`${confirmados}  `);

            // Exclui o elemento do HTML após 1 segundo
            setTimeout(function(){
                $('#card_'+id).remove();
            }, 3000);
            
            contador++;
            // Após 5 confirmações com sucesso, trazer mais produtos
            if (contador % 5 == 0) 
                carregamentoInicial();
            
        })
        .catch((err) => {
            alert("Erro")
        })
    }
}

// Move para o topo da página
function scrollToToporBot(direcao){
    if(direcao === 'top')
        window.scrollTo(0, 0);
    else
        window.scrollTo(0, 1000000);
}

// Tratativa para check = false nos campos input:radio
function resetRadio(id) {
    let imagens = $(`input[name=produto${id}]`);
    for (var i = 0, l = imagens.length; i < l; i++)
    {
        if (imagens[i].checked)
        {
            imagens[i].checked = false;
        }
    }
}

function closeImg(){
    $(".show_img").css("display", "none");
}

function hideShowInfo() {
    let situacao = $(".desc_help_img").css("display");

    if (situacao == "block") 
        $(".desc_help_img").css("display", "none");
    else 
        $(".desc_help_img").css("display", "block");
}

// Ao abrir a página é chamado
window.onload = function() {
    // Traz as imagens
    carregamentoInicial();

    // Efeito show div imagem
    $(document).on({
        dblclick: function () {
            // Ao entrar
            let src_imagem = $(this).attr('src').replace("t-", "") 
            $("#load_img").attr("src", src_imagem);
            $(".show_img").css("display", "flex");
    
        }
    }, ".chk_image"); 
    
    // Precionar ESC vai fechar a DIV da imagem
    $(document).keydown(function(e) {
        if(e.keyCode === 27) {
            $(".show_img").css("display", "none");
        }
    });
}
