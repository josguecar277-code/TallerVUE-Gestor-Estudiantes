const { createApp } = Vue;

createApp({
  data() {
    return {
      // Formulario (juliana)
      nombre: "",
      carrera: "",
      calificacion: null,
      carreras: ["Software", "Sistemas", "Electrónica", "Industrial"],
      cupoMaximo: 10,
      siguienteId: 5,

      // Filtros (jonathan)
      filtroCarrera: "Todas",
      busqueda: "",
      filtroEstado: "todos",

      // Estudiantes de prueba (bórralos al final)
     estudiantes: [
  { id: 1, nombre: "Ana", carrera: "Software", calificacion: 10 },
  { id: 2, nombre: "Luis", carrera: "Sistemas", calificacion: 3 },
  { id: 3, nombre: "Marta", carrera: "Electrónica", calificacion: 5 },
  { id: 4, nombre: "Pedro", carrera: "Industrial", calificacion: 8 }
]
    };
  },

  methods: {
    // metodos joanthan (punto 3 en adelante)
  }
}).mount("#app");