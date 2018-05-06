

const digits = [...document.querySelectorAll(".digits__key")]
const operations = [...document.querySelectorAll(".operations__key")]
const screen = document.querySelector(".screen__digits")
const screenOperation = document.querySelector(".screen__operation")

memo = new Memo()

function Calculator(){
  
  digits.map(digit => digit.addEventListener("click" , handlerDigit))
  operations.map(operation => operation.addEventListener("click",handlerOperation))
  
     function handlerDigit(event) {
       
     number = event.target.dataset.id
   memo.add(number)
  } 

   function handlerOperation(event){
     operation = event.target.dataset.id
     
      memo.add(operation)

  }
}


function Memo(){
    let result  
    let digits  
    let ope 
    let before   
    let operations = { plus  : (x,y) => x+ y,
                   times : (x,y) => x*y,
                   minus : (x,y)=> x - y,
                 divide : (x,y) => x/y }
   
    this.reset = function(){
        digits = []
        before = undefined
        result = undefined
        ope = undefined
    }

    this.reset()


    this.add = function(digit){
       
        console.log(digit)
        if (digit  == "reset"){
            this.reset()
            updateScreen(0)
            updateScreenOperation("reset")
        }
        else if (/(\d|\.)/.test(digit)){
            beforeNumber = true
            digits.push(digit)
            updateScreen(digits.join(""))
            return 
        }
        else {
            if (digits.length == 0 && (!result ||ope) ){
                updateScreen({error : "operation invalid"})  
                this.reset()          
            return
           }   
            let number = +digits.join("")
             
             updateScreenOperation(digit)
            switch(digit){
                case "back":
                  if(beforeNumber && digits.length){                      
                      digits.pop()
                      ope = undefined
                      updateScreen(result)
                      beforeNumber=undefined
                  } 
                 
                break
                case "equals":
                    result =   operations[ope](result,number)
                               
                    updateScreen(result) 
                    digits = []  
                    ope = undefined
                    break;
                default :
                  beforeNumber = false
                    if (!result){
                        result = number
                        ope = digit}
                    else if (!ope){
                        ope = digit
                    }
                    else {
                         result = operations[ope](result,number)
                         ope = digit
                   
                    } 
                    digits = [] 
                   
            
            }
            
        }
    }

     


}

 
function updateScreenOperation(operation){
    screenOperation.innerHTML = operation == "reset" ? "" :  document.querySelector(`[data-id=${operation}]`).innerHTML
}


function updateScreen(result){    
if (typeof result == "object"){
   
    screen.innerHTML = result.error
    screen.classList.add("error")
}
else if (screen.classList.contains("error")){

    screen.classList.remove("error")
    screen.innerHTML = result || 0
}
else
  screen.innerHTML = result || 0
}

new Calculator()









 