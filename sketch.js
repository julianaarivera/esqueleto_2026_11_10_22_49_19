//variables
let computador;
let windows;


// Interacción de la figura y transición
let tiempoTransicion = 0;


// Estados del computador
let estado = "apagado";
let tiempoEncendido = 0;

// Posición de la pantalla
let pantallaX = 54;
let pantallaY = 66;
let pantallaW = 292;
let pantallaH = 220;

// Animación tipográfica
let inicioTipografia = 0;
let faseFinal = "tipografia";

// Escritorio Windows
let escritorio;
let carpeta;
let ventana;

//escenas
let escena = 0;
let momento = 1;

//ventanas
let ventanahap;
let ventanaaaaa;
let ventanar4ro;
let ventanasamps;

//ventana de informacion
let mostrarInfo = false;

// registro de mundos completos 
let mundosCompletados = [];

//colapso 
let inicioColapso = 0;
let duracionColapso = 9000;


//subir imagenes
async function setup() {
  //inicio
  computador = await loadImage("assets/compu.jpeg");
  windows = await loadImage("assets/windows98.jpg");

  //escritorio
  escritorio = await loadImage("assets/escritorio.jpeg");
  carpeta = await loadImage("assets/icono ventana.png");
  ventana = await loadImage("assets/emergente1.png");

  //ventanas
  ventanahap = await loadImage("assets/ventanahap.png");
  ventanaaaaa = await loadImage("assets/ventanaaaaa.png");
  ventanar4ro = await loadImage("assets/ventanar4ro.png");
  ventanasamps = await loadImage("assets/ventanasamps.png");


  createCanvas(400, 384);
  frameRate(30); //establece la velocidad de actualización del sketch en 30 cuadros por segundo.

}

function draw() {
  background(0); //sin fondo

  // Computador apagado
  // si el computador está apagado, se muestra únicamente la imagen del computador
  if (estado === "apagado") {
    image(computador, 0, 0, 400, 384); //imagen computador
    return; // detiene la ejecución de esta función para que no se ejecuten las demás fases
  }

  // calcula cuánto tiempo ha pasado desde que se encendió el computador y millis devuelve el tiempo transcurrido desde que comenzó el programa
  let tiempo = millis() - tiempoEncendido;

  //computador prendido
  // cuando pasen 25,5 segundos se muestra el computador con la secuencia de animaciones
  if (tiempo < 25500) {
    image(computador, 0, 0, 400, 384); // Dibuja el computador como fondo

    let ctx = drawingContext; // obtiene el contexto gráfico del lienzo para utilizar funciones de recorte

    ctx.save(); // guarda el estado actual del contexto gráfico para poder restaurarlo después
    ctx.beginPath(); //inicia un nuevo trazado que definirá el área de recorte

    // dibuja un rectángulo con esquinas redondeadas que corresponde al área de la pantalla donde se va a mostrar todo
    ctx.roundRect(pantallaX, pantallaY, pantallaW, pantallaH, 16);

    ctx.clip(); // recorta el área de dibujo para que las animaciones aparezcan únicamente dentro de la pantalla del computador

    //secuencia de animaciones
    //los primeros 9,5 segundos aparece una terminal con estética de programación
    if (tiempo < 9500) {
      dibujarTerminal(tiempo); // dibuja la terminal y utiliza el tiempo para controlar la animación
      dibujarCRT(7); // añade un efecto visual de pantalla CRT para que se sienta antiguo con intensidad 7
    }

    //windows 98
    // entre los 9,5 y los 12,5 segundos aparece la interfaz de Windows 98
    else if (tiempo < 12500) {
      dibujarWindows(); // Dibuja la interfaz gráfica de Windows 98
      dibujarCRT(3); // agrega el efecto visual de pantalla antigua con 3 de intensidad
    }

    //diagnostico blanco tipo programcion
    // Entre los 12,5 y los 19,5 segundos se muestra
    else if (tiempo < 19500) {
      dibujarDiagnostico(tiempo - 12500); // muestra las letras blancas y reinicia el contador para esta fase.
      dibujarCRT(5); // agrega el efecto visual de pantalla antigua con 5 de intensidad
    }
    //barra azul de carga
    // desde los 19,5 hasta los 25,5 segundos aparece la barra
    else {
      dibujarCargaAzul(tiempo - 19500); // dibuja la carga azul y utiliza el tiempo transcurrido desde el inicio de esta fase
      dibujarCRT(3); // Añade el efecto CRT con una intensidad de 3
    }

    ctx.restore(); // restaura el estado original del contexto gráfico y elimina el recorte aplicado
  }

  // glitch explosivo
  // cuando termina la secuencia de encendido (25,5 segundos), comienza el glitch que transforma la pantalla y revela el universo de tematto
  else if (tiempo < 27900) {
    dibujarGlitchExplosivo(tiempo - 25500); // Ejecuta el glitch utilizando el tiempo transcurrido desde su inicio
  }

  //pantalla codigo transicion al escritorio
  // si ya terminaron las fases anteriores, se ejecutara esta
  else {
    // la fase final actual corresponde a la pantalla tipográfica
    if (faseFinal === "tipografia") {
      dibujarPantallaTematto(); //muestra la animación tipográfica con el nombre TEMATTÓ
    } else if (faseFinal === "transicion") {
      dibujarTransicionEscritorio(); //conecta la pantalla tipográfica con el escritorio
      //la fase final es el escritorio
    } else if (faseFinal === "escritorio") {
      dibujarEscritorio(); // muestra el escritorio
    }else if (faseFinal === "colapso") {
  dibujarColapso(millis() - inicioColapso); //muestra el colapso
}
  }
} //ultimo del draw

//fuera del draw

