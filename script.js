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

        factura: {},

        allFacturas: [],

        sueldos: {}
    },

    mounted () {
        this.guardarSueldos();
    },

    updated () {
        console.log('Se actualizó');
        this.guardarSueldos();
    },

    methods: {
        guardarSueldos () {
            if (!isNaN(this.sueldoU1)) {
                this.sueldos.usuario1 = this.sueldoU1;
            } else if (!isNaN(this.sueldoU2)) {
                this.sueldos.usuario2 = this.sueldoU2;
            } else {
                console.log('No es un número');
            }
        },

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