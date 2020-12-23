// import _ from "lodash";
var _ = require("lodash");

function validateEmail(email) {
  // console.log('email!!!', email);
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
  // console.log('password@@@@@', password.length);
  //var re = /(?=^.{8,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  // console.log('&&&&****', password.length);
  if (password.length >= 8) {
    return true;
  }
  return false;
}

// This helping function is for validating a request body with required fields,
// It takes two variables as input
// 1. Request body
// 2. The required fields
// It returns callback function containing one variable is response
// 1. Error message if any required key is missing or empty
exports.validateRequiredKeys = function (body, fields, res, callback) {
  let key = "";
  let name = "";
  let errorField = "";
  let value = "";

  // Traversing through the required fields
  for (let i = 0; i < fields.length; i += 1) {
    key = fields[i].key;
    name = fields[i].name;
    errorField = "";
    value = body[key] + "";

    // if request body does not contain respective field then throw error
    if (
      value === undefined ||
      value === "undefined" ||
      value === null ||
      !value ||
      value.replace(/\s+/g, "") === ""
    ) {
      errorField = `${name} is required.`;

      break;
    } else if (key === "email" && !validateEmail(value)) {
      // if (body['player_name'] === body['email']) {
      //   errorField = '';
      // } else {
      //   errorField = 'Wrong email address.';
      // }
      errorField = "Wrong email address.";
      break;
    } else if (
      (key === "password" ||
        key === "confirm_password" ||
        key === "new_password" ||
        key === "current_password") &&
      !validatePassword(value)
    ) {
      errorField = "Password must be 8 characters long...";
      // console.log('%%%', errorField);
      break;
    }
  }
  if (errorField) {
    res.statusCode = 404;
    res.json({
      status: 404,
      message: errorField,
    });
    res.end();
    callback(errorField);
  } else {
    callback(errorField);
  }
};
