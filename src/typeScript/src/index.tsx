class Greenter{
    greeting:string;
    constructor(message:string){
        this.greeting=message;
    }
    greet(){
        return this.greet;
    }
}
let greeter=new Greenter("world");
let button=document.createElement('button');
button.textContent="say name";
button.onclick=function(){
    alert(greeter.greet());
}
document.body.appendChild(button);