var nave;
var balas;
var timer = 0;
var delay = 400;

var Iniciar = {
  preload: function() {
    //cargar los elementos
    juego.load.image("nave", "img/nave.png");
    juego.load.image("bala", "img/bala.png");
    juego.load.image("asteroide", "img/asteroide.png");
    juego.load.image("fondo", "img/fondo.png");
  },
  create: function() {
    //mostrar en pantalla
    juego.add.tileSprite(0, 0, 400, 540, "fondo");
    //Agregar al canvas la nave
    nave = juego.add.sprite(40, juego.height / 2, "nave");
    //Punto de apoyo centralizado
    nave.anchor.setTo(0.5);
    //Agregar funciones al juego de fisica de tipo ARCADE
    juego.physics.startSystem(Phaser.Physics.ARCADE);
    //Activar fisica para la nave
    juego.physics.arcade.enable(nave, true);
    //Limitar el giro de la nave
    nave.body.allowRotation = false;
    //Crear balas
    balas = juego.add.group();
    balas.enableBody = true;
    balas.setBodyType = Phaser.Physics.ARCADE;
    balas.createMultiple(20, "bala");
    balas.setAll("anchor.x", 0.5);
    balas.setAll("anchor.y", 1);
    balas.setAll("checkWorldBounds", true);
    balas.setAll("outOfBoundsKill", true);
  },
  update: function() {
    //Animar juego
    juego.add.tilePosition.x -= 3;
    nave.rotation = juego.physics.arcade.angleToPointer(nave);
    //Disparar balas
    if (juego.input.activePointer.isDown) {
      this.disparar();
    }
  },
  //Funcion disparar una sola bala
  disparar: function() {
    timer = juego.time.now + delay;
    var bala = balas.getFirstDead();
    console.log(juego.time.now + "|" + timer);
    if (juego.time.now > timer && balas.countDead() > 0) {
      bala.anchor.setTo(0.5);
      bala.reset(nave.x, nave.y);
      bala.rotation = juego.physics.arcade.angleToPointer(bala);
      juego.physics.arcade.moveToPointer(bala, 300);
    }
  }
};
