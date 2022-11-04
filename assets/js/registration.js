/*Check country*/
function checkCountry(val) {
  var payment_virtual = document.getElementById("payment-virtual");
  var details = document.getElementById("details");
  var next_btn = document.getElementById("next-btn");
  var regButton = document.querySelector(".register-btn");
  var attendingMode = document.getElementById("attending-mode");
  var btn_note = document.getElementById("btn_note");
  if (val != "India") {
    payment_virtual.style.display = "block";
    details.style.display = "none";
    next_btn.style.display = "none";
    regButton.disabled = false;
    attendingMode.style.display = "block";
    btn_note.style.display = "none";
  } else {
    payment_virtual.style.display = "none";
    details.style.display = "block";
    next_btn.style.display = "block";
    regButton.disabled = false;
    attendingMode.style.display = "none";
    btn_note.style.display = "block";
  }
}

/*check mode*/
function checkMode(val) {
  var details = document.getElementById("details");
  if (val == "physical" && country != "India") {
    details.style.display = "block";
  } else {
    details.style.display = "none";
  }
}

// Enable/Disable Age on basis of CheckRelation(children/other)
// *************************************************
function CheckRelation(val, elementId) {
  var element = document.getElementById(elementId);
  if (val == "Children" || val == "Other") element.style.display = "block";
  else element.style.display = "none";
}
// *************************************************

/*calculate age */
function calculateAge(date) {
  var from = date.split("/");
  var birthdateTimeStamp = new Date(from[2], from[1] - 1, from[0]);
  var cur = new Date();
  var diff = cur - birthdateTimeStamp;
  // This is the difference in milliseconds
  var currentAge = Math.floor(diff / 31557600000);
  // Divide by 1000*60*60*24*365.25
  return currentAge;
}

/*member count*/
function memberCount() {
  let totalMembers = 1; // to count total members attending
  let payableMembers = 0; // to count total members who have to pay for attending

  // To get relation
  let memberOneRelation = document.getElementById("member-one-relation").value;
  let memberTwoRelation = document.getElementById("member-two-relation").value;
  let memberThreeRelation = document.getElementById(
    "member-three-relation"
  ).value;
  let memberFourRelation = document.getElementById(
    "member-four-relation"
  ).value;
  let memberFiveRelation = document.getElementById(
    "member-five-relation"
  ).value;

  // to get age
  let memberOneAge = document.getElementById("member-one-age").value;
  let memberTwoAge = document.getElementById("member-two-age").value;
  let memberThreeAge = document.getElementById("member-three-age").value;
  let memberFourAge = document.getElementById("member-four-age").value;
  let memberFiveAge = document.getElementById("member-five-age").value;

  //let ageArray = [];
  var ageArray = new Array();
  let dobArray = [
    memberOneAge,
    memberTwoAge,
    memberThreeAge,
    memberFourAge,
    memberFiveAge,
  ];
  for (let i = 0; i < 5; i++) {
    ageArray.push(calculateAge(dobArray[i]));
  }
  let relationArray = [
    memberOneRelation,
    memberTwoRelation,
    memberThreeRelation,
    memberFourRelation,
    memberFiveRelation,
  ];

  for (let i = 0; i < 5; i++) {
    if (ageArray[i] == "" && relationArray[i] != "Spouse") continue;
    else {
      if (relationArray[i] == "Spouse") {
        totalMembers += 1;
        payableMembers += 1;
      } else {
        if (ageArray[i] > 10) {
          totalMembers += 1;
          payableMembers += 1;
        } else {
          totalMembers += 1;
        }
      }
    }
  }
  return [totalMembers, payableMembers];
}

/*next button*/
function nextButton() {
  //var mode = localStorage.getItem("attending-mode");
  //var country = document.getElementById("country").value;
  var payment_physical = document.getElementById("payment-physical");
  var transaction_input = document.getElementById("transaction-input");
  document.getElementById("note-before-payment").style.display = "block";
  var listMember = memberCount();
  const payableMembers = listMember[1];
  var total = 5000 + payableMembers * 3000;
  document.getElementById(
    "amount"
  ).innerHTML = `₹5000 + ₹3000 x ${payableMembers} = ₹${total}`;
  /*if (mode != "virtual" && country != "India") {
    document.getElementById("amount").innerHTML = `$ ${total * 0.012} (USD)`;
    total = total * 0.012;
  } else {
    document.getElementById(
      "amount"
    ).innerHTML = `₹5000 + ₹3000 x ${payableMembers} = ₹${total}`;
  }*/
  payment_physical.style.display = "block";
  transaction_input.style.display = "block";
  document.getElementById("totalMember").innerHTML = listMember[0];
  document.getElementById("payableMember").innerHTML = payableMembers + 1;
  localStorage.clear();
  localStorage.setItem("totalAmount", total);
}

// Enable/Disable Register button on basis of transaction id and amount to be paid
// *************************************************
function EnableDisable(amountPaid) {
  var transactionIDInput = document.getElementById("transaction-id");
  var regButton = document.querySelector(".register-btn");
  var amountToBePaid = localStorage.getItem("totalAmount");
  //var country = document.getElementById("country").value;
  //var mode = localStorage.getItem("attending-mode");

  /*if (mode == "virtual" && country == "India") {
    amountToBePaid = 3000;
  }*/
  if (
    transactionIDInput.value.trim() != "" &&
    amountPaid.value == amountToBePaid
  ) {
    regButton.disabled = false;
  } else {
    regButton.disabled = true;
  }
}
// *************************************************

/*PageClip function to uplaod data in database*/
var form = document.querySelector(".pageclip-form");
Pageclip.form(form, {
  onSubmit: function (event) {},
  onResponse: function (error, response) {
    submitForm();
  },
  successTemplate: "<span>Thank you!</span>",
});

/*Display popup after form submission*/
function submitForm() {
  var myModal = new bootstrap.Modal(
    document.getElementById("exampleModal"),
    {}
  );
  myModal.toggle();
}

/*function checkMode(val) {
  const country = document.getElementById("country").value;
  localStorage.setItem("attending-mode", val);
  var element = document.getElementById("details");
  var next_btn = document.getElementById("next-btn");
  var regButton = document.querySelector(".register-btn");
  var payment_virtual = document.getElementById("payment-virtual");
  var transaction_input = document.getElementById("transaction-input");
  var payment_physical = document.getElementById("payment-physical");
  var payment_virtual_india = document.getElementById("payment-virtual-india");
  if (val == "virtual" && country != "India") {
    element.style.display = "none";
    next_btn.style.display = "none";
    payment_virtual.style.display = "block";
    payment_physical.style.display = "none";
    transaction_input.style.display = "none";
    regButton.disabled = false;
    payment_virtual_india.style.display = "none";
  } else if (val == "virtual" && country == "India") {
    payment_virtual_india.style.display = "block";
    element.style.display = "none";
    payment_physical.style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    EnableDisable(3000);
  } else {
    element.style.display = "block";
    next_btn.style.display = "block";
    payment_virtual.style.display = "none";
    payment_virtual_india.style.display = "none";
    transaction_input.style.display = "block";
  }
}*/
