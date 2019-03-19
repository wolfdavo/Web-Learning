var numField1 = document.getElementById('numField1');
var numField2 = document.getElementById('numField2');
var resultField = document.getElementById('resultField');
var form = document.getElementById('xIsWhatPercentageOfY');

form.addEventListener('submit', function(event){
    
    if (!numField1.value || !numField2.value){
        alert("Please enter X and Y values")
    }else{
        var x = parseFloat(numField1.value);
        var y = parseFloat(numField2.value);
        
        var result = x / y;
        var percent = result * 100;
        var rounded = percent.toFixed(2) + "%";
        
        resultField.innerText = "Answer: " + rounded;
        event.preventDefault();
    }
    
});
