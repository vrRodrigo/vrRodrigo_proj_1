<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Painel Valida</title>

    <!-- Icone -->
    <link rel="shortcut icon" type="imagex/png" href="./assets/image/icon.ico">

    <!-- Imports arquivos CSS -->
    <link rel="stylesheet" href="assets/css/reset.css">
    <link rel="stylesheet" href="assets/css/index.css">
    <!-- Import arquivos JS -->
    <script type="text/javascript" src="assets/js/index.js"></script>
    
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
                    <h1 class="title"><a class="nav-link active" aria-current="page" href="./">Avaliação de Imagens</a></h1>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="./revisao.php">Revisão</a>
                        </li>
                        <li class="nav-item">
                            <div class="nav-link" href="#"><span id="t_confirmados">0</span> Avaliados / <span id="t_produtos"> 1</span> Total</div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <!-- Bloco de informações -->
        
        <div class="container avaliacao_help">
            <dl class="row">
                <dt class="col-sm-2">Avaliação das Imagens</dt>
                <dd class="col-sm-9 desc_help_img">
                    <p>Ao realizar um duplo clique sobre a imagem, será aberto um popup para melhor visualização da mesma.</p>
                    <p>Para confirmar a escolha da imagem, é necessário selecionar apenas 1 imagem e em seguida clicar no botão <button type="button" id="btn_success_example" class="btn btn-success">Confirmar</button>.</p>
                    <p>O botão <button type="button" id="btn_danger_example" class="btn btn-danger">Ignorar</button> não precisa previamente de uma imagem selecionada, o mesmo terá a ação de ignorar todas as imagens e dará continuidade sem nenhuma seleção.</p>
                    <p>Para selecionar a imagem, basta um simples clique sobre a mesma. Caso necessário resetar sua escolha, clique no botão em azul <button type="button" id="btn_reset_example" class="btn btn-primary">Resetar Selecionado</button>.</p>
                </dd>
            </dl>
            <i id="hide_show_info" onclick="hideShowInfo()">
                <img src="./assets/image/info.svg"> <span>Detalhes</span>
            </i>
        </div>

        <!-- Codigo Dinâmico -->
        <div id="dinamic_div">

        </div>
        
        <div class="btn_top">
            <button type="button" class="btn btn-primary" title="Ir para o fim da página" onclick="scrollToToporBot('bot')">▼</button>
            <button type="button" class="btn btn-primary" title="Ir para o topo da página" onclick="scrollToToporBot('top')">▲</button>
        </div> 
    </div>
</body>

</html>