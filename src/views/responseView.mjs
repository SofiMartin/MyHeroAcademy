export function renderizarSuperHeroe(superheroe){
    
    return {
        "id": superheroe.id,
        "Nombre Super Heroe": superheroe.nombreSuperHeroe, 
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos,
        creado: 'Sofia'
    };
}

export function renderizarListaSuperheroes(superheroes){
    return superheroes.map(superheroe => renderizarSuperHeroe(superheroe));
}