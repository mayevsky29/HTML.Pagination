//коли DOM дерово готове

window.onload = function () {
    const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/;
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    var number = 1;

    var txtLastName = document.getElementById("txtLastName");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtEmail = document.getElementById("txtEmail");
    var fileImage = document.getElementById("fileImage");
    var imgPhoto = document.getElementById("imgPhoto");
    var selectImageBase64 = document.getElementById("selectImageBase64");

    fileImage.onchange = function (e) {
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files && files[0]) {
            const file = files[0];
            console.log(file.type);

            if (file.type.match(/^image\//)) {
                const file_name = file.name;
                const reader = new FileReader();
                reader.onload = function () {
                    imgPhoto.src = reader.result;
                    selectImageBase64.value = reader.result;
                    showSuccess(fileImage);
                }

                reader.readAsDataURL(file);
            }
            else {
                alert("Невірний тип файлу");
            }
        }
        else {
            alert("Будь ласка виберіть файл");
        }

    };


    IMask(
        txtPhone, {
        mask: '+00(000) 000 00 00'
    });

    var btnAddNewUser = document.getElementById("btnAddNewUser");
    var btnAddUserSave = document.getElementById("btnAddUserSave");


    var tbodyUsers = document.getElementById("tbodyUsers");
    btnAddNewUser.onclick = function (e) {
        $("#myModal").modal("show");
    };

    txtLastName.oninput = isValidTextInput;
    txtName.oninput = isValidTextInput;
    txtEmail.oninput = isValidEmailInput;
    txtPhone.oninput = isValidPhoneInput;

    btnAddUserSave.onclick = function (e) {

        if (isValidation()) {
           
            var lastName = txtLastName.value;
            var name = txtName.value;
            var phone = txtPhone.value;
            //console.log("txtLastName", lastName);
            //console.log("txtName", name);
            //console.log("txtPhone", phone);
            var tr = document.createElement("tr");
            tr.innerHTML = `
                            <th scope="row">${number++}</th>
                            <td><img src="${selectImageBase64.value}" width="30" height="30"/></td>
                            <td>${lastName}</td>
                            <td>${name}</td>
                            <td>${phone}</td>
                            <td>
                                <i class="fa fa-pencil fa-2x text-info cursor-pointer"
                                    aria-hidden="true"
                                    onclick="EditUser(this)"></i>
                                <i class="fa fa-times fa-2x text-danger cursor-pointer"
                                    aria-hidden="true"
                                    onclick="DeleteRow(this)"></i>
                            </td>
                        `;

            txtLastName.value = txtName.value = txtPhone.value = "";
            $("#myModal").modal("hide");

            tbodyUsers.appendChild(tr);
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

        if (!regex_phone.test(txtPhone.value)) {
            showError(txtPhone);
            isValid = false;
        }
        else {
            showSuccess(txtPhone);
        }

        if (selectImageBase64.value == "") {
            showError(fileImage);
            isValid = false;
        }
        else {
            showSuccess(fileImage);
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

//DragAndDrop

var draganddrop = document.getElementById('draganddrop');
draganddrop.addEventListener('dragenter', DragIn, false);
draganddrop.addEventListener('dragover', DragIn, false);

draganddrop.addEventListener('dragleave', DragOut, false);
draganddrop.addEventListener('drop', DragOut, false);


draganddrop.addEventListener('dragenter', PreventDefaults, false);
draganddrop.addEventListener('dragover', PreventDefaults, false);

draganddrop.addEventListener('dragleave', PreventDefaults, false);
draganddrop.addEventListener('drop', PreventDefaults, false);

draganddrop.addEventListener('drop', SaveImage, false);

function DragIn(e) {
    draganddrop.classList.add('dragIn');
}

function DragOut(e) {
    draganddrop.classList.remove('dragIn');
}

function PreventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function SaveImage(e) {
    var files;
    if (e.files) {
        files = e.files;
    } else if (e.dataTransfer) {
        files = e.dataTransfer.files;
    }

    if (files) {
        if (files[0]) {
            var file = files[0];
            imgPhoto.files = files;
            isValidImage(imgPhoto);
        }
    }
}



function DeleteRow(e) {
    var tbodyUsers = document.getElementById('tbodyUsers');

    bootbox.confirm("Ви точно хочете видалити об'єкт?", function (result) {
        if (result) {
            tbodyUsers.removeChild(e.parentElement.parentElement);
        }
    });
}

function Fail(inputTag) {
    inputTag.classList.add("is-invalid");
    inputTag.classList.remove("is-valid");
}

function Success(inputTag) {
    inputTag.classList.add("is-valid");
    inputTag.classList.remove("is-invalid");
}


function updateCount(tbodyUsers) {
    var rows = tbodyUsers.rows;
    for (var i = 0; i < rows.length; i++) {
        rows.item(i).cells[0].innerHTML = i + 1;
    }
    number--;
}

function EditUser(e) {
    var txtLastName = document.getElementById("txtLastName");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtEmail = document.getElementById("txtEmail");
    var selectImageBase64 = document.getElementById("selectImageBase64");

    var btnSaveChanges = document.getElementById('btnSaveChanges');
    var modalHeader = document.getElementById('modalHeader');

    var tr = e.parentElement.parentElement;

    btnSaveChanges.tag = tr;
    btnSaveChanges.onclick = UpdateTableRow;
    modalHeader.innerHTML = "Редагувати користувача";

    var closeModal = document.getElementById('closeModal');
    closeModal.onclick = UpdateTableRowClose;

    txtName.value = tr.cells[2].innerHTML;
    txtName.classList.add('is-valid');

    txtLastName.value = tr.cells[3].innerHTML;
    txtLastName.classList.add('is-valid');

    txtPhone.value = tr.cells[4].innerHTML;
    txtPhone.classList.add('is-valid');

    txtEmail.value = tr.cells[5].innerHTML;
    txtEmail.classList.add('is-valid');

    imgModal.src = tr.cells[1].firstChild.src;
    selectImageBase64.classList.add("is-valid");

    $('#myModal').modal("show");

    //ReloadModal(e);
}

function ReloadModal(e) {

}

function RemoveValidation() {
    myForm.reset();
    imgModal.src = "/images/no-image.png";
    inputImgHidden.value = "";

    txtName.classList.remove("is-valid");
    txtName.classList.remove("is-invalid");

    txtLastName.classList.remove("is-valid");
    txtLastName.classList.remove("is-invalid");

    txtPhone.classList.remove("is-valid");
    txtPhone.classList.remove("is-invalid");

    txtEmail.classList.remove("is-valid");
    txtEmail.classList.remove("is-invalid");

    selectImageBase64.classList.remove("is-valid");
    selectImageBase64.classList.remove("is-invalid");

}

function UpdateTableRow(e) {
    var txtName = document.getElementById('txtName');
    var txtLastName = document.getElementById('txtLastName');
    var txtPhone = document.getElementById('txtPhone');
    var txtEmail = document.getElementById('txtEmail');
    var imgModal = document.getElementById('imgModal');


    if (isValidationWithoutImage() && isValidImageWithoutRequired(document.getElementById('selectImageBase64'))) {
        var modalHeader = document.getElementById('modalHeader');
        modalHeader.innerHTML = "Додати нового користувача";

        var closeModal = document.getElementById('closeModal');
        closeModal.onclick = RemoveValidation;
        var tr = e.target.tag;
        tr.cells[1].firstChild.src = imgModal.src;
        tr.cells[2].innerHTML = txtName.value;
        tr.cells[3].innerHTML = txtLastName.value;
        tr.cells[4].innerHTML = txtPhone.value;
        tr.cells[5].innerHTML = txtEmail.value;

        var btnSaveChanges = document.getElementById('btnSaveChanges');
        btnSaveChanges.onclick = btnSaveChangesClick;
        RemoveValidation();
        $('#myModal').modal("hide");
    }
}

function UpdateTableRowClose() {
    var modalHeader = document.getElementById('modalHeader');
    modalHeader.innerHTML = "Додати нового користувача";

    var closeModal = document.getElementById('closeModal');
    closeModal.onclick = RemoveValidation;


    var btnSaveChanges = document.getElementById('btnSaveChanges');
    btnSaveChanges.onclick = btnSaveChangesClick;
    RemoveValidation();
    $('#myModal').modal("hide");
}





function ChangeRow(tr) {
    var mainForm = document.getElementById('mainForm');
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtLastname = document.getElementById("txtLastname");
    var txtMail = document.getElementById("txtMail");

    if (mainForm.checkValidity() === true) {
        tr.cells.item(1).innerHTML = txtName.value;
        tr.cells.item(2).innerHTML = txtLastname.value;
        tr.cells.item(3).innerHTML = txtPhone.value;
        tr.cells.item(4).innerHTML = txtMail.value;
        $('#registerModal').modal('hide');
        txtName.value = txtPhone.value = txtLastname.value = txtMail.value = "";
    }
}