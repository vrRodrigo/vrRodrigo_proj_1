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

var pagina = 1; // Variavel que controla as páginas

// Move para o topo da página
function scrollToToporBot(direcao){
    if(direcao === 'top')
        window.scrollTo(0, 0);
    else
        window.scrollTo(0, 1000000);
}

function realizaBuscaPorNome() {

    let opcaoFiltro = getFiltroSelecionado();

    switch (opcaoFiltro) {
        case "todos": 
            carregamentoInicialRevisao(true, 1, true);
        break;

        case "ignorados":
            carregamentoInicialRevisao(false, 0, true);
        break;

        case "confirmados":
            carregamentoInicialRevisao(false, 1, true);
        break;
    }

}

function retornaURLBuscaValidadosIgnorados(todos, filtro, nome=""){
    if (todos)
        return `listaProdutoPesquisa?pagina=${pagina}&busca_todos=1&filtro_validar=1${nome != "" ? '&produto_busca='+nome : ""}`; // filtro_validar neste caso é ignorado
    else {
        switch(filtro) {
            case 0: // Somente Ignorados
                return `listaProdutoPesquisa?pagina=${pagina}&busca_todos=0&filtro_validar=0${nome != "" ? '&produto_busca='+nome : ""}`;

            case 1: // Somente Confirmados
                return `listaProdutoPesquisa?pagina=${pagina}&busca_todos=0&filtro_validar=1${nome != "" ? '&produto_busca='+nome : ""}`;
        }
    }
}

async function voltarParaAnalise(idProduto, situacaoProduto) {
    let url = `${homolog}/voltaParaAnalise`;

    await axios.patch(url, {"id_produto": idProduto}, headers)
    .then((response) => {

        // Atualizando os valores valores
        $("#revisao_total").html(parseInt($("#revisao_total").html()) - 1);

        if (situacaoProduto) 
            $("#revisao_confirmados").html(parseInt($("#revisao_confirmados").html()) - 1); // Situacao estava como confirmado
        else 
            $("#revisao_ignorados").html(parseInt($("#revisao_ignorados").html()) - 1);     // Situacao estava como ignorado

        // Sumir com a div Dinamicamente
        $('#card_'+idProduto).css("border-color", "#F00");
        $('#card_'+idProduto).hide("slide", {direction: "left"}, 400);
        
        // Exclui o elemento do HTML após 1 segundo
        setTimeout(function(){
            $('#card_'+idProduto).remove();
        }, 3000);

    })
    .catch((err) => {
        alert("Houve um erro na requisição!");
    })
}   

async function carregamentoInicialRevisao(todos = true, filtro = 1, resetaPaginacao = false) {
    // Inicia Loading
    $(".loader").css("display", "flex");

    if (resetaPaginacao) 
        pagina = 1

    let nome = $("#nome_produto").val().trim().replace(" ", "-");

    let url = `${homolog}/` + retornaURLBuscaValidadosIgnorados(todos, filtro, nome);

    $("#dinamic_div").html(""); // Limpará o conteudo da div dinamica

    await axios.get(url, headers)
    .then((response) => {
        let resultado = response.data.return;

        // Esconder Loading
        $(".loader").css("display", "none");

        // Carregando valores
        $("#revisao_total").html(resultado.total);
        $("#revisao_ignorados").html(resultado.ignorado);
        $("#revisao_confirmados").html(resultado.validado);

        // Criando paginação no rodapé da página
        if (nome !== "")
            criaPaginacao(resultado.total, resultado.ignorado, resultado.validado);
        else
            criaPaginacao(resultado.total, resultado.ignorado, resultado.validado, true);
        
        // Preenchendo a div Dinamicamente

        if (resultado.total == 0) {
            $("#dinamic_div").append(`<div class="container" style="text-align: center;"><p>Nenhum produto encontrado</p></div>`);
        }
        else {
            resultado.produtos.forEach( async function (produto) {     

                let nome_produto = produto.nome_sugestivo.replace(/\s/g, '');

                $("#dinamic_div").append(`
                    <div class="container revisao_carrosel_img" id="card_${produto.id_produto}" style="${produto.imgid != null ? 'border-color: #198754;' : 'border-color: #F00;'}">
                        <h5 class="revisao_prod_info">
                            <span>&#11088; </span>
                            <span>${produto.nome_sugestivo}</span>
                            <span>&#11088; </span>
                        </h5> 

                        <div class="revisao_horizontal_slide">
                            ${produto.imgid != null ? `<img src="https://estaticos.nweb.com.br/imgs/nprodutos/${produto.imgid}.jpg" alt="" />` : '<p>Nenhuma imagem selecionada</p>'} 
                        </div>

                        <div class="container_btn_group">
                            <button type="button" class="btn btn-danger"  title="Voltar o produto para a Lista de avaliação" onclick="voltarParaAnalise(${produto.id_produto}, ${produto.imgid != null ? true : false})">Voltar para análise</button>
                        </div>
                    </div>`
                );
            });
        }

    })  
    .catch((err) => {
        $(".loader").css("display", "none");
    })
}

// Pega o filtro selecionado no HTML
function getFiltroSelecionado() {
    let filtro = $(`input[name=btnradio]`);

    for (let i = 0, l = filtro.length; i < l; i++)
    {
        if (filtro[i].checked) {
            return opcaoFiltro = filtro[i].value;
        }
    }
}

function controlaPagina(numeroPagina) {
    $("#page_item_" + numeroPagina).addClass("active");
    pagina = numeroPagina;

    let opcaoFiltro = getFiltroSelecionado();

    switch (opcaoFiltro) {
        case "todos": 
            carregamentoInicialRevisao(true, 1, false);
        break;

        case "ignorados":
            carregamentoInicialRevisao(false, 0, false);
        break;

        case "confirmados":
            carregamentoInicialRevisao(false, 1, false);
        break;
    }
}

function criaPaginacao(total, ignorados, validados, is_filtrado = false) {
    let opcaoFiltro = getFiltroSelecionado();
    let paginas = 1;
    let i;

    switch (opcaoFiltro) {
        case "todos": 
            paginas = Math.ceil(total / 10);
        break;

        case "ignorados":
            paginas = Math.ceil(ignorados / 10);
        break;

        case "confirmados":
            paginas = Math.ceil(validados / 10);
        break;
    }

    $(".pagination").html(`
        <li class="page-item ${pagina == 1 ? "disabled" : ""}">
            <a class="page-link" tabindex="-1" onclick="controlaPagina(${pagina - 1})">Anterior</a>
        </li>
        <li class="page-item disabled : ""}">
            <a class="page-link">${pagina} / ${paginas}</a>
        </li>
        <li class="page-item ${pagina == paginas ? "disabled" : ""}">
            <a class="page-link" onclick="controlaPagina(${pagina+1})">Próximo</a>
        </li>
    `);
}

async function cadastraNovoGrupo() {
    let url = `${homolog}/gerenciaImagensSugestivas`;
    let nome = $("#novo_grupo").val().toUpperCase();

    await axios.post(url, {"nome_produto": nome}, headers)
    .then((response) => {
        alert("Grupo cadastrado com sucesso!")
    })
    .catch((err) => {
        alert("Houve um erro na requisição!");
    })
}


function alternaInputFiltroCadastro() {
    if($("#bloco_novo_grupo_revisao").css("display") == "flex") {
        $('#bloco_novo_grupo_revisao').css("display", "none");
        $('#bloco_filtro_revisao').css("display", "flex");
    }
    else {
        $('#bloco_novo_grupo_revisao').css("display", "flex");
        $('#bloco_filtro_revisao').css("display", "none");
    }
}

// Ao abrir a página é chamado
window.onload = function() {
    // Traz as imagens
    carregamentoInicialRevisao();

    // Evento de controles para o INPUT quando teclar Enter

    // Pesquisa
    $("#nome_produto").keyup(function(event) {
        if (event.keyCode === 13) {
            realizaBuscaPorNome();
        }
    });
    // Cadastro
    $("#novo_grupo").keyup(function(event) {
        if (event.keyCode === 13) {
            cadastraNovoGrupo();
        }
    });
}


