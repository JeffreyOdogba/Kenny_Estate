
var fullname = document.forms["cForm"]["fullname"];
var email = document.forms["cForm"]["email"];
var tel = document.forms["cForm"]["tel"];
var moreInformation = document.forms["cForm"]["moreInformation"];

var fullname_error = document.getElementById("fullnameError");
var email_error = document.getElementById("emailError");
var tel_error = document.getElementById("telError");
var moreInformation_error = document.getElementById("moreInformationError");

fullname.addEventListener("blur", fullnameVerify, true);
email.addEventListener("blur", emailVerify, true);
tel.addEventListener("blur", telVerify, true);
moreInformation.addEventListener("blur", moreInformationVerify, true);

function validateForm() {
  if (fullname.value == "" || fullname == null) {
    fullname.style.border = "1px solid red";
    fullname_error.textContent = "Full Name is required";
    fullname.focus();
    return false;
  }
  if (email.value == "" || email == null) {
    email.style.border = "1px solid red";
    email_error.textContent = "Email is required";
    email.focus();
    return false;
  }
  if (tel.value == "" || tel.value == null || isNaN(tel.value)  ) {
    tel.style.border = "1px solid red";
    tel_error.textContent = "Tel is required or Not Correct Value";
    tel.focus();

    return false;
  }

  if (moreInformation.value == "" || moreInformation.value == null) {
    moreInformation.style.border = "1px solid red";
    moreInformation_error.textContent = "More Information is required";
    moreInformation.focus();

    return false;
  }
}

function fullnameVerify() {
  if (fullname.value != "") {
    fullname.style.border = "1px solid #5E6E66";
    fullname_error.innerHTML = "";
    return true;
  }
}

function emailVerify() {
  if (email.value != "") {
    email.style.border = "1px solid #5E6E66";
    email_error.innerHTML = "";
    return true;
  }
}

function telVerify() {
    if (tel.value != "") {
        tel.style.border = "1px solid #5E6E66";
        tel_error.innerHTML = "";
      return true;
    }
  }

  function moreInformationVerify() {
    if (moreInformation.value != "") {
        moreInformation.style.border = "1px solid #5E6E66";
        moreInformation_error.innerHTML = "";
      return true;
    }
  }