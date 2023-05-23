'use strict';

let sueldoTotal, porcentajeSueldoU1, porcentajeSueldoU2;

let app = new Vue ({
    el: '#main',

    data: {
        usuario1: 'Nombre Usuario 1',
        usuario2: 'Nombre Usuario 2',

        modal: false,

        sueldoU1: "Sueldo Usuario 1",
        sueldoU2: "Sueldo Usuario 2",

        motivo: "Motivo",
        valor: "Valor",

        factura: {
            razon: "",
            precio: 0,
            precioUsuario1: 0,
            precioUsuario2: 0
        },
        allFacturas: []
    },

    methods: {
        calcularPorcentajes: function () {
            sueldoTotal = parseFloat(this.sueldoU1) + parseFloat(this.sueldoU2);

            porcentajeSueldoU1 = (parseFloat(this.sueldoU1) * 100) / sueldoTotal;

            porcentajeSueldoU2 = (parseFloat(this.sueldoU2) * 100) / sueldoTotal;
        },

        agregarNueva: function () {
            this.modal= true;
            this.calcularPorcentajes();
        },

        agregar: function () {
            this.factura.razon = this.motivo;
            this.factura.precio = parseFloat(this.valor);
            this.factura.precioUsuario1 = (this.factura.precio * porcentajeSueldoU1) / 100;
            this.factura.precioUsuario2 = (this.factura.precio * porcentajeSueldoU2) / 100;

            this.allFacturas.push(this.factura);

            console.log(this.allFacturas);
            this.factura = [];
            this.cerrar ();
        },

        cerrar: function () {
            this.modal= false;
        },

        borrar: function () {
        }
    }
});