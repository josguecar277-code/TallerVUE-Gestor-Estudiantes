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

computed: {
  estudiantesFiltrados() {
    return this.estudiantes.filter(e => {
      const okCarrera = this.filtroCarrera === "Todas" || e.carrera === this.filtroCarrera;
      const okNombre = e.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      const okEstado =
        this.filtroEstado === "todos" ||
        (this.filtroEstado === "aprobados" && e.calificacion >= 5) ||
        (this.filtroEstado === "reprobados" && e.calificacion < 5);
      return okCarrera && okNombre && okEstado;
    });
  }
},

  methods: {
    // metodos joanthan (punto 3 en adelante)
    
  }
}).mount("#app");