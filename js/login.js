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
                $('#mail_error').html('<p class="error">Email incorrecto!</p>')
            }
            if (email.valueMissing) {
                $('#mail_error').html('<p class="error">Rellene todos los campos!</p>')
            }
        }
    });

    //PASSWORD
    $('#password').each(function () {
        let passValidity = this.validity;
        console.log(passValidity);
        
        if (passValidity.valid) {
            outcome.values["password"] = this.value;
        }
        
        if (passValidity.valueMissing) {
            $('#pass_error').html('<p class="error">Rellene todos los campos!</p>')
        }
       
    });

    return outcome;
}



$('#submitBtn').click(function (event) {
    event.preventDefault();
    let objeto = milogin();
    if (objeto.isValid ) {
        $.ajax({
            url: 'http://www.mocky.io/v2/5ae0e1b63200007b00510d5a',
            method: 'POST',
            data: objeto
        }).done(function (datoRecibido) {
            if (datoRecibido.result) {
                sessionStorage.setItem('token', datoRecibido.token);
                let nombreUsuario = sessionStorage.getItem('nombreUsuario');
                sessionStorage.setItem('nombreUsuario', nombreUsuario ? nombreUsuario : 'Fina'); // seria null si no se paso por "registro"
                location.href = './login_confirm.html';
            } else {
                $('#pass_error').html('<p class="error">usuario y Contraseña errónea!</p>')
            }
        });
    }
});