//terminal codigo verde
function dibujarTerminal(tiempo) {
  noStroke(); // elimina los bordes
  fill(2, 9, 4); // Color de fondo

  // se muestra el fondo de la terminal dentro del área de la pantalla del computador
  rect(pantallaX, pantallaY, pantallaW, pantallaH);

  textFont("monospace"); //font
  textSize(8.5); //tamaño
  textAlign(LEFT, BASELINE); //alineacion texto

  let textos = [
    "SYSTEM BIOS v4.08",
    "MEMORY TEST .......... OK",
    "CHECKING SYSTEM...",
    "",
    "C:\\> DIR /SYSTEM",
    "  AUDIO       SYS",
    "  MEMORY      DAT",
    "  TEMATTO     EXE",
    "",
    "LOADING AUDIO...",
    "READING MEMORY...",
    "CHECKING FILES... OK",
    "",
    "SCANNING FILES...",
    "UNKNOWN FILE DETECTED",
    "",
    "C:\\>TEMATTO.EXE",
    "HOLA MUNDO_",
  ]; //tetxo que va aparecer en la terminal

  // muestra cada palabra de texto una por una, se ve pausado
  for (let i = 0; i < textos.length; i++) {
    // calcula el momento en el que debe comenzar a aparecer cada línea, comienza 360 milisegundos después de la anterior
    let inicio = i * 360;

    //  calcula cuantos caracteres deben ser visibles en el tiempo, cada carácter aparece cada 25 milisegundos
    let caracteres = floor((tiempo - inicio) / 25);

    // limita la cantidad de caracteres visibles para que no sea menor que 0 ni supere la longitud del texto
    caracteres = constrain(caracteres, 0, textos[i].length);

    // parte del texto que ya debe ser visible, desde el primer carácter hasta la cantidad indicada
    let visible = textos[i].substring(0, caracteres);
    let y = pantallaY + 16 + i * 11; // Calcula la posición vertical de cada línea
    // Cada nueva línea se desplaza 11 píxeles hacia abajo

    // Comprueba que haya caracteres visibles antes de dibujar el texto
    if (visible.length > 0) {
      // primera capa verde transparente para crear un efecto de brillo
      fill(40, 255, 100, 45);
      text(visible, pantallaX + 12, y + 1);
      //texto principal en un verde más claro y brillante
      fill(115, 235, 135);
      text(visible, pantallaX + 12, y);
    }
  }

  // parpadeo al finalizar la terminal verde
  //el cursor parpadee cada 400 milisegundos para simular una terminal de computador
  if (floor(tiempo / 400) % 2 === 0) {
    fill(115, 235, 135); // color verde brillante del cursor
    // muestra pequeño rectángulo al final de la última línea de texto
    rect(pantallaX + 12, pantallaY + 16 + (textos.length - 1) * 11 + 3, 5, 2);
  }
}

//windows 98
// funcion para mostrar la iamgen de windows dentro de la pantalla 
function dibujarWindows() {
  let proporcion = pantallaW / pantallaH; // Calcula la proporción entre el ancho y el alto de la pantalla para mantener la misma porpocion de la pantalla 
  let anchoRecorte = windows.height * proporcion; //ancho del recorte necesario para mantener la proporción de la imagen
  let inicioX = (windows.width - anchoRecorte) / 2;//desde qué posición horizontal debe comenzar el recorte para centrar la imagen

  image(
    windows, //imagen 
    pantallaX, //posición horizontal donde aparece en la imagen
    pantallaY, //posición vertical donde aparece la imagen
    pantallaW, //ancho que tendrá la imagen
    pantallaH, //alto que tendrá la imagen
    inicioX, //punto horizontal desde donde comienza el recorte
    0, //punto vertical donde comienza el recorte
    anchoRecorte, //ancho de la sección que se va a recortar
    windows.height //alto de la sección que se va a recortar
  );
}

//diagnostico blanco
//funcion para hacerlo
function dibujarDiagnostico(tiempo) {
  noStroke(); //sin bordes
  fill(0);// color fondo 
  
//rectángulo negro que ocupa toda el área de la pantalla del computador donde se va a mostrar el diagnostico
  rect(pantallaX, pantallaY, pantallaW, pantallaH);

  textFont("monospace"); //font
  textSize(8.5); //tamaño
  textAlign(LEFT, BASELINE); //alineacion

  let textos = [
    "Plug and Play BIOS Extension",
    "",
    "Detecting devices...",
    "Audio controller: OK",
    "Video controller: OK",
    "Memory check: COMPLETE",
    "",
    "Loading audio engine...",
    "Reading system files...",
    "",
    "TEMATTO.EXE DETECTED",
  ]; //textos que va a mostrar el diagnostico
  
//muestra todos los mensajes progresivamente 
  for (let i = 0; i < textos.length; i++) {
    let inicio = i * 450; // calcula momento donde debe aprecer cada linea, cada 450 milisegundos aparece una linea despues de la anterior 

    //cuántos caracteres deben aparecer según el tiempo transcurrido, aparecen cada 20 milisegundos
    let caracteres = floor((tiempo - inicio) / 20);
//limita la cantidad de caracteres para que no sea menor que 0 ni supere la longitud del texto
    caracteres = constrain(caracteres, 0, textos[i].length);

    let visible = textos[i].substring(0, caracteres);//parte del texto que debe aparecer
    let y = pantallaY + 17 + i * 16;//posición vertical de cada línea, cada nueva línea se desplaza 16 píxeles hacia abajo

    fill(235); //color texto
    text(visible, pantallaX + 12, y);//muestra el texto en la posición calculada
  }

  //cursos parpadiante 
   // Hace que el cursor parpadee cada 400 milisegundos
  if (floor(tiempo / 400) % 2 === 0) {
    fill(255); //color blanco del cursor
    
// pequeño rectángulo al final de la última línea de diagnóstico
    rect(pantallaX + 12, pantallaY + 17 + 10 * 16 + 3, 5, 2);
  }
}

