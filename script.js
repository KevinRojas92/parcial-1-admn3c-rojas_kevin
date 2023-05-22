'use strict';

let app = new Vue ({
    el: '#main',

    data: {
        usuario1: 'Nombre Usuario 1',
        usuario2: 'Nombre Usuario 2',

        modal: false,

        sueldoU1: "Sueldo Usuario 1",
        sueldoU2: "Sueldo Usuario 2",
    },

    methods: {
        calcularPorcentajes: function () {
            let sueldoTotal = parseFloat(this.sueldoU1) + parseFloat(this.sueldoU2);
            console.log(sueldoTotal);
        },

        agregarNueva: function () {
            this.modal= true;
        },

        cerrar: function () {
            this.model= false;
        },
    }
});