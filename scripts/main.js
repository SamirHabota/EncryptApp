function getEncryptedPasswrod(event) {
  event.preventDefault();
  let result = encrypt(event.target.password.value, event.target.key.value);
  document.getElementById("outputDivId").classList.remove("none");
  document.getElementById("outputId").innerHTML = result;
}

function encrypt(plainPassword, key) {
  key = key.split("-")[0];
  var asciiArray = [];
  for (var i = 0; i < plainPassword.length; i++) {
    asciiArray.push(
      plainPassword.charCodeAt(i) + key.charCodeAt(i % key.length)
    );
  }
  return JSON.stringify(asciiArray);
}

function decryptPassword(event) {
  event.preventDefault();
  let result = decrypt(event.target.password.value, event.target.key.value);
  document.getElementById("plainOutputDivId").classList.remove("none");
  document.getElementById("plainOutputId").innerHTML = result;
}

function decrypt(password, key) {
  key = key.split("-")[0];
  var result = [];
  var str = "";
  var codesArr = JSON.parse(password);
  for (var i = 0; i < codesArr.length; i++) {
    result.push(codesArr[i] - key.charCodeAt(i % key.length));
  }
  for (var i = 0; i < result.length; i++) {
    var ch = String.fromCharCode(result[i]);
    str += ch;
  }
  return str;
}

function copyContent(contentId, buttonId) {
  let content = document.getElementById(contentId).innerHTML;
  var tempInput = document.createElement("input");
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(tempInput);
  tempInput.setAttribute("value", content);
  tempInput.select();
  document.execCommand("copy");
  body.removeChild(tempInput);
  document.getElementById(buttonId).innerHTML = "copied";
}

function closeOutput(div, text, buttonId) {
  document.getElementById(text).innerHTML = "";
  document.getElementById(div).classList.add("none");
  document.getElementById(buttonId).innerHTML = "copy";
}
