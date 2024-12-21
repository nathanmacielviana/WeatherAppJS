const url = 'https://api.openweathermap.org/data/2.5/weather'; //url da api
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; //chave

/*garantir que o DOM seja executado quando o conteudo for carregado*/
$(document).ready(function(){
    weatherFn('Brasil');
});

/* função que requisita e consulta a API*/
async function weatherFn(cName)
{
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try // requisição da API
    {
        const res = await fetch(temp);
        const data = await res.json();
        if(res.ok){weatherShowFn(data);} //verificando se a resposta foi bem sucedida
        else{alert('Cidade não encontrada, por favor digite novamente');} // se não for deverá exibir alerta que a cidade não foi encontrada
    }
    catch (error){console.error('Erro ao buscar dados:', error);} //tratativa de erro, deverá ser capturado e registrado console
}

/*Função exibir dados do clima*/
function weatherShowFn(data)
{
    $('#city-name').text(data.name); //Atualiza o conteúdo do id com o nome da cidade retornada da API
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a')); //formatação de data e hora usando a biblioteca moment.js para exibir no id
    $('#temperatura').html(`${data.main.temp}°C`); //exibir temperatura atual no id
    $('#descricao').text(data.weather[0].description); // exibir descrição do clima na id
    $('#ventovel').html(`Wind Speed: ${data.wind.speed} m/s`); //exibir velocidade do vento na id
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/{icon}.png`); // atualiza o src da imagem para exibir o ícone do clima
    $('#weather-info').fadeIn(); // exibe o elemento com id usando animação de fadein após os dados serem carregados
}