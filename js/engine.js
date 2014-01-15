var rpgengine_h=function(opciones){
    this.opciones=rpgengine_c.opciones;
    this.cargarOpciones=rpgengine_c.cargarOpciones;
    this.init=rpgengine_c.init;
    this.loadMapa=rpgengine_c.loadMapa;
    this.init(opciones);
    return this;
};
var rpgengine_c={
    opciones:{
        mapaPath:"maps/{{nombre}}/map.json"
    },
    init:function(opciones){
        opciones&&this.cargarOpciones(opciones);
        this.opciones.mapa&&this.loadMapa(this.opciones.mapa);
    },
    cargarOpciones:function(opciones){
        for(var i in opciones){
            this.opciones[i]=opciones[i];
        }
    },
    _parseMapaPath:function(path,keys){
        for(var i in keys){
            path=path.replace("{{"+i+"}}",keys[i]);
        }
        return path;
    },
    loadMapa:function(nombre){
        var path=rpgengine_c._parseMapaPath(this.opciones.mapaPath,{nombre:nombre});
        $.getJSON(path,function(){
            console.log("terminado");
        });
    }
};