//pantalla azul
function dibujarCargaAzul(tiempo) {
  noStroke(); //sin bordes
  fill(0, 20, 125); //color fondo 

  //rectángulo azul que ocupa toda el área de la pantalla del computador
  rect(pantallaX, pantallaY, pantallaW, pantallaH);

  textFont("monospace"); //font
  textSize(9); //tamaño
  textAlign(LEFT, BASELINE);//alineacion

  fill(255); //color texto 

  //mensajes de la pantalla azul en diferentes posiciones
  text("TEMATTO SYSTEM", pantallaX + 18, pantallaY + 35);
  text("Loading universe...", pantallaX + 18, pantallaY + 65);
  text("Please wait_", pantallaX + 18, pantallaY + 85);

  //barra de carga
  noFill(); //sin color de relleno
  stroke(255); //color borde
  strokeWeight(1); //grosor borde
  
//recatngulo de la barra 
  rect(pantallaX + 18, pantallaY + 115, 250, 12);

  noStroke(); //sin borde para dibujar únicamente el relleno de la barra

  //progreso de la carga según el tiempo transcurrido,avanza durante 4.000 milisegundos y se detiene al 88% 
  let progreso = constrain(tiempo / 4000, 0, 0.88);

  fill(255);//color relleno barra 
//relleno de la barra según el porcentaje de progreso
  rect(pantallaX + 20, pantallaY + 117, 246 * progreso, 8);

  // Cuando han pasado más de 3.500 milisegundos, aparece un mensaje de error
  if (tiempo > 3500) {
    fill(255);// color blanco para el mensaje
    
    text("SYSTEM NOT RESPONDING_", pantallaX + 18, pantallaY + 155);//muestra un mensaje indicando que el sistema dejó de responder
  }
}

//glitch
function dibujarGlitchExplosivo(tiempo) {
  background(0); //limpia el lienzo , se va la imagen del computador y pone uno negro 
  
//// Comprueba si el glitch ya superó los 2.400 milisegundos
  if (tiempo > 2400) {
    background(0); //mantiene el fondo 
    return;
  }
//intensidad del glitch según el tiempo transcurrido, aumenta progresivamente de 0 a 1 durante los primeros 450 milisegundos
  let intensidad = constrain(tiempo / 450, 0, 1);

   // define el centro del lienzo, desde donde se expandirán los elementos
  let centroX = 200;
  let centroY = 176;

  // ventanas digitales 
  //ventanas que simulan fragmentos de interfaces de computador
  let ventanas = [
    { x: 20, y: 15, w: 180, h: 115, c: [0, 180, 255] },
    { x: 220, y: 25, w: 155, h: 125, c: [20, 20, 100] },
    { x: 10, y: 205, w: 165, h: 130, c: [0, 255, 150] },
    { x: 225, y: 215, w: 170, h: 120, c: [255, 0, 90] },
    { x: 110, y: 110, w: 190, h: 145, c: [100, 0, 255] },
  ];// cada ventana tiene una posición, un ancho, un alto y un color.

  //ventanas para mostrarlas y transformarlas 
  for (let i = 0; i < ventanas.length; i++) {
    let v = ventanas[i];// Guarda temporalmente los datos de la ventana actual
    
//calcula la distancia horizontal, vertical entre el centro de la ventana y el centro del lienzo.
    let dx = v.x + v.w / 2 - centroX;
    let dy = v.y + v.h / 2 - centroY;

    //desplazamiento cada ventana de manera aleatoria.
    let desplazamiento = intensidad * random(15, 65); // el desplazamiento aumenta según la intensidad del glitch

    //nueva posición horizontal de la ventana
    let x = centroX + dx * (1 + intensidad) + cos(i * 2) * desplazamiento; 
// calcula la nueva posición vertical de la ventana
    let y = centroY + dy * (1 + intensidad) + sin(i * 3) * desplazamiento;
    //las ventanas se alejan del centro y recibe un movimiento adicional
// aumenta el ancho y alto de la ventana según la intensidad del glitch
    let w = v.w * (1 + intensidad * 0.6);//ancho
    let h = v.h * (1 + intensidad * 0.5);//alto

    push();// Guarda el estado para aplicar transformaciones independientes 

    translate(x, y);// traslada el origen de dibujo a la nueva posición de la ventana
    rotate(random(-0.12, 0.12));// gira la ventana aleatoriamente para generar una distorsión

    noStroke();//sin bordes las figuras
    
// fondo de la ventana utilizando el color definido en su lista
    fill(v.c[0], v.c[1], v.c[2], 180);
    rect(-w / 2, -h / 2, w, h);//rectángulo de la ventana centrado en su origen de coordenadas

    //barra superior de la ventana en color gris claro
    fill(190, 200, 210, 220);
    rect(-w / 2, -h / 2, w, 13);

 //pequeños botones en la parte superior derecha de la ventana
    fill(255);
    rect(w / 2 - 30, -h / 2 + 3, 7, 7);//primer rectangulo
    rect(w / 2 - 18, -h / 2 + 3, 7, 7);//segundo rectangulo
    

    fill(0, 0, 0, 170);//color lineas 

    // Repite siete veces el dibujo de líneas horizontales dentro de la ventana
    for (let j = 0; j < 7; j++) {
      // Dibuja líneas de diferentes anchos y alturas para simular textos o contenido de una interfaz digital
      rect(
        -w / 2 + 8, //posición horizontal de las líneas
        -h / 2 + 23 + j * 12,//posición vertical, separando cada línea 12 píxele
        random(w * 0.3, w * 0.85),//ancho aleatorio de las líneas
        random(2, 5)// alto aleatorio de cada línea
      );
    }
    
    pop();// Restaura el estado gráfico anterior y finaliza las transformaciones de esta ventana
  }

  // bloques de color
  // hacer varios rectángulos de colores aleatorios para crear fragmentación digital
  noStroke();//sin bordes las figuras para que solo se vea el relleno

  // repite el proceso 110 veces para generar múltiples bloques de color
  for (let i = 0; i < 110; i++) {
    //aleatoriamente escoge un color de la paleta establecida
    let paleta = random([
      [255, 0, 70],  // Rosa rojizo
      [0, 255, 220],// Turquesa
      [110, 0, 255],// Violeta
      [255, 255, 255],// Blanco
      [0, 0, 0],// Negro
      [0, 180, 120],// Verde
    ]);
 //aplica el color seleccionado y una transparencia aleatoria
    fill(paleta[0], paleta[1], paleta[2], random(100, 240));
 //rectángulos en posiciones aleatorias y con diferentes tamaños
    rect(random(width), random(height), random(8, 100), random(3, 28));
  }

  //palabras que aparecen en el glitch
  textFont("monospace"); //font
  textSize(9);// tamaño
  textAlign(LEFT, BASELINE);//alineacion

  let caracteres = [
    "SYSTEM ERROR",
    "TEMATTO.EXE",
    "0xFF 0x00 0xA9",
    "MEMORY FAILURE",
    "UNKNOWN SIGNAL",
    "C:\\SYSTEM\\ERROR",
    "DATA CORRUPTED",
    "010101010101",
    "REBOOT FAILED",
  ]; //texto que va a aparecer 

  //repite el proceso 35 veces para generar diferentes textos en pantalla
  for (let i = 0; i < 35; i++) {
    fill(0, random(150, 255), 100, random(100, 255));
//escoge texto aleatorio y lo pone en una posición aleatoria
    text(random(caracteres), random(width), random(height));
  }

  // interferencias horizontales
  //genera 45 franjas horizontales de colores que simulan errores de señal
  for (let i = 0; i < 45; i++) {
    //combinaciones aleatorias de colores  y transparecias para las interferencias
    fill(random([255, 0]), random([0, 255]), random([255, 0]), random(80, 200));

    rect(random(-45, 45), random(height), random(80, 450), random(1, 5));//franjas horizontales en posiciones y con dimensiones aleatorias
  }

  //ruido digital
  // genera 1200 puntos aleatorios para simular interferencia visual
  for (let i = 0; i < 1200; i++) {
    let gris = random(100, 255); //valor aleatorio de gris

    stroke(gris, random(20, 100));// Establece el color y la transparencia del punto
    point(random(width), random(height));// punto en una posición aleatoria
  }

  noStroke();// sin bordes antes de dibujar

  //fragmentos explosivos
   //pequeños bloques que se dispersan en diferentes direcciones desde el centro
  for (let i = 0; i < 65; i++) {
    let angulo = random(TWO_PI);//un ángulo aleatorio para determinar la dirección de cada fragmento
    let distancia = random(30, 350) * (0.4 + intensidad);//distancia del fragmento respecto al centro y  aumenta según la intensidad del glitch

    let x = centroX + cos(angulo) * distancia;//posición horizontal del fragmento utilizando el coseno del ángulo
    let y = centroY + sin(angulo) * distancia;//posición vertical del fragmento utilizando el seno del ángulo

    //colores aleatorios con transparencia para los fragmentos
    fill(
      random([255, 0]),
      random([0, 255]),
      random([255, 0]),
      random(100, 240)
    );
//rectángulo en la posición calculada, con dimensiones aleatorias
    rect(x, y, random(3, 22), random(3, 18));
  }
  noStroke();// sin bordes al finalizar la función

//interferencia de color 
  //comprueba si han transcurrido menos de 350 milisegundos desde que comenzó el glitch
  if (tiempo < 350) {
    noStroke();//sin bordes las figuras

    //repite el proceso 12 veces para generar diferentes franjas de interferencia
    for (let i = 0; i < 12; i++) {
      let y = random(height);//una posición random vertical en el lienzo
      let alto = random(2, 9);//una altura random para cada franja, entre 2 y 9 píxeles

      fill(0, 255, 180, random(50, 150));//color verde turquesa con una transparencia aleatoria
      rect(random(-20, 20), y, random(100, 400), alto);//dibuja una franja horizontal verde en una posición y con un ancho aleatorios

      fill(190, 0, 255, random(40, 120));//color morado con una transparencia aleatoria
      rect(random(width - 100), y + 3, random(40, 180), 2);//segunda franja morada ligeramente desplazada hacia abajo
    }
  }
  //interferencia franjas verdes y moradas 
//comprueba si el tiempo transcurrido está entre 1850 y 2200 milisegundos
  if (tiempo > 1850 && tiempo < 2200) {
    noStroke(); //sin bordes la figura

    //repite el proceso 18 veces para generar varias franjas
    for (let i = 0; i < 18; i++) {
      fill(0, 255, 170, random(40, 130));//color verde turquesa con una transparencia aleatoria
      rect(random(width), random(height), random(20, 120), random(2, 5));//rectángulo verde en una posición aleatoria

      fill(180, 0, 255, random(40, 120));//color morado con una transparencia aleatoria
      rect(random(width), random(height), random(30, 100), 2);//rectángulo verde en una posición aleatoria
    }
  }
}

