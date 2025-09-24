function max(arr){
    
    let max = arr[0];

    for(elem of arr){
        if(elem > max) max = elem;
    }
    return max;
}


const arr = [2, 435, 22, 2137, 547];

console.log(`${max(arr)}\n`);


function Hej(){
    console.log("Hej!\n");
}

Hej();

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let imie
rl.question("Jak masz na imie\n", imie =>{
    console.log(`Masz na imie ${imie}`);
    imie == "Antek" ? console.log("Jest to poprawne imię. Gratulacje!") : console.log("Niepoprawne imie, spróbuj ponownie");
    rl.close();
});
