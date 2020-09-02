const form = document.getElementById("form");

// console.log(form)
const boton = document.getElementById("btn").addEventListener('click', validarForm)

const inputArray = document.querySelectorAll("#form input, select");
// console.log(inputArray);

// Const para mensajes de error
const divNombre = document.getElementById("msjNombre");
const divIdioma = document.getElementById("msjIdioma");
const divPais = document.getElementById("msjPais");
const divUsuario = document.getElementById("msjUsuario");
const divPass = document.getElementById("msjPass");
const divCpass = document.getElementById("msjCpass");
const divSx = document.getElementById('msjSx')
const divOcupacion = document.getElementById("msjOcupacion");
const divFecha = document.getElementById('msjFecha');

let min = 0
let max = 0

// constantes expresión regular para evaluar string
const regNombre = /^[a-zA-ZÁ-ÿ\s]{3,50}$/;
const regUsuario = /^[a-zA-Z0-9]{6,10}$/;

const formInfo = {
  nombre: '',
  idioma: '',
  pais: '',
  usuario: '',
  pass: '',
  sx: '',
  fecha: '',
  ocupacion: '',
  status: false


}

inputArray.forEach((input) => {
  if(input.id == 'sxFem' || input.id == 'sxMas'){
    input.addEventListener('change', validarSx)
  }else{
    input.addEventListener("keyup", validar);
    input.addEventListener("blur", validar);
  }
});

// Condicion para evaluar el event.keyCode
// if( (event.keyCode != 32) && ((event.keyCode < 65) || (event.keyCode > 90)) && (event.keyCode !=8 || event.keyCode!=16)){
//     console.log("No es letra")
// }

// console.log(regNombre.test(input.value));
function validar(event) {
  let contenido = event.target.value.toString().trim();
  let input = event.target;
  const mensajeLength = `Mínimo ${min} letras y Máxino ${max}`;
  const mensajeReg = `El valor escrito no corresponde al campo ${input.id}`;
  const mensajeCpass = 'Las contraseñas no son iguales'
  const mensajeFecha = 'Usuario menor de edad'

  switch (input.id) {
    case "nombre":

      validarCampo(contenido, input, regNombre, divNombre, 'nombre' , mensajeLength, mensajeReg)

      // if (contenido == "") {
      //   validaVacio(divNombre, input);
      //   formInfo.nombre = ''
      // } else if (contenido.length < 3 || contenido.length > 50) {
      //   max = 50
      //   min =3
      //   validarMsj(divNombre, input, false, mensajeLength);
      //   formInfo.nombre = ''
      // } else if (!regNombre.test(input.value)) {
      //   validarMsj(divNombre, input, false, mensajeReg);
      //   formInfo.nombre = ''
      // } else {
      //   validarMsj(divNombre, input, true);
      //   formInfo.nombre = (input.value).toString()
      // }

      break;

    case "idioma":
      if (input.value == "") {
        validaVacio(divIdioma);
        formInfo.idioma = ''
      } else {
        validarMsj(divIdioma, input, true);
        formInfo.idioma = (input.value).toString()
      }
      break;

    case "pais":
      validarCampo(contenido, input, regNombre, divPais, 'pais', mensajeLength, mensajeReg)
      // if (input.value == "") {
      //   validaVacio(divPais, input);
      //   formInfo.pais = ''
      // } else if (contenido.length < 3 || contenido.length > 50) {
      //   max = 50
      //   min = 3
      //   validarMsj(divPais, input, false, mensajeLength);
      //   formInfo.pais = ''
      // } else if (!regNombre.test(input.value)) {
      //   validarMsj(divPais, input, false, mensajeReg);
      //   formInfo.pais = ''
      // } else {
      //   validarMsj(divPais, input, true);
      //   formInfo.pais = (input.value).toString()
      // }
      break;

    case "usuario":

      validarCampo(contenido, input, regUsuario, divUsuario, 'usuario', mensajeLength, mensajeReg)


      // if (input.value == "") {
      //   validaVacio(divUsuario, input);
      //   formInfo.usuario = ''
      // } else if (!regUsuario.test(input.value)) {
      //   validarMsj(divUsuario, input, false, mensajeReg);
      //   formInfo.usuario = ''
      // } else {
      //   validarMsj(divUsuario, input, true);
      //   formInfo.usuario = (input.value).toString()
      // }
      break;

    case "pass":
      if (input.value == "") {
        validaVacio(divPass, input);
      }else if ((input.value).length < 6 || (input.value).length > 10){
        max = 10
        min = 6
        validarMsj(divPass, input, false, mensajeLength)
      } else{
        validarMsj(divPass, input, true)
      }
      break;

    case "cpass":
      if (input.value == "") {
        validaVacio(divCpass, input);
        formInfo.pass = ''
      }else if(input.value != document.getElementById('pass').value){
        validarMsj(divCpass, input, false, mensajeCpass)
        formInfo.pass = ''
      }else{
        validarMsj(divCpass, input, true)
        formInfo.pass = (input.value).toString()
      }
      break;
    
    case 'fecha':
      if (input.value == '') {
        validaVacio(divFecha, input )
        formInfo.fecha = ''
      }else{
        const adulto = validaFecha(input.value)
       if (adulto == true) {
         validarMsj(divFecha, input, adulto)
         formInfo.fecha = (input.value).toString()
       }else{
         validarMsj(divFecha, input, adulto, mensajeFecha )
         formInfo.fecha = ''
       }
      }
    break

    case "ocupacion":
      validarCampo(contenido, input, regNombre, divOcupacion, 'ocupacion', mensajeLength, mensajeReg)

      // if (input.value == "") {
      //   validaVacio(divOcupacion, input);
      //   formInfo.ocupacion = ''
      // }else if((input.value).length <3 || (input.value).length >50){
      //   min = 3
      //   max = 50
      //   validarMsj(divOcupacion, input, false, mensajeLength)
      //   formInfo.ocupacion = '' 
      // }else{
      //   validarMsj(divOcupacion,input, true)
      //   formInfo.ocupacion = (input.value).toString()
      // }
      break;
    }
}

