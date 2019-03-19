/*###### QUESTION 1 #######*/
for(var x = 0; x < 16; x++){
    if(x%2 === 0){
        console.log(x + " is even");
    }else{
        console.log(x + " is odd");
    }
}

/*###### QUESTION 2 #######*/
var stars = "";
for(var x = 1; x < 6; x++){
    stars += "*";
    console.log(stars);
}

/*###### QUESTION 3 #######*/
for (var x = 1; x < 100; x++){
    
    var codeMonkey = "";
    if(x%3 === 0){
        codeMonkey += "Code ";
    }if(x%5 === 0){
        codeMonkey += "Monkey ";
    }else{
        console.log(x);
    }
    
    if(codeMonkey !== ""){
        console.log(codeMonkey);
    }
}