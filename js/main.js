document.getElementById('formulario').addEventListener('submit', cadastraApartamento);

function cadastraApartamento(e) {
    var numeroApartamento = document.getElementById('numeroApartamento').value;
    var nomeHospede = document.getElementById('nomeHospede').value;
    var time = new Date();

    if (    !numeroApartamento && !nomeHospede) {
        alert("Por favor, preencha todos os campos");
        return false;
    }

    unidade = {
        apartamento: numeroApartamento,
        nome: nomeHospede,
        hora: time.getHours(),
        minutos: time.getMinutes(),
        dia: time.getDate(),
        mes: time.getMonth()+1,
        ano: time.getFullYear()
    }


    if (localStorage.getItem('edicifio') === null ) {
        var unidades = [];
        unidades.push(unidade);
        localStorage.setItem('edicifio', JSON.stringify(unidades));

    } else {
        var unidades = JSON.parse(localStorage.getItem('edicifio'));
        unidades.push(unidade);
        localStorage.setItem('edicifio', JSON.stringify(unidades));
    }
    
    document.getElementById('formulario').reset();

    mostraPatio();

    e.preventDefault();
}

function apagarVeiculo(nome) {
    
    var unidades = JSON.parse(localStorage.getItem('edicifio'));

    for (var i = 0; i < unidades.length; i++) {
        if (unidades[i].nome == nome ) {
            unidades.splice(i, 1);
        }

        localStorage.setItem('edicifio', JSON.stringify(unidades));
    }

    mostraPatio();
}

function mostraPatio() {
    var unidades = JSON.parse(localStorage.getItem('edicifio'));
    var unidadesResultado = document.getElementById('resultados')
    
    unidadesResultado.innerHTML = '';

    for (var i = 0; i < unidades.length; i++ ) {
        var apartamento = unidades[i].apartamento;
        var nome = unidades[i].nome;
        var hora = unidades[i].hora;
        var minutos = unidades[i].minutos;
        var dia = unidades[i].dia;
        var mes = unidades[i].mes;
        var ano = unidades[i].ano;

        unidadesResultado.innerHTML += '<tr class="table-Js"><td>' + apartamento +
                                '</td><td>' + nome +
                                '</td><td>' + hora + ':' + minutos + '   -   ' + dia + '/' + mes + '/' + ano +
                                '</td><td><button class="btn" onclick="apagarVeiculo(\'' + nome +'\')"> Excluir</button></td>' +
                                '</tr>';
    }

    unidadesResultado.style.background = "rgba(15, 75, 128, .5)";
}

