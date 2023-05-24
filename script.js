'use strict';

let sueldoTotal, porcentajeSueldoU1, porcentajeSueldoU2;

/*
Vue.component ('sueldos-usuarios', {
    template: `
        <form action="">
            <div>
                <label for="usuario1">{{usuario1}}</label>
                <input id="usuario1" type="number" name="usuario1" placeholder="Sueldo Usuario 1" v-model="sueldoU1">
            </div>
            
            <div style="margin-top: 25px;">
                <label for="usuario2" v-once>{{usuario2}}</label>
                <input id="usuario2" type="number" name="usuario2" placeholder="Sueldo Usuario 2" v-model="sueldoU2">
            </div>
        </form>
    `,

    props: ['usuario1', 'usuario2'],

    data: function () {
        return {
            sueldoU1: "Sueldo Usuario 1",
            sueldoU2: "Sueldo Usuario 2",
        }
    }
});
*/

let app = new Vue ({
    el: '#main',

    data: {
        usuario1: 'Nombre Usuario 1',
        usuario2: 'Nombre Usuario 2',

        sueldoU1: "Sueldo Usuario 1",
        sueldoU2: "Sueldo Usuario 2",

        modal: false,

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
        calcularPorcentajes () {
            sueldoTotal = parseFloat(this.sueldoU1) + parseFloat(this.sueldoU2);

            porcentajeSueldoU1 = (parseFloat(this.sueldoU1) * 100) / sueldoTotal;

            porcentajeSueldoU2 = (parseFloat(this.sueldoU2) * 100) / sueldoTotal;
        },

        agregarNueva () {
            this.modal= true;
            this.calcularPorcentajes();
        },

        agregar () {
            this.factura.razon = this.motivo;
            this.factura.precio = parseFloat(this.valor);
            this.factura.precioUsuario1 = (this.factura.precio * porcentajeSueldoU1) / 100;
            this.factura.precioUsuario2 = (this.factura.precio * porcentajeSueldoU2) / 100;

            this.allFacturas.push(this.factura);

            console.log(this.allFacturas);
            this.factura = [];
            this.cerrar ();
        },

        cerrar () {
            this.modal= false;
        },

        borrar () {
        }
    }
});