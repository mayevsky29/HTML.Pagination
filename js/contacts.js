//коли DOM дерово готове

window.onload = function () {
    var tt = 23;
    //var bb = "sdd" + tt;
    //alert(bb);
    var txtName = document.getElementById("txtName");
    var txtLastName = document.getElementById("txtLastName");
    var txtLastName = document.getElementById("txtLastName");
    var modalFullName = document.getElementById("modalFullName");
    var phoneNumber = document.getElementById("phoneNumber");
    var modalEmail = document.getElementById("modalEmail");

    var btnOk = document.getElementById("btnOk");
    btnOk.onclick = function (e) {
       

        modalFullName.innerHTML = txtName.value + txtLastName.value;
        phoneNumber.innerHTML = phone.value;
        modalEmail.innerHTML = txtEmail.value;




        $("#myModal").modal("show");
        e.preventDefault(); //Заборонити стандартну поведінку
        



    };
    

}