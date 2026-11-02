const { createApp } = Vue;
createApp({

  data() {
    return {
      nombre: "",
      carrera: "",
      calificacion: null,
      carreras: ["Software", "Sistemas", "Electrónica", "Industrial"],
      cupoMaximo: 10,
      estudiantes: [],
      siguienteId: 1,

      filtroCarrera: "Todas",
      busqueda: "",
      filtroEstado: "todos"
    };
  },

  methods: {

    errorNombre() {

      if (this.nombre.length < 3) {
        return "El nombre debe tener al menos 3 letras";
      } 
      return "";
    },

    errorCarrera() {

      if (!this.carreras.includes(this.carrera)) {
        return "Debe elegir una carrera";
      }
      return "";
    },

    errorCalificacion() {

      if (typeof this.calificacion !== "number" || !Number.isFinite(this.calificacion) || 
      this.calificacion < 0 || this.calificacion > 10) {
        return "La calificación debe estar entre 0 y 10";
      } 
      return "";
    },

    esDuplicado() {
      
      const nombreBuscado = this.nombre.toLowerCase();

      return this.estudiantes.some(est => 

        est.nombre.toLowerCase() === nombreBuscado && 
        est.carrera === this.carrera

      );
    },

    formularioValido() {
       
      return (
        this.errorNombre() === "" &&
        this.errorCarrera() === "" &&
        this.errorCalificacion() === "" &&
        !this.esDuplicado() &&
        this.estudiantes.length < this.cupoMaximo
      );
    },

    cupoDisponible() {

      return this.cupoMaximo - this.estudiantes.length;
    },

    agregarEstudiante() {

      if (!this.formularioValido()) {
        return;
      }

      const nuevoEstudiante = {
        id: this.siguienteId,
        nombre: this.nombre,
        carrera: this.carrera,
        calificacion: this.calificacion
      };

      this.estudiantes.push(nuevoEstudiante);

      this.siguienteId++;

      this.nombre = "";
      this.carrera = "";
      this.calificacion = null;
    },

    colorNota(nota) {

      if (nota >= 6) {
        return "verde";
      }

      if (nota >= 4) {
        return "naranja";
      }

      return "rojo";
    },

    eliminarEstudiante(id) {
      this.estudiantes = this.estudiantes.filter(est =>
        est.id !== id
      );
    },

    actualizarCalificacion(id, cambio) {

      const estudiante = this.estudiantes.find(est =>
        est.id === id
      );

      if (!estudiante) {
        return;
      }

      const nuevaNota = estudiante.calificacion + cambio;

      if (nuevaNota >= 0 && nuevaNota <= 10) {
        estudiante.calificacion = nuevaNota;
      }

    },

    estudiantesFiltrados() {

      const texto = this.busqueda.toLowerCase();

      return this.estudiantes.filter(est => {

        const coincideCarrera =
        this.filtroCarrera === "Todas" ||
        est.carrera === this.filtroCarrera;

        const coincideNombre = 
        est.nombre.toLowerCase().includes(texto);

        let coincideEstado = true;

        if (this.filtroEstado === "aprobados") {
          coincideEstado = est.calificacion >= 6;
        }

        if (this.filtroEstado === "reprobados") {
          coincideEstado = est.calificacion < 6;
        }

        return (
          coincideCarrera &&
          coincideNombre &&
          coincideEstado
        );

      });
    },

    // RESUMEN 

    promedio() {

      if (this.estudiantes.length === 0) {
        return "0.0";
      }

      const suma = this.estudiantes.reduce(
        (total, est) => total + est.calificacion, 0
      );

      return (suma / this.estudiantes.length).toFixed(1);
    },

    contarAprobados() {

      return this.estudiantes.filter(est =>
        est.calificacion >= 6 
      ).length;
    },

    contarReprobados() {

      return this.estudiantes.filter(est =>
        est.calificacion < 6
      ).length;
    },

    mejorEstudiante() {

      if (this.estudiantes.length === 0) {
        return null;
      }

      return this.estudiantes.reduce((mejor, actual) => {

        if (actual.calificacion > mejor.calificacion) {
          return actual;
        }

        return mejor;
      });
    },

    borrarTodo() {
      this.estudiantes = [];
    }

  }

}).mount("#app");