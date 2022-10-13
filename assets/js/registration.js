
function submitForm() {
  //localStorage.clear();
  
  //localStorage.setItem("totalAmount", total);
  //localStorage.setItem("secondRun", "true");
  //window.location.reload();
  var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})
    myModal.toggle()
}

/*window.onload = function () {
  if (localStorage.getItem("secondRun") == "true") {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})
    myModal.toggle()
  }
};*/



// Enable/Disable Register button on basis of transaction id
// *************************************************

 var transactionIDInput=document.querySelector("#transaction-id");
 var regButton= document.querySelector(".register-btn");

function EnableDisable(transactionIDInput)  {
    if(transactionIDInput.value.trim()!= "") {
        regButton.disabled = false;
    } else {
        regButton.disabled = true;
    }
  }

// *************************************************


// Enable/Disable Age on basis of CheckRelation(children/other)
// *************************************************

  function CheckRelation(val, elementId) {
    var element = document.getElementById(elementId);
    if (val == 'Children' || val == 'Other')
        element.style.display = 'block';
    else
        element.style.display = 'none';
}
// *************************************************




var form = document.querySelector('.pageclip-form')
Pageclip.form(form, {
  onSubmit: function (event) { },
  onResponse: function (error, response) {submitForm(); },
  successTemplate: '<span>Thank you!</span>'
})


function memberCount() {

  let totalMembers = 0;  // to count total members attending 
  let payableMembers = 0;  // to count total members who have to pay for attending

  // To get relation
  let memberOneRelation = document.getElementById('member-one-relation').value;
  let memberTwoRelation = document.getElementById('member-two-relation').value;
  let memberThreeRelation = document.getElementById('member-three-relation').value;
  let memberFourRelation = document.getElementById('member-four-relation').value;
  let memberFiveRelation = document.getElementById('member-five-relation').value;

  // to get age
  let memberOneAge = document.getElementById('member-one-age').value;
  let memberTwoAge = document.getElementById('member-two-age').value;
  let memberThreeAge = document.getElementById('member-three-age').value;
  let memberFourAge = document.getElementById('member-four-age').value;
  let memberFiveAge = document.getElementById('member-five-age').value;

  let relationArray = [memberOneRelation,memberTwoRelation,memberThreeRelation,memberFourRelation,memberFiveRelation];
  let ageArray = [memberOneAge,memberTwoAge,memberThreeAge,memberFourAge,memberFiveAge];
  
  for (let i = 0; i<5; i++){
    if (relationArray[i] == "Spouse"){
      totalMembers +=1;
      payableMembers+=1;
    }
    else{
      if (ageArray[i] > 10){
        totalMembers +=1;
        payableMembers+=1;
      }
      else{
        totalMembers+=1;
      }
    }
  }
  return([totalMembers,payableMembers]);
}

function CheckRelation(val, elementId) {
  var element = document.getElementById(elementId);
  if (val == 'Children' || val == 'Other')
      element.style.display = 'block';
  else
      element.style.display = 'none';
}

function checkCountry(val) {
  var element = document.getElementById('attending-mode');
  if (val != 'India') {
      element.style.display = 'block';
  }
  else {
      element.style.display = 'none'
  }
}

function checkMode(val){
  var element = document.getElementById('details');
  var next_btn = document.getElementById('next-btn');
  var payment_virtual = document.getElementById('payment-virtual');
  var transaction_input = document.getElementById('transaction-input');
  if (val == 'virtual'){
  element.style.display = 'none';
  next_btn.style.display='none';
  payment_virtual.style.display = 'block';
  transaction_input.style.display = 'none';
  regButton.disabled = false;
  }
  else{
      element.style.display = 'block';
      next_btn.style.display='block';
      payment_virtual.style.display = 'none';
  }
}

function nextButton(){
  var listMember = memberCount();
  const payableMembers = listMember[1];
  var total = 5000 + payableMembers * 3000;
  document.getElementById('amount').innerHTML =`₹5000 + ₹3000 x ${payableMembers} = ₹${total}`;
  var payment_physical = document.getElementById('payment-physical');
  payment_physical.style.display='block'; 
}
