//initial number of cookies    
var num = 0;
var cpc = 1;

window.onload = function () {
  var numbers = document.getElementById("numbers");
  
  numbers.innerHTML = 0;
};

var cookie = document.getElementById("cookie");

function cookieClick() { 
    num += cpc;

    var numbers = document.getElementById("numbers");
    
    //upgrade level for printing
    var upgradeLevel = document.getElementById("upgradeLevel");
    
    numbers.innerHTML = num.toFixed(0);  
}

function buyItem(cost, amount){
    if(num >= cost){
        num -= cost;
        cpc *= amount;

        var numbers = document.getElementById("numbers");
        numbers.innerHTML = num.toFixed(0);
    }else{
        alert ("You haven't written enough lines!");
    }
}