'use strict';

let sueldoTotal, porcentajeSueldoU1, porcentajeSueldoU2;

Vue.component ('sueldos-usuarios', {
    template: `
        <form action="" v-if="sueldoU1 =='Sueldo Usuario 1' && sueldoU2 =='Sueldo Usuario 2'">
            <div>
                <label for="usuario1">{{usuario1}}</label>
                <input id="usuario1" type="number" name="usuario1" :placeholder="sueldoU1" v-model="sueldoU1" @change="guardarSueldos">
            </div>
            
            <div style="margin-top: 25px;">
                <label for="usuario2" v-once>{{usuario2}}</label>
                <input id="usuario2" type="number" name="usuario2" :placeholder="sueldoU2" v-model="sueldoU2" @change="guardarSueldos">
            </div>
        </form>

        <form action="" v-else>
            <div>
                <label for="usuario1">{{usuario1}}</label>
                <input id="usuario1" type="number" name="usuario1" :placeholder="sueldosLocal.sueldoU1" v-model="sueldoU1" @change="guardarSueldos">
            </div>
            
            <div style="margin-top: 25px;">
                <label for="usuario2" v-once>{{usuario2}}</label>
                <input id="usuario2" type="number" name="usuario2" :placeholder="sueldosLocal.sueldoU2" v-model="sueldoU2" @change="guardarSueldos">
            </div>
        </form>
    `,

    props: ['usuario1', 'usuario2'],

    data: function () {
        return {
            sueldoU1: "Sueldo Usuario 1",
            sueldoU2: "Sueldo Usuario 2",

            sueldos: {},

            sueldosLocal: {}
        }
    },

    mounted () {
        if (localStorage.length > 0) {
            this.sueldosLocal = JSON.parse(localStorage.getItem("sueldos"));

            this.sueldoU1 = this.sueldosLocal.sueldoU1;
            this.sueldoU2 = this.sueldosLocal.sueldoU2;
        } else {
            console.log("no hay datos");
        }
    },

    methods: {
        guardarSueldos () {
            if (this.sueldoU1 != "Sueldo Usuario 1" || this.sueldoU2 != "Sueldo Usuario 2") {
                this.sueldos.sueldoU1 = this.sueldoU1;
                this.sueldos.sueldoU2 = this.sueldoU2;

                if (this.sueldos.sueldoU1 != "Sueldo Usuario 1" && this.sueldos.sueldoU2 != "Sueldo Usuario 2") {
                    localStorage.setItem("sueldos", JSON.stringify(this.sueldos));

                    this.obetenerLocalData ();
                }
            }
        }
    }
});

let app = new Vue ({
    el: '#main',

    data: {
        usuario1: 'Nombre Usuario 1',
        usuario2: 'Nombre Usuario 2',

        sueldoU1: "",
        sueldoU2: "",

        modal: false,

        motivo: "",
        valor: "",

        factura: {},

        allFacturas: [],

        sueldosLocal: {}
    },

    mounted () {
        if (localStorage.length > 0) {
            this.sueldosLocal = JSON.parse(localStorage.getItem("sueldos"));

            this.sueldoU1 = this.sueldosLocal.sueldoU1;
            this.sueldoU2 = this.sueldosLocal.sueldoU2;
        } else {
            console.log("no hay datos");
        }
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