var mapAdapter_h=function(opciones){
    this.cargarOpciones=rpgengine_c.cargarOpciones;
    this.opciones=mapAdapter_c.opciones;
    this.dibujar=mapAdapter_c.dibujar;
    this.init=mapAdapter_c.init;
    this.getGrid=mapAdapter_c.getGrid;
    this.init(opciones);
};

var mapAdapter_c={
    opciones:{
        grid:null,
        canvas:null,
        x:0,
        y:0
    },
    init:function(opciones){
        this.cargarOpciones(opciones);
        this.opciones.grid=this.getGrid();
    },
    getGrid:function(){
        var w=$(this.opciones.canvas).width();
        var h=$(this.opciones.canvas).height();
        var cols=Math.floor(w/this.opciones.frameSize.width)+2;
        var rows=Math.floor(h/this.opciones.frameSize.height)+2;
        
        return new grid_h({
            width:this.opciones.frameSize.width*cols,
            height:this.opciones.frameSize.height*rows,
            canvasWidth:w,
            canvasHeight:h,
            cols:cols,
            rows:rows,
            paggingTop:((this.opciones.frameSize.height*rows)-h)/2,
            paggingLeft:((this.opciones.frameSize.width*cols)-w)/2
        });
    },
    
    dibujar:function(){
        console.log("dibujando");
    }
};