// pantalla transición glitch - escritorio
function dibujarPantallaTematto() {
  background(0, 5, 1); //fondo color 

  //si el tiempo de inicio de la animación sigue en cero se muestra el momento exacto en el que comienza la función
  if (inicioTipografia === 0) {
    inicioTipografia = millis();
  }

  let tiempo = millis() - inicioTipografia; // Calcula cuánto tiempo ha pasado desde que comenzó esta animación

  textFont("monospace"); //font 
  textAlign(LEFT, CENTER); //alineacion
  textSize(12); //tamaño
  noStroke();// sin bordes 

  let altoFila = 15;//separación vertical entre cada fila de texto
  let cantidadFilas = 27;// se deben mostrar 27 filas de texto

//diferentes secuencia de información mismo tamaño de letra
  let secuencias = [
    "TEMATTÓ ERROR SYSTEM 010101 DATA MEMORY 0xFF ",
    "TEMATTÓ 010101 TEMATTÓ SYSTEM ERROR 110010 ",
    "SYSTEM TEMATTÓ DATA 0xFF MEMORY ERROR 010101 ",
    "TEMATTÓ MEMORY ERROR 0xA09F SYSTEM DATA ",
    "010101 TEMATTÓ SYSTEM 110010 ERROR TEMATTÓ ",
    "TEMATTÓ DATA MEMORY SYSTEM 0xFF ERROR ",
    "ERROR TEMATTÓ 010101 SYSTEM MEMORY DATA ",
    "TEMATTÓ 0xFF DATA SYSTEM ERROR 010101 ",
  ]; //texto que se va a mostrar 

//matriz continua 
  //todas las filas d etetxo que se van a mostrar 
  for (let fila = 0; fila < cantidadFilas; fila++) {
    //alterna la dirección del movimiento según el número de fila
    let direccion = fila % 2 === 0 ? 1 : -1;//las filas pares se mueven hacia un lado y las impares hacia el contrario
    
    let velocidad = 0.018 + (fila % 4) * 0.004; //una velocidad diferente a cada fila

    let y = fila * altoFila + 7;//calcula la posición vertical de cada fila, se multiplica el número de fila por la separación entre filas y se suman 7 píxeles para ajustar su posición.

    // seleccionar una secuencia para cada fila
    // se utiliza % para repetir las secuencias disponibles
    let contenido = secuencias[fila % secuencias.length];

    let secuencia = contenido.repeat(8); // Repetir ocho veces para crear una cadena de texto larga y continua 

    let anchoFila = textWidth(secuencia);//ancho total de la secuencia de texto en píxeles

    let desplazamiento = (tiempo * velocidad * direccion) % anchoFila;//cuánto se ha desplazado el texto según el tiempo,la velocidad y la dirección del movimiento
    
//si el desplazamiento es negativo, lo convierte en positivo para mantenerlo dentro del rango del ancho de la secuencia
    if (desplazamiento < 0) { 
      desplazamiento += anchoFila;
    }
//brillo del texto
    //variación de brillo mediante la función seno
//el brillo cambia suavemente según el tiempo y la fila
    let brillo = 185 + sin(tiempo * 0.0015 + fila * 0.4) * 35;

    fill(0, brillo, 55);//color verde del texto utilizando el brillo calculado

    // Dos copias para mantener el movimiento continuo
    //primera copia de la secuencia según el desplazamiento calculado
    text(secuencia, -desplazamiento, y);
    //segunda copia al final de la primera para evitar espacios vacíos y mantener la continuidad del movimiento
    text(secuencia, anchoFila - desplazamiento, y);
  }

//lineas del monitor antiguo efecto CRT
  // comienza en altura max del lienzo, avanzando de 3 en 3 píxeles
  for (let y = 0; y < height; y += 3) {
    fill(0, 0, 0, 28);//color y transparencia
    rect(0, y, width, 1); //linea horizontal de 1 px y ancho del lienzo 
  }

//instruccion enter, letrero 
  if (tiempo > 2200 && floor(millis() / 550) % 2 === 0) {
    fill(0, 8, 2, 220);//color rectangulo y transparencia
    rect(55, 350, 290, 24); //rectangulo 

    stroke(30, 180, 65, 130); // color contorno rectangulo
    noFill();//sin relleno 
    rect(55, 350, 290, 24);//contorno del rectángulo en la misma posición y tamaño
    noStroke();//sin bordes 

    textAlign(CENTER, CENTER); //alineacion
    textSize(9);//tamaño
    fill(100, 255, 125); //color texto

    text("PRESS ENTER TO ENTER THE UNIVERSE_", width / 2, 362); //texto
  }
}

