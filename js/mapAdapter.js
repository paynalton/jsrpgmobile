var mapAdapter_h=function(opciones){
    this.cargarOpciones=rpgengine_c.cargarOpciones;
    this.opciones=mapAdapter_c.opciones;
    this.dibujar=mapAdapter_c.dibujar;
    this.getCell=mapAdapter_c.getCell;
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
    
    dibujar:function(cellMap){
        var x=0;
        var y=0;
        var grid=this.opciones.grid;
        var map=this.opciones.map;
        for(x=0;x<grid.opciones.cols;x++){
            for(y=0;y<grid.opciones.rows;y++){
                var cell=this.getCell(x,y,cellMap);
                if(cell){
                    grid.renderCell(x,y,cell,this.opciones.canvas);
                }
            }
        }
        
        console.log(this.opciones);
    },
    getCell:function(x,y,cellMap){
        var map=this.opciones.map;
        var type=null;
        if(typeof(map)!=="undefined"&&typeof(map[x])!=="undefined"&&typeof(map[x][y])!=="undefined"&&typeof(this.opciones.cellDefinitions[parseInt(map[x][y])])!=="undefined"&&typeof(cellMap[this.opciones.cellDefinitions[parseInt(map[x][y])]])!=="undefined"){
            type=cellMap[this.opciones.cellDefinitions[parseInt(map[x][y])]];
            
        }
        if(type){
            var cell=new function(){};
            cell.type=type;
            return cell;
        }
    }
};