//коли DOM дерово готове

window.onload = function () {
    const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/;
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    var number = 1;

    var modalLastName = document.getElementById("modalLastName");
    var modalName = document.getElementById("modalName");
      
    var phoneNumber = document.getElementById("phoneNumber");
    var modalEmail = document.getElementById("modalEmail");

    IMask(
        phone, {
        mask: '+00(000) 000 00 00'
    });

    

    modalLastName.oninput = isValidTextInput;
    modalName.oninput = isValidTextInput;
    modalEmail.oninput = isValidEmailInput;
    phoneNumber.oninput = isValidPhoneInput;


    var btnOk = document.getElementById("btnOk");
    btnOk.onclick = function (e) {
        if (isValidation()) {

            modalLastName.innerHTML = txtLastName.value;
            modalName.innerHTML = txtName.value;
            //modalFullName.innerHTML = txtName.value + txtLastName.value;
            phoneNumber.innerHTML = phone.value;
            modalEmail.innerHTML = txtEmail.value;




            $("#myModal").modal("show");
            e.preventDefault(); //Заборонити стандартну поведінку



        }

    };

    function isValidTextInput(e) {
        if (e.target.value == "") {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }

    function isValidEmailInput(e) {
        if (!regex_email.test(e.target.value)) {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }


    function isValidPhoneInput(e) {

        if (!regex_phone.test(e.target.value)) {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }

    function isValidation() {

        var isValid = true;
        if (txtLastName.value == "") {
            showError(txtLastName);
            isValid = false;
        }
        else {
            showSuccess(txtLastName);
        }

        if (txtName.value == "") {
            showError(txtName);
            isValid = false;
        }
        else {
            showSuccess(txtName);
        }

        if (!regex_email.test(txtEmail.value)) {
            showError(txtEmail);
            isValid = false;
        }
        else {
            showSuccess(txtEmail);
        }

        if (!regex_phone.test(phone.value)) {
            showError(phone);
            isValid = false;
        }
        else {
            showSuccess(phone);
        }

        return isValid;
    }
    function showError(input) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
    function showSuccess(input) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
}