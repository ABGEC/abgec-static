function submitForm() {
  localStorage.clear();
  var noOfMembers=document.getElementById("members-count").value;
  var total = 5000 + noOfMembers * 3000;
  localStorage.setItem("totalAmount", total);
  localStorage.setItem("secondRun", "true");
  window.location.href = "./proceedPay.html";
}

window.onload = function () {
  if (localStorage.getItem("secondRun") == "true") {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})
    myModal.toggle()
  }
};

var form = document.querySelector('.pageclip-form')
Pageclip.form(form, {
  onSubmit: function (event) { },
  onResponse: function (error, response) {submitForm(); },
  successTemplate: '<span>Thank you!</span>'
})
