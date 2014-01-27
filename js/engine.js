var rpgengine_h=function(opciones){
    this.opciones=rpgengine_c.opciones;
    this.cargarOpciones=rpgengine_c.cargarOpciones;
    this.prepararCanvas=rpgengine_c.prepararCanvas;
    this.dibujarMapa=rpgengine_c.dibujarMapa;
    this.setAdapter=rpgengine_c.setAdapter;
    this.init=rpgengine_c.init;
    this.loadMapa=rpgengine_c.loadMapa;
    this.setMapa=rpgengine_c.setMapa;
    this.loadCellDefinitions=rpgengine_c.loadCellDefinitions;
    this.loadCell=rpgengine_c.loadCell;
    this.setCell=rpgengine_c.setCell;
    this.init(opciones);
    return this;
};
var rpgengine_c={
    opciones:{
        mapaPath:"maps/{{nombre}}/map.json",
        terrenoPath:"js/terreno/{{nombre}}/{{nombre}}.json",
        _canvas:null,
        _cctx:null,
        _adapter:null,
        _grid:null,
        loadedCells:[]
    },
    init:function(opciones){
        var master=this;
        opciones&&this.cargarOpciones(opciones);
        this.prepararCanvas();
        this.opciones.mapa&&this.loadMapa(this.opciones.mapa,function(mapa){
            mapa.canvas=master.opciones._canvas;
            var adapter=new mapAdapter_h(mapa);
            master.setAdapter(adapter);
        });
        
    },
    setAdapter:function(adapter){
        var master=this;
        this.opciones._adapter=adapter;
        this.opciones.contenedor&&this.prepararCanvas();
        this.opciones._grid=this.opciones._adapter.opciones.grid;
        this.opciones._adapter&&this.loadCellDefinitions(function(){
            master.opciones._adapter&&master.dibujarMapa();
        });
        
    },
    loadCell:function(nombre,callback){
       var master=this;
       var path=rpgengine_c._parseMapaPath(this.opciones.terrenoPath,{nombre:nombre});
       this.opciones.loadedCells[nombre]=true;
       $.getJSON(path,function(cell){
           master.setCell(nombre,cell);
           callback&&callback();
       });
    },
    setCell:function(nombre,cell){
        this.opciones.loadedCells[nombre]=cell;
    },
    loadCellDefinitions:function(callback){
        var master=this;
        for(var i in this.opciones._adapter.opciones.cellDefinitions){
            if(!this.opciones.loadedCells[this.opciones._adapter.opciones.cellDefinitions[i]]){
                this.loadCell(this.opciones._adapter.opciones.cellDefinitions[i],function(){
                    master.loadCellDefinitions(callback);
                });
                return;
            }
        }
        callback();
    },
    prepararCanvas:function(){
        this.opciones._canvas=$(this.opciones.contenedor).get()[0];
        this.opciones._cctx=this.opciones._canvas.getContext("2d");
        //$(this.opciones._canvas).width($(window).width());
        //$(this.opciones._canvas).height($(window).height());
        this.opciones._cctx.fillRect(0,0,$(this.opciones._canvas).width(),$(this.opciones._canvas).height());
        
    },
    cargarOpciones:function(opciones){
        for(var i in opciones){
            this.opciones[i]=opciones[i];
        }
    },
    dibujarMapa:function(){
        this.opciones._adapter.dibujar();
    }
    ,
    _parseMapaPath:function(path,keys){
        for(var i in keys){
            path=path.split("{{"+i+"}}").join(keys[i]);
        }
        return path;
    },
    loadMapa:function(nombre,callback){
        var master=this;
        var path=rpgengine_c._parseMapaPath(this.opciones.mapaPath,{nombre:nombre});
        $.getJSON(path,function(map){
            master.setMapa(map);
            if(callback){
                master.__loadMabaCallback=callback;
                master.__loadMabaCallback(map);
            }
        });
    },
    setMapa:function(map){
        this.mapa=map;
    }
};