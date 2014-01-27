var grid_h=function(opciones){
    this.cargarOpciones=rpgengine_c.cargarOpciones;
    this.init=grid_c.init;
    this.opciones=grid_c.opciones;
    this.init(opciones);
    return this;
};

var grid_c={
    opciones:{
    },
    init:function(opciones){
        this.cargarOpciones(opciones);    
    }
    
};