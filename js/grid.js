var grid_h=function(opciones){
    this.cargarOpciones=rpgengine_c.cargarOpciones;
    this.init=grid_c.init;
    this.opciones=grid_c.opciones;
    this.renderCell=grid_c.renderCell;
    this.init(opciones);
    return this;
};

var grid_c={
    opciones:{
    },
    init:function(opciones){
        this.cargarOpciones(opciones);    
    },
    renderCell:function(x,y,cell,canvas){
        console.log(x);
        var img= new Image();
        var width=this.opciones.width/this.opciones.cols;
        var height=this.opciones.height/this.opciones.rows;
        var x=((width*x)-this.opciones.paggingLeft);
        var y=((height*y)-this.opciones.paggingTop);
        var sx=cell.type.rec[0];
        var sy=cell.type.rec[1];
        var w=cell.type.rec[2];
        var h=cell.type.rec[3];
        var scale=cell.type.scale;
        console.log(x);
        var ctx=canvas.getContext("2d");
        img.onload=(function(){
            var iw=img.width*scale;
            var ih=img.height*scale;
            console.log(width);
            ctx.drawImage(img,sx,sy,w,h,x,y,width,height
               // ,iw,ih,x,y,width,height
                );
        });
        img.src=cell.type.source;
    }
};