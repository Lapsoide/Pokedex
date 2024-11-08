
export class poketarjeta{
    nombre = '';
    url = '';
    col = '';
    constructor(n, u , c){
        this.nombre = n;
        this.url = u;
        this.col = c;
    }
    async mostrar(){
        let poke = await getpoke(this.url);
        let img = poke[0];
        let altura = poke[1]/10;
        let peso = poke[2]/10;
        let id = poke[3];
        let tipo = poke[4];
        let hab = poke[5];
        let stats = poke[6];
        let tip = ' ';
        let habs = ' ';
        let sta = ' ';


        tipo.forEach(ele => {
            tip += ele.type.name+' ';
        });
        hab.forEach(ele => {
            habs += ele.ability.name+' ';
        });
        stats.forEach(ele => {
            sta += ele.stat.name+' : <b>'  + ele.base_stat + ' </b><br>';

        });



        let tarjeta = '<div class="col-md-'+this.col+' mt-2">';
        tarjeta += '<div class="card p-3">';
        tarjeta += '<img src="'+img+'" height="200" class="card-img-top" alt="...">';
        tarjeta += '<div class="card-body">';
        tarjeta += '<h5 class="card-title text-capitalize text-center" ><span class="badge rounded-pill text-bg-danger text-center">'+id+'</span>  '+this.nombre+'</h5>';
        tarjeta += '<p class="card-text text-center">Altura: <b>'+altura+'mtr</b> Peso: <b>'+peso+'Kg</b></p>';
        tarjeta += '<p>Tipo:<b>'+tip+'</b></p>';
        tarjeta += '<p>Habilidades:<b>'+habs+'</b></p>';
        tarjeta += '<p>Estadisticas base:<br>'+sta+'</p>';
        tarjeta += '</div></div></div>';
        return tarjeta;
    }
}

const getpoke = async(liga) => {

    const peticion = await fetch(liga);
    if(peticion.ok){
        const data = await peticion.json();
        const altura = data.height;
        const peso = data.weight;
        const id = data.id;
        const tipo = data.types;
        const habilidades = data.abilities;
        const stats = data.stats;
        const img = data.sprites.other.dream_world.front_default;
        return [img, altura, peso,id, tipo, habilidades, stats];
    }
}