//transicion al escritorio
function dibujarTransicionEscritorio() {
  //tiempo ranscurrido desde que comenzó la transición
  let tiempo = millis() - tiempoTransicion;

  //primer momento texto acelerandose 
  // comprueba si han transcurrido menos de 350 milisegundos
  if (tiempo < 350) {
    background(0, 5, 1);//fondo

    textFont("monospace"); //font 
    textAlign(LEFT, CENTER);//alineacion
    textSize(12);//tamaño
    noStroke();// sin bordes 

    let secuencias = [
      "TEMATTÓ ERROR SYSTEM 010101 DATA MEMORY 0xFF ",
      "TEMATTÓ 010101 TEMATTÓ SYSTEM ERROR 110010 ",
      "SYSTEM TEMATTÓ DATA 0xFF MEMORY ERROR 010101 ",
      "TEMATTÓ MEMORY ERROR 0xA09F SYSTEM DATA ",
    ];//texto

    //repite el proceso 28 veces para generar 28 filas de texto
    for (let fila = 0; fila < 28; fila++) {
      let direccion = fila % 2 === 0 ? 1 : -1;// Alterna la dirección del movimiento, pares hacia la derecha y las impares hacia la izquierda

      // La velocidad aumenta progresivamente con el tiempo
      let velocidad = 0.025 + tiempo * 0.0012;

      //repeticion de secuencias 
       //selecciona una secuencia de texto diferente para cada fila
      let contenido = secuencias[fila % secuencias.length];
      let secuencia = contenido.repeat(8);//repite ocho veces el contenido para formar una cinta de texto continua
      let anchoFila = textWidth(secuencia);//calcula el ancho total de la secuencia de texto en píxeles.

      //desplazamiento texto
      let desplazamiento = (tiempo * velocidad * direccion) % anchoFila;//cuánto se desplaza el texto según el tiempo

       //comprueba si el desplazamiento es negativo
      if (desplazamiento < 0) {
        desplazamiento += anchoFila;//ajusta el desplazamiento para mantenerlo dentro del ancho de la secuencia
      }
//tetxo
      fill(0, 220, 65);//color
      text(secuencia, -desplazamiento, fila * 14 + 7);//primera copia de la secuencia según el desplazamiento calculado
      text(secuencia, anchoFila - desplazamiento, fila * 14 + 7);//egunda copia para mantener el movimiento continuo sin espacios vacíos
    }

    // Líneas rápidas de glitch
    //repite el proceso 12 veces para generar líneas de interferencia
    for (let i = 0; i < 12; i++) {
      let y = random(height);//selecciona una posición vertical aleatoria dentro del lienzo
      fill(0, 255, 100, 150);//color con transparencia 
      rect(0, y, width, random(1, 4));//linea horizontal
    }
  }

//destello blanco 
    //si han transcurrido menos de 470 milisegundos desde el inicio de la transición
  else if (tiempo < 470) {
    background(255);//fondo color blanco para el destello 
  }

//aparece escritorio
  else {
    //si ya han transcurrido 470 milisegundos o más, ejecuta la siguiente fase
    faseFinal = "escritorio";//cambia el estado de la experiencia a la fase del escritorio
    dibujarEscritorio();//función encargada de dibujar el escritorio del computador
  }
}

//escritorio windows y navegar en el mundo 
function dibujarEscritorio() {
  //valor de la variable escena para saber qué se debe mostrar
  switch (escena) {
    case 0:
      // Imagen escritorio
      image(escritorio, 0, 0, 400, 400);
      // imagen carpeta my universe
      image(carpeta, 59, 130, 22, 26);

      break;

    case 1:
      // imagen escritorio de fondo
      image(escritorio, 0, 0, 400, 400);

      // Ventana emergente
      image(ventana, 25, 60, 350, 270);

      break;
    //mundo hap
      //función que dibuja la ventana del mundo hap 
      //imagen correspondiente, el nombre de la canción y su color
    case 2:
      dibujarVentanaCancion(ventanahap, "hap", [20, 100, 90]);
      break;
    //mundo aaaa
    case 3:
      dibujarVentanaCancion(ventanaaaaa, "aaaa", [100, 40, 130]);
      break;
    //mundo r4r0
    case 4:
      dibujarVentanaCancion(ventanar4ro, "r4rO", [150, 50, 30]);
      break;
    //mundo samps
    case 5:
      dibujarVentanaCancion(ventanasamps, "samps", [20, 70, 150]);
      break;
  }
  
  // Mostrar ventana de información encima del mundo
  if (mostrarInfo) {
    dibujarVentanaInfo();
  }
}

