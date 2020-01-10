
var estate_name = document.forms["vForm"]["estateName"];
var estate_description = document.forms["vForm"]["estateDescription"];

var error_name = document.getElementById("errorName");
var error_description = document.getElementById("errorDescription");

estate_name.addEventListener("blur", nameVerify, true);
estate_description.addEventListener("blur", descVerify, true);

function validateForm() {
  if (estate_name.value == "" || estate_name == null) {
    estate_name.style.border = "1px solid red";
    error_name.textContent = "Estate Name is required";
    estate_name.focus();
    return false;
  }
  if (estate_description.value == "" || estate_description == null) {
    estate_description.style.border = "1px solid red";
    error_description.textContent = "Estate Name is required";
    estate_description.focus();
    return false;
  }
}

function nameVerify() {
  if (estate_name.value != "") {
    estate_name.style.border = "1px solid #5E6E66";
    error_name.innerHTML = "";
    return true;
  }
}

function descVerify() {
  if (estate_description.value != "") {
    estate_description.style.border = "1px solid #5E6E66";
    error_description.innerHTML = "";
    return true;
  }
}