function validarSx(event){
  formInfo.sx = event.target.value
}

function validaVacio(div, input) {
  div.classList.remove("d-none");
  div.classList = "d-block invalid-feedback";
  div.textContent = "Campo obligatorio";
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
}

function validarMsj(div, input, estado, Mensaje) {
  if (estado == false) {
    div.classList.remove("d-none");
    div.classList = "d-block invalid-feedback";
    div.textContent = `${Mensaje}`;
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    formInfo.status= false
  } else {
    div.classList.remove("d-block");
    div.classList.add("d-none");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}

function validaFecha(dato){
    const hoy = new Date()
    dato = dato.toString()
    // 0123456789 
    // 2020-01-31
    0
    //substr
//0   1   2   3   4   5   6   7   8   9   10  11
//ene feb mar abr may jun jul ago sep oct nov dic
    const datoDia = Number(dato.substring(8,10))
    const datoMes = Number(dato.substring(5,7))-1
    const datoAnio = Number(dato.substring(0,4))
    
    if(datoDia <= hoy.getDate() && datoMes <= hoy.getMonth() && datoAnio <= (hoy.getFullYear()-18)){
      return true
  }else{
    return false
  }
}

function validarForm(event){

  // Previene la acción por default de un elemento html
  event.preventDefault()

  if(formInfo.nombre == '' || formInfo.idioma == '' || formInfo.pais == '' || formInfo.usuario== '' || formInfo.pass == '' || formInfo.fecha == '' || formInfo.ocupacion == ''){
    formInfo.status= false
  }else{
    formInfo.status = true
  }

  contenidoModal(formInfo.status)

}

const modalDiv = document.createElement('div')
const modalBody = document.getElementById('body')
const modalFooter = document.getElementById('footer')

const modalButton = document.createElement('button')
modalButton.classList = 'btn btn-outline-success btn-block'
modalButton.innerText = 'Enviar informacón'

modalBody.appendChild(modalDiv)

function contenidoModal(estado){
  if(!estado){
    modalDiv.classList = 'alert alert-danger'
    modalDiv.innerText = 'Informacón incompleta o incorrecta'
    modalFooter.innerHTML = ''
  }else{
    modalDiv.classList = 'text-center'
    modalDiv.classList.remove('alert', 'alert-danger')
    modalDiv.innerHTML =  ''
    const modalNombre = document.createElement('p')
    modalNombre.innerHTML = `<b>Nombre:</b> ${formInfo.nombre}`
    
    const modalIdioma = document.createElement('p')
    modalIdioma.innerHTML = `<b>Idioma:</b> ${formInfo.idioma}`
    
    const modalPais = document.createElement('p')
    modalPais.innerHTML = `<b>Nombre:</b> ${formInfo.pais}`
    
    const modalUsuario = document.createElement('p')
    modalUsuario.innerHTML = `<b>Usuario:</b> ${formInfo.usuario}`
    
    const modalSx = document.createElement('p')
    modalSx.innerHTML = `<b>Sexo:</b> ${formInfo.sx}`
    
    const modalFecha = document.createElement('p')
    modalFecha.innerHTML = `<b>Fecha de nacimiento:</b> ${formInfo.fecha}`
    
    const modalOcup = document.createElement('p')
    modalOcup.innerHTML = `<b>Ocupación:</b> ${formInfo.ocupacion}`
    
    modalDiv.appendChild(modalNombre)
    modalDiv.appendChild(modalIdioma)
    modalDiv.appendChild(modalPais)
    modalDiv.appendChild(modalUsuario)
    modalDiv.appendChild(modalSx)
    modalDiv.appendChild(modalFecha)
    modalDiv.appendChild(modalOcup)

    modalFooter.appendChild(modalButton)
    
    modalButton.addEventListener('click', resetData)
  }
}

function resetData(){
  formInfo.nombre = formInfo.idioma = formInfo.pais = formInfo.usuario = formInfo.pass = formInfo.sx = formInfo.fecha = formInfo.ocupacion = ''
  formInfo.status = false
  form.submit()

}

function validarCampo(contenido, input, reg, divMensaje, propiedad, mensajeLength, mensajeReg){

  if (contenido == "") {
    validaVacio(divMensaje, input);
    validarObjeto(propiedad,'')
  } else if (contenido.length < 3 || contenido.length > 50) {
    max = 50
    min =3
    validarMsj(divMensaje, input, false, mensajeLength);
    validarObjeto(propiedad,'')
  } else if (!reg.test(input.value)) {
    validarMsj(divMensaje, input, false, mensajeReg);
    validarObjeto(propiedad,'')
  } else {
    validarMsj(divMensaje, input, true);
    validarObjeto(propiedad,(input.value).toString())
    // formInfo.propiedad = (input.value).toString()
  }
}

function validarObjeto(propiedad, valor){
  switch (propiedad){
    case 'nombre':
      formInfo.nombre = valor
    break
    case 'pais':
      formInfo.pais = valor
    break
    case 'usuario':
      formInfo.usuario = valor
    break
    case 'ocupacion':
      formInfo.ocupacion = valor
    break
  }    
}