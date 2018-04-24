let validar_Registro = function () {
    let _valid = true;
    let _formValues = {};

    // $('form .error').remove();

    $('#name').each(function () {
        _formValues[this.name] = this.value;
        let validez_nombre = this.validity;

        if (validez_nombre.valueMissing) {
            $('#resultado').html('<div class="error">Introduce un nombre</div>');
            
        }

    });

    $('#lastname').each(function () {
        _formValues[this.name] = this.value;
        let validez_apellido = this.validity;
        if (validez_apellido.valueMissing) {
            $('#resultado').html('<div class="error">Introduce un apellido</div>');
            
        }
    });

    $('#email').each(function () {
        _formValues[this.name] = this.value;
        let validez_email = this.validity;
        if (validez_email.valueMissing) {
            $('#resultado').html('<div class="error">Introduce un correo</div>');
           
        }
        if (!validez_email.valid) {
            $('#mail').html('<div class="error">Introduce un Email Valido</div>');
            
        }
    });

    $('#pass').each(function () {
        _formValues[this.name] = this.value;
        let validez_pass = this.validity;
        let exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/;
        if (validez_pass.valueMissing) {
            $('#resultado').html('<div class="error">Introduce un password</div>');
            
        }
        if (_formValues[this.name].length < 3) {
            $('#resultado').html('<div class="error">El password debe tener mas de 4 digitos</div>');
            
        }
        // if (_formValues[this.name] == exp) {
        //     $('#resultado').html('<div class="error">Debe contener un número</div>');
        // }
    });

    $('#repass').each(function () {
        _formValues[this.name] = this.value;
        let exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/;
        let validez_repass = this.validity;
        if (validez_repass.valueMissing) {
            $('#resultado').html('<div class="error">Vuelve a Introducir el password</div>');
           
        }
        if (_formValues[this.name].length < 3) {
            $('#resultado').html('<div class="error">El password debe tener mas de 4 digitos</div>');
           
        }
        // if (_formValues[this.name] == exp) {
        //     $('#resultado').html('<div class="error">Debe contener un número</div>');
        // }
    });

    if (_formValues.pass!=_formValues.repass){
        $('#resultado').html('<div class="error">Los passwords no coinciden</div>');
        
    }


        return { valid: _valid, values: _formValues };
}


$('#register').click(function (evnt) {
    evnt.preventDefault();
    let objeto=validar_Registro();
    console.log('objeto a enviar:',objeto);

    $.ajax({
        // url: 'http://www.mocky.io/v2/5ad782c73000005900e584a2', 
        url: 'http://www.mocky.io/v2/5ad789e63000006800e584c3', 
        method:'POST',
        data: objeto
    })
    .done(function (datoRecibido) {
        console.log('datoRecibido:',datoRecibido);
        if(datoRecibido.result){
            location.href='./register_confirm.html';
        }
            
        
    });
    
});

