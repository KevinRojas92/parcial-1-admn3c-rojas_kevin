'use strict';

let sueldoTotal, porcentajeSueldoU1, porcentajeSueldoU2;

Vue.component ('sueldosUsuarios', {
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
                }
            }
        }
    }
});

Vue.component ('agregarNuevaFactura', {
    template: `
        <button class="separacion_contenedores" @click="agregarNueva">Agregar nueva factura</button>
    `,

    props: [],

    data: function () {
        return {
            modal: false
        }
    },

    methods: {
        calcularPorcentajes () {
            sueldoTotal = parseFloat(this.sueldoU1) + parseFloat(this.sueldoU2);

            porcentajeSueldoU1 = (parseFloat(this.sueldoU1) * 100) / sueldoTotal;

            porcentajeSueldoU2 = (parseFloat(this.sueldoU2) * 100) / sueldoTotal;
        },

        agregarNueva () {
            if (localStorage.length > 0) {
                this.sueldosLocal = JSON.parse(localStorage.getItem("sueldos"));
    
                this.sueldoU1 = this.sueldosLocal.sueldoU1;
                this.sueldoU2 = this.sueldosLocal.sueldoU2;

                this.cambiarModal();

                this.calcularPorcentajes();
            } else {
                alert("Recuerda que antes de agregar una nueva factura debes ingresar los sueldos de cada usuario");
                console.log("no hay datos");
            }
        },

        cambiarModal () {
            this.modal = true;
            this.$emit("mostrar-modal", this.modal);
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
    },

    mounted () {
        if (localStorage.length > 0) {
            this.sueldosLocal = JSON.parse(localStorage.getItem("sueldos"));

            let facturasStorage = JSON.parse(localStorage.getItem("facturas"));

            if (this.sueldosLocal.length > 0) {
                this.sueldoU1 = this.sueldosLocal.sueldoU1;
                this.sueldoU2 = this.sueldosLocal.sueldoU2;
            } else if (facturasStorage.length > 0) {
                facturasStorage.forEach(element => {
                    this.allFacturas.push(element);
                    console.log(facturasStorage);
                });
            }
        } else {
            console.log("No hay datos en LocalStorage");
        }
    },

    methods: {
        agregar () {
            if (this.motivo == "" || this.valor == "") {
                if (this.motivo == "" && this.valor == "") {
                    alert("Por favor ingresa un motvio y un valor para esta factura");
                } else if (this.motivo == "") {
                    alert("Por favor ingresa un motvio para esta factura");
                } else if (this.valor == "") {
                    alert("Por favor ingresa un valor para esta factura");
                }
            } else {
                this.factura.razon = this.motivo;
                this.factura.precio = parseFloat(this.valor);
                this.factura.precioUsuario1 = (this.factura.precio * porcentajeSueldoU1) / 100;
                this.factura.precioUsuario2 = (this.factura.precio * porcentajeSueldoU2) / 100;

                this.allFacturas.push(this.factura);

                this.factura = {};

                console.log(this.allFacturas);

                localStorage.setItem("facturas", JSON.stringify(this.allFacturas));
                this.cerrar ();
            }
        },

        cerrar () {
            this.modal= false;
        },

        mostrarModal () {
            this.modal = true;
        },

        borrar (index) {
            this.allFacturas.splice(index, 1);

            localStorage.removeItem("facturas");

            localStorage.setItem("facturas", JSON.stringify(this.allFacturas));
        },

        validacionMotivo () {
            if (!isNaN(this.motivo)) {
                alert("Estás ingresando un número. Por favor ingresa el motivo de esta factura");

                this.motivo = "";
            }
        }
    }
});