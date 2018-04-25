let milogin = function () {
    let _isValid = document.getElementById('milogin').checkValidity();
    let outcome = {
        "isValid": _isValid,
        "values": {}
    };

    $('form .error').remove();

    //EMAIL
    $('#email').each(function () {
        let email = this.validity;

       
        if (email.valid) {
            outcome.values["email"] = this.value;
        } else {
            if (email.patternMismatch) {
                $('#email').before('<div class="error">Email incorrecto!</div>')
            }
            if (email.valueMissing) {
                $('#email').before('<div class="error">Rellene todos los campos!</div>')
            }
        }
    });

    //PASSWORD
    $('#password').each(function () {
        let passValidity = this.validity;
        //console.log(nameValidity);
        if (passValidity.valid) {
            outcome.values["password"] = this.value;

        } else if (passValidity.patternMismatch) {
            $('#password').before('<div class="error">Contraseña errónea!</div>')
        } else if (passValidity.valueMissing) {
            $('#password').before('<div class="error">Rellene todos los campos!</div>')
        }


    });

    return outcome;
}



$('#submitBtn').click(function (event) {
    event.preventDefault();
    let objeto = milogin();
    console.log('objeto a enviar:', objeto);
if(objeto.isValid)

    $.ajax({

        url: ' http://www.mocky.io/v2/5ae08e423200006f00510c70',
        method: 'POST',
        data: objeto

    })
        .done(function (datoRecibido) {
            console.log('datoRecibido:', datoRecibido);
            if (datoRecibido.result) {
               location.href = './login_confirm.html';
            }else{
                $('#password').before('<div class="error">usuario y Contraseña errónea!</div>')
            }


        });


});













//  $(document).ready(function(){
//      $("submitBtn").click(function(){
//          let email = $ ("#email").val();
//          let pass   = $ ("#password").val();

//          if(email == ""){
//              $("#mensaje1").fadeIn();
//              return false;
//         }else{
//             $("#mensaje1").fadeOut();
//             if(pass == ""){
//                 $("#mensaje2").fadeIn();
//                 return false;
//             }
//         }
//      })
//  })









// let milogin = function () {
//     let _valid = true;
//     let _formValues = {};

// $('#email').each(function () {
//     _formValues[this.name] = this.value;
//     let validez_email = this.validity;
//     if (validez_email.valueMissing) {
//         $('#ema').html('<div class="error">Introduce un correo</div>');

//     }
//     if (!validez_email.valid) {
//         $('#ema').html('<div class="error">Introduce un Email Valido</div>');

//     }
// });

// $('#password').each(function () {
//     _formValues[this.name] = this.value;
//     let validez_pass = this.validity;
//     let exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/;
//     if (validez_pass.valueMissing) {
//         $('#pass').html('<div class="error">Introduce un password</div>');

//     }
//     if (_formValues[this.name].length < 3) {
//         $('#pass').html('<div class="error">El password debe tener mas de 4 digitos</div>');

//     }

// });



// return { valid: _valid, values: _formValues };
// }


// $('#submitBtn').click(function (evnt) {
//     evnt.preventDefault();
//     let objeto=milogin();
//     console.log('objeto a enviar:',objeto);

//     $.ajax({
//         // url: 'http://www.mocky.io/v2/5ad782c73000005900e584a2', 
//         url: 'http://www.mocky.io/v2/5ae08f203200006d00510c72', 
//         method:'POST',
//         data: objeto
//     })
//     .done(function (datoRecibido) {
//         console.log('datoRecibido:',datoRecibido);
//         if(datoRecibido.result){
//             location.href='./register_confirm.html';
//         }


//     });

// });


