<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Painel Valida - Revisão</title>

    <!-- Icone -->
    <link rel="shortcut icon" type="imagex/png" href="./assets/image/icon.ico">

    <!-- Imports arquivos CSS -->
    <link rel="stylesheet" href="assets/css/reset.css">
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="assets/css/revisao.css">
    <!-- Import arquivos JS -->
    <script type="text/javascript" src="assets/js/revisao.js"></script>
    
    <!-- Bootstrap CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- JQuery UI -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- Axios -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js" integrity="sha512-u9akINsQsAkG9xjc1cnGF4zw5TFDwkxuc9vUp5dltDWYCSmyd0meygbvgXrlc/z7/o4a19Fb5V0OUE58J7dcyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</head>

<body>
    
    <!-- Loader  -->
    <div class="loader">
        <div class="spinner-border text-primary" id="my_spinner" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <!-- Div visualização da imagem -->
    <div class="show_img">
        <div id="container_load_img">
            <span class="close_img" onclick="closeImg()">X</span>
            <img id="load_img" src="" alt="imagem do produto">
        </div>
    </div>
    
    <div class="main_container">
        
        <header>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container">
                    <h1 class="title"><a class="nav-link active" aria-current="page" href="./revisao.php">Revisão das Imagens</a></h1>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="./">Avaliar Imagens</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <div class="container" id="revisao_filtros">
            <div class="row mt-3 mb-3">
                <div class="input-group flex-nowrap col" title="Clique para alterar o modo para Cadastrar" id="bloco_filtro_revisao">
                    <span  onclick="alternaInputFiltroCadastro()" class="input-group-text btn-secondary alternar_input_revisao" id="addon-wrapping"><img src="./assets/image/alter.svg"></span>
                    <input id="nome_produto" type="text" class="form-control" placeholder="Nome do produto" aria-label="Nome do produto" aria-describedby="button-addon2">
                    <button onclick="realizaBuscaPorNome()" class="btn btn-outline-primary" type="button" id="button-addon2">Pesquisar</button>
                </div>

                <div class="input-group col" id="bloco_novo_grupo_revisao">
                    <span onclick="alternaInputFiltroCadastro()" class="input-group-text btn-secondary alternar_input_revisao" title="Clique para alterar o modo para Pesquisar" id="addon-wrapping"><img src="./assets/image/alter.svg"></span>
                    <input id="novo_grupo" type="text" class="form-control" value="" placeholder="Novo grupo de produtos" aria-label="Novo grupo de produtos" aria-describedby="button-addon3">
                    <button onclick="cadastraNovoGrupo()" class="btn btn-outline-success" type="button" id="button-addon3">Cadastrar</button>
                </div>

                <div class="col">
                    <div class="btn-group revisao_ft_right" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="btnradio" value="todos" id="btnradio1" autocomplete="off" checked>
                        <label onclick="carregamentoInicialRevisao(true, 0, true)"   class="btn btn-outline-primary" for="btnradio1">Todos: <span id="revisao_total">0</span></label>
                        
                        <input type="radio" class="btn-check" name="btnradio" value="ignorados" id="btnradio2" autocomplete="off">
                        <label onclick="carregamentoInicialRevisao(false, 0, true)"  class="btn btn-outline-danger" for="btnradio2">Ignorados: <span id="revisao_ignorados">0</span></label>

                        <input type="radio" class="btn-check" name="btnradio" value="confirmados" id="btnradio3" autocomplete="off">
                        <label onclick="carregamentoInicialRevisao(false, 1, true)"  class="btn btn-outline-success" for="btnradio3">Confirmados: <span id="revisao_confirmados">0</span></label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Codigo Dinâmico -->
        <div id="dinamic_div">

        </div> 

        <nav aria-label="Navegação de página exemplo">
            <ul class="pagination justify-content-center">

            </ul>
        </nav>
        
        <div class="btn_top">
            <button type="button" class="btn btn-primary" title="Ir para o fim da página" onclick="scrollToToporBot('bot')">▼</button>
            <button type="button" class="btn btn-primary" title="Ir para o topo da página" onclick="scrollToToporBot('top')">▲</button>
        </div> 
    </div>
</body>

</html>