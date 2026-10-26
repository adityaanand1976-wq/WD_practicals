// JavaScript validation for the registration form (Experiment 7).
var form = document.getElementById("registrationForm");

function checkRegistrationField(field) {
  var value = field.value.trim();
  var message = "";

  if (field.id === "name") {
    if (value.length < 6) {
      message = "Name must be at least 6 characters long.";
    } else if (!/^[A-Za-z ]+$/.test(value)) {
      message = "Name should contain letters and spaces only.";
    }
    document.getElementById("nameError").textContent = message;
  }

  if (field.id === "password") {
    if (value.length < 6) message = "Password must contain at least 6 characters.";
    document.getElementById("passwordError").textContent = message;
  }

  if (field.id === "email") {
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
      message = "Enter a valid email such as student@example.com.";
    }
    document.getElementById("emailError").textContent = message;
  }

  if (field.id === "phone") {
    if (!/^[0-9]{10}$/.test(value)) message = "Phone number must have exactly 10 digits.";
    document.getElementById("phoneError").textContent = message;
  }

  return message === "";
}

if (form) {
  // Fill the day and year dropdowns.
  var daySelect = document.getElementById("dobDay");
  for (var day = 1; day <= 31; day++) {
    daySelect.add(new Option(day, day));
  }

  var yearSelect = document.getElementById("dobYear");
  for (var year = 2010; year >= 1970; year--) {
    yearSelect.add(new Option(year, year));
  }

  ["name", "password", "email", "phone"].forEach(function (id) {
    var field = document.getElementById(id);
    field.addEventListener("input", function () {
      checkRegistrationField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    var fields = ["name", "password", "email", "phone"];
    var valid = true;

    fields.forEach(function (id) {
      var field = document.getElementById(id);
      if (!checkRegistrationField(field) || !field.checkValidity()) valid = false;
    });

    if (!form.checkValidity()) valid = false;

    if (!valid) {
      event.preventDefault();
      form.reportValidity();
      document.getElementById("formMessage").textContent = "Please correct the highlighted fields.";
    } else {
      event.preventDefault();
      document.getElementById("formMessage").textContent = "Registration form checked successfully (demo only).";
    }
  });

  form.addEventListener("reset", function () {
    window.setTimeout(function () {
      ["nameError", "passwordError", "emailError", "phoneError"].forEach(function (id) {
        document.getElementById(id).textContent = "";
      });
      document.getElementById("formMessage").textContent = "";
    }, 0);
  });
}