//efecto CRT pantalla windows inicio para generar el efecto de antiguo
function dibujarCRT(opacidad) {
  stroke(0, 0, 0, opacidad);//color contorno y opacidad 
  strokeWeight(0.5);// grosor lineas

  //linea vertivcal que comienza dos píxeles después del borde superior y se hace una línea cada cuatro píxeles
  for (let y = pantallaY + 2; y < pantallaY + pantallaH; y += 4) {
    line(pantallaX, y, pantallaX + pantallaW, y);//linea de extremoa  extremo 
  }

  noStroke();//sin trazo
}
function dibujarMomentoCancion(nombre, momento, colorFondo) {
  push();//guarda estado actual 

  // Posición del recuadro blanco
  translate(10, 31);

  // Fondo que ocupa todo el espacio blanco
  noStroke();
  fill(colorFondo[0], colorFondo[1], colorFondo[2]);
  rect(0, 0, 380, 338);

  textFont("monospace");
  textAlign(CENTER, CENTER);

  // Número del momento
  fill(255);
  textSize(13);
  text("MOMENTO " + momento + " / 4", 190, 42);

  // Recuadro central
  noFill();
  stroke(255, 150);
  strokeWeight(1);
  rect(20, 85, 340, 175);

  // Nombre del momento
  noStroke();
  fill(255);
  textSize(17);

  if (momento === 1) {
    text("ENTRADA AL UNIVERSO", 190, 172);
  }

  if (momento === 2) {
    text("EXPLORACIÓN", 190, 172);
  }

  if (momento === 3) {
    text("TRANSFORMACIÓN", 190, 172);
  }

  if (momento === 4) {
    text("CLÍMAX", 190, 172);
  }

  // Instrucción inferior
  textSize(10);
  text("PRESS ENTER TO CONTINUE", 190, 315); //texto 

  pop();//estado anterior
}

function dibujarVentanaCancion(imagenVentana, nombre, color) {
  // Imagen de la ventana
  image(imagenVentana, 0, 0, 400, 384);

  // Recortar el contenido al espacio blanco
  drawingContext.save();

  drawingContext.beginPath();
  drawingContext.rect(10, 31, 380, 338);//rectángulo que establece los límites del espacio blanco donde aparecerá el contenido
  // x = 10, y = 31, ancho = 380, alto = 338.
  drawingContext.clip(); //recorta el área de dibujo para que lo que se dibuje después solo sean visibles dentro del rectángulo

  dibujarMomentoCancion(nombre, momento, color);// contenido interactivo del mundo musical lleva el nombre de la canción, el momento actual y el color correspondiente a ese mundo.

  drawingContext.restore();//restaura el contexto gráfico anterior y elimina el recorte para que no afecte los siguientes dibujos
}

function dibujarVentanaInfo() {
  // Fondo de la ventana
  fill(190, 190, 190);
  stroke(40);
  strokeWeight(2);
  rect(40, 75, 320, 245);

  // Barra azul superior
  fill(0, 0, 130);
  noStroke();
  rect(43, 78, 314, 32);

  // Título
  fill(255);
  textSize(12);
  textAlign(LEFT, CENTER);
  textFont("monospace");
  text("INFORMACIÓN DEL MUNDO", 55, 94);

  // Botón X
  fill(220);
  stroke(50);
  rect(335, 80, 20, 23);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(17);
  text("X", 345, 91);

  // Espacio vacío para la información
  fill(245);
  stroke(100);
  rect(65, 125, 270, 130);

  // Botón OK
  fill(210);
  stroke(30);
  rect(165, 278, 70, 28);

  fill(0);
  noStroke();
  textSize(13);
  text("OK", 200, 292);
}


function dibujarColapso(t) {

  //glitch explosivo 
  //durante los primeros 900 milisegundos se genera una explosión visual con destellos, franjas de colores y mensajes de error
  if (t < 900) {

    background(0); //fondo

    if (random() < 0.4) {
      background(255); //destellos blancos 
    }
//65 franjas rectangulares de colores aleatorios para la interferencia digital 
    for (let i = 0; i < 65; i++) {
      let y = random(384); //posiicon vertical 
      fill(random(255), random(255), random(255), 200);//color random opacidad 200 
      noStroke();// sin bordes 
      rect(random(-40, 40), y, random(150, 450), random(2, 9)); //recatngulos de 
    }

    textFont("monospace"); //font 
    textAlign(CENTER, CENTER);//alineacion
    textSize(25);//tamaño 
    fill(255); //color 

    for (let y = 35; y < 384; y += 42) {
      text("TEMATTÓ // SYSTEM ERROR", 200 + random(-20, 20), y);
    }

    textSize(20);
    fill(255, 0, 80);
    text("SYSTEM FAILURE", 200, 192);
  }

  //ventanas
  else if (t < 5700) {

    background(5);

    // Interferencias detrás de las ventanas
    for (let i = 0; i < 20; i++) {
      fill(random(255), random(100), random(255), 110);
      noStroke();
      rect(0, random(384), 400, random(2, 9));
    }

    let ventanas = [
      {x: -5, y: 5, w: 180, h: 88},
      {x: 100, y: 12, w: 170, h: 82},
      {x: 235, y: 18, w: 175, h: 88},
      {x: 25, y: 65, w: 165, h: 82},
      {x: 180, y: 75, w: 190, h: 90},
      {x: -15, y: 135, w: 180, h: 88},
      {x: 115, y: 145, w: 170, h: 82},
      {x: 260, y: 145, w: 175, h: 88},
      {x: 25, y: 210, w: 190, h: 90},
      {x: 175, y: 215, w: 165, h: 82},
      {x: 275, y: 225, w: 170, h: 85},
      {x: -10, y: 285, w: 180, h: 88},
      {x: 110, y: 290, w: 175, h: 85},
      {x: 245, y: 295, w: 185, h: 88},
      {x: 55, y: 35, w: 155, h: 78},
      {x: 205, y: 105, w: 180, h: 88},
      {x: 70, y: 170, w: 170, h: 82},
      {x: 190, y: 255, w: 185, h: 88},
      {x: 0, y: 95, w: 165, h: 82},
      {x: 145, y: 25, w: 180, h: 88},
      {x: 225, y: 185, w: 170, h: 82},
      {x: 35, y: 255, w: 180, h: 88},
      {x: 155, y: 320, w: 175, h: 82},
      {x: 280, y: 75, w: 165, h: 82},
      {x: 85, y: 115, w: 185, h: 88},
      {x: 15, y: 325, w: 170, h: 82},
      {x: 210, y: 315, w: 180, h: 88},
      {x: 115, y: 200, w: 165, h: 82},
      {x: 300, y: 265, w: 175, h: 85},
      {x: 65, y: 5, w: 185, h: 88}
    ];

    let mensajes = [
      "SYSTEM ERROR",
      "TEMATTO.EXE",
      "NOT RESPONDING",
      "UNKNOWN WORLD",
      "SYSTEM OVERLOAD",
      "FILE CORRUPTED",
      "MEMORY FAILURE",
      "ERROR 404",
      "FATAL ERROR",
      "DATA LOST",
      "TOO MANY WORLDS",
      "PROGRAM CRASH",
      "WARNING",
      "REBOOT FAILED",
      "SYSTEM BLOCKED",
      "VIRUS DETECTED",
      "WORLD COLLAPSE",
      "NO MEMORY LEFT",
      "AUDIO FAILURE",
      "UNKNOWN SIGNAL",
      "FILE NOT FOUND",
      "MEMORY FULL",
      "TEMATTO ERROR",
      "SYSTEM FROZEN",
      "DATA OVERLOAD",
      "FATAL EXCEPTION",
      "UNIVERSE LOST",
      "ACCESS DENIED",
      "CRITICAL ERROR",
      "GOODBYE SYSTEM"
    ];

    // Una ventana nueva cada 150 milisegundos
    let cantidad = min(30, floor((t - 900) / 150) + 1);
    cantidad = max(0, cantidad);

    for (let i = 0; i < cantidad; i++) {
      dibujarVentanaError(
        ventanas[i].x,
        ventanas[i].y,
        ventanas[i].w,
        ventanas[i].h,
        mensajes[i]
      );
    }
  }

  // FASE 3: TODO SE CONGELA
  else if (t < 6500) {

    background(5);

    let ventanas = [
      {x: -5, y: 5, w: 180, h: 88},
      {x: 100, y: 12, w: 170, h: 82},
      {x: 235, y: 18, w: 175, h: 88},
      {x: 25, y: 65, w: 165, h: 82},
      {x: 180, y: 75, w: 190, h: 90},
      {x: -15, y: 135, w: 180, h: 88},
      {x: 115, y: 145, w: 170, h: 82},
      {x: 260, y: 145, w: 175, h: 88},
      {x: 25, y: 210, w: 190, h: 90},
      {x: 175, y: 215, w: 165, h: 82},
      {x: 275, y: 225, w: 170, h: 85},
      {x: -10, y: 285, w: 180, h: 88},
      {x: 110, y: 290, w: 175, h: 85},
      {x: 245, y: 295, w: 185, h: 88},
      {x: 55, y: 35, w: 155, h: 78},
      {x: 205, y: 105, w: 180, h: 88},
      {x: 70, y: 170, w: 170, h: 82},
      {x: 190, y: 255, w: 185, h: 88},
      {x: 0, y: 95, w: 165, h: 82},
      {x: 145, y: 25, w: 180, h: 88},
      {x: 225, y: 185, w: 170, h: 82},
      {x: 35, y: 255, w: 180, h: 88},
      {x: 155, y: 320, w: 175, h: 82},
      {x: 280, y: 75, w: 165, h: 82},
      {x: 85, y: 115, w: 185, h: 88},
      {x: 15, y: 325, w: 170, h: 82},
      {x: 210, y: 315, w: 180, h: 88},
      {x: 115, y: 200, w: 165, h: 82},
      {x: 300, y: 265, w: 175, h: 85},
      {x: 65, y: 5, w: 185, h: 88}
    ];

    let mensajes = [
      "SYSTEM ERROR", "TEMATTO.EXE", "NOT RESPONDING",
      "UNKNOWN WORLD", "SYSTEM OVERLOAD", "FILE CORRUPTED",
      "MEMORY FAILURE", "ERROR 404", "FATAL ERROR",
      "DATA LOST", "TOO MANY WORLDS", "PROGRAM CRASH",
      "WARNING", "REBOOT FAILED", "SYSTEM BLOCKED",
      "VIRUS DETECTED", "WORLD COLLAPSE", "NO MEMORY LEFT",
      "AUDIO FAILURE", "UNKNOWN SIGNAL", "FILE NOT FOUND",
      "MEMORY FULL", "TEMATTO ERROR", "SYSTEM FROZEN",
      "DATA OVERLOAD", "FATAL EXCEPTION", "UNIVERSE LOST",
      "ACCESS DENIED", "CRITICAL ERROR", "GOODBYE SYSTEM"
    ];

    // Mantener las 30 ventanas visibles
    for (let i = 0; i < 30; i++) {
      dibujarVentanaError(
        ventanas[i].x,
        ventanas[i].y,
        ventanas[i].w,
        ventanas[i].h,
        mensajes[i]
      );
    }
  }

 
  // FASE 4: DESTELLO BLANCO
  else if (t < 6750) {

    background(255);

  }

  // FASE 5: EL COMPUTADOR VUELVE A APARECER
  else if (t < 8250) {

    background(0);

    // Mostrar nuevamente el computador
    image(computador, 0, 0, 400, 384);

    // Pantalla negra: el sistema se dañó
    noStroke();
    fill(0);
    rect(pantallaX, pantallaY, pantallaW, pantallaH);

    // Últimos parpadeos de la pantalla
    if (random() < 0.08) {
      fill(255);
      rect(pantallaX, pantallaY, pantallaW, pantallaH);
    }

  }

  // FINAL: COMPUTADOR APAGADO
  else {

    estado = "apagado";

  }
}


// VENTANAS DE ERROR
function dibujarVentanaError(x, y, w, h, mensaje) {

  push();

  // Sombra
  noStroke();
  fill(0);
  rect(x + 5, y + 5, w, h);

  // Cuerpo gris
  fill(190, 190, 190);
  stroke(40);
  strokeWeight(2);
  rect(x, y, w, h);

  // Barra azul
  fill(0, 0, 150);
  noStroke();
  rect(x + 2, y + 2, w - 4, 18);

  // Título
  fill(255);
  textFont("monospace");
  textAlign(LEFT, CENTER);
  textSize(9);
  text("SYSTEM WARNING", x + 6, y + 11);

  // Triángulo amarillo
  fill(255, 215, 0);
  stroke(20);
  strokeWeight(1.5);
  triangle(
    x + 13, y + 29,
    x + 27, y + 55,
    x + 2, y + 55
  );

  // Signo de admiración
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text("!", x + 14, y + 45);

  // Mensaje
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(8);
  text(mensaje, x + 34, y + 40);

  // Botón
  fill(210);
  stroke(50);
  rect(x + 75, y + 57, 60, 16);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(8);
  text("IGNORE", x + 105, y + 65);

  pop();
}





  
//interraciones tecaldo y mouse
function mousePressed() {
  //interraciones en el escritorio 
  //computador prendido y que este en escritorio
  if (estado === "encendido" && faseFinal === "escritorio") {
    //abrir carpeta my universe 
    if (escena === 0) {
      //click dentro del area de la carpeta 
      if (mouseX > 59 && mouseX < 81 && mouseY > 125 && mouseY < 156) {
        escena = 1; //cambia a la escena 1 para mostrar la ventana emergente
        return false;// detiene el comportamiento predeterminado del clic
      }
    }

    //ventana emergente my universe 
    else if (escena === 1) {
      //cerrar ventana emergente/carpeta
      //comprobar que el click este en el area del boton x
      if (mouseX >= 350 && mouseX <= 375 && mouseY >= 62 && mouseY <= 88) {
        escena = 0;//regresa al escritorio 
        return false;
      }
//carpetas de las canciones 
      // Comprueba si el clic está dentro del área del icono de la carpeta 
      //abrir hap
      if (mouseX > 62 && mouseX < 105 && mouseY > 178 && mouseY < 220) {
        escena = 2; //mundo hap 
        momento = 1;//inicia recorrido desde el primer momento 
        return false;
      }

      //abrir aaaa
      if (mouseX > 137 && mouseX < 179 && mouseY > 178 && mouseY < 220) {
        escena = 3; //mundo aaaa
        momento = 1;
        return false;
      }

      // abrir r4ro
      if (mouseX > 212 && mouseX < 254 && mouseY > 178 && mouseY < 220) {
        escena = 4;//mundo r4ro
        momento = 1;
        return false;
      }

      //abrir samps 
      if (mouseX > 287 && mouseX < 329 && mouseY > 178 && mouseY < 220) {
        escena = 5;//mundo samps 
        momento = 1;
        return false;
      }
    }

   //interraciones de los 4 mundos 
    else if (escena >= 2 && escena <= 5) {

      // SI LA VENTANA DE INFORMACIÓN ESTÁ ABIERTA
      if (mostrarInfo) {

        // BOTÓN OK
        if (mouseX >= 165 && mouseX <= 235 &&
            mouseY >= 278 && mouseY <= 306) {
          mostrarInfo = false;
          return false;
        }

        // BOTÓN X DE LA VENTANA DE INFORMACIÓN
        if (mouseX >= 335 && mouseX <= 355 &&
            mouseY >= 80 && mouseY <= 103) {
          mostrarInfo = false;
          return false;
        }

        // No permitir otros clics mientras está abierta
        return false;
      }

      // BOTÓN ? PARA ABRIR INFORMACIÓN
      if (mouseX >= 379 && mouseX <= 389 &&
          mouseY >= 0 && mouseY <= 22) {
        mostrarInfo = true;
        return false;
      }

      // BOTÓN X PARA CERRAR EL MUNDO
      if (mouseX >= 390 && mouseX <= 400 &&
          mouseY >= 0 && mouseY <= 22) {
        escena = 1;
        momento = 1;
        mostrarInfo = false;
        return false;
      }
    }
  }

  //boton fisico del compuatdor prende y apagar 
  //define área rectangular donde se encuentra el botón de encendido
  // BOTÓN FÍSICO DEL COMPUTADOR: PRENDER Y APAGAR

  let dentroDelBoton =
    mouseX >= 320 && mouseX <= 365 &&
    mouseY >= 335 && mouseY <= 380;

  if (dentroDelBoton) {

    // Si el computador está apagado, lo prendemos
    if (estado === "apagado") {

      estado = "encendido";
      tiempoEncendido = millis();

      faseFinal = "tipografia";
      inicioTipografia = 0;

      // Regresa al escritorio inicial
      escena = 0;
      momento = 1;
      mostrarInfo = false;

      mundosCompletados = [];

    } else {

      // Si está prendido, lo apagamos
      estado = "apagado";

    }

    return false;
  }
}

//enter para pasar al escritorio
function keyPressed() {

  if (keyCode === ENTER || key === "Enter") {

    // Pasar de la tipografía al escritorio
    if (estado === "encendido" && faseFinal === "tipografia") {

      faseFinal = "transicion";
      tiempoTransicion = millis();

    }

    // Avanzar por los momentos de cada mundo
    else if (
      estado === "encendido" &&
      faseFinal === "escritorio" &&
      escena >= 2 &&
      escena <= 5
    ) {

      if (momento < 4) {

        momento++;

      } else {

        // Registrar el mundo como completado
        if (!mundosCompletados.includes(escena)) {
          mundosCompletados.push(escena);
        }

        momento = 1;

        // Comprobar si ya se completaron los cuatro mundos
        if (mundosCompletados.length === 4) {

          faseFinal = "colapso";
          inicioColapso = millis();

        } else {

          escena = 1;

        }
      }
    }

    return false;
  }
}