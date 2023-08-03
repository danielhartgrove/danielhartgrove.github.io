//initial number of cookies    
var num = 0;
var cpc = 1;    //cookies per click
var lps = 0;    //lines per second

window.onload = function () {
  var numbers = document.getElementById("numbers");
  
  numbers.innerHTML = 0;
  linesPerSecond.innerHTML = 0;

  setInterval(function() {
        num += (cpc*lps)/5;
        numbers.innerHTML = num.toFixed(0);
},200);

}

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

function buyAuto(cost, amount){
    if(num >= cost){
        num -= cost;
        lps += amount;

        var linesPerSecond = document.getElementById("linesPerSecond");
        linesPerSecond.innerHTML = lps * cpc;
        var numbers = document.getElementById("numbers");
        numbers.innerHTML = num.toFixed(0);
    }else{
        alert ("You haven't written enough lines!");
    }
}