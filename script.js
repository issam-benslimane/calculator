function initCalculator() {
    const screenResult = document.querySelector(".result")
    const screenOperations = document.querySelector(".operations")
    const btns = document.querySelectorAll(".btn")
    let calc = calculator()

    function handleClick(){
        const [key,value] = Object.entries(this.dataset)[0]
        if(key === "nb") handleNumber({key,value})
        if(key === "sep") handleSeparator(key)
        if(key === "op") handleOperator({key,value})
        if(key === "action") handleAction(value)
    }


    function handleNumber(...args){
        const {currentNumber} = calc(...args)
        updateScreen(currentNumber) 
    }

    function handleSeparator(key){
        const {currentNumber} = calc({key})
        updateScreen(currentNumber) 
    }

    function handleOperator(...args){
        const {total,currentOp,currentNumber} = calc(...args)
        currentOp  && updateScreen(total,currentOp)
        !currentOp  && updateScreen(currentNumber,currentOp)
    }

    function handleAction(action){
        if(action === "reset") calc = calculator()
        if(action === "delete") {
            const {currentNumber} = calc({key:action})
            currentNumber && updateScreen(currentNumber) 
        }
    }

    function calculator(){
        updateScreen() 
        let total = currentNumber = 0
        let currentOp = null
        let lastKey = null
        return ({key,value})=>{
            if(key === "nb") {
                lastKey === "op" && (currentNumber = 0)
                currentNumber = trimNb(currentNumber+value)
            } 
            if(key === "op") {
                lastKey !== "op" && (total = currentOp ? operate(+total,+currentNumber)[currentOp] : currentNumber)
                if(key === "="){
                    currentOp = null
                }
                else currentOp = value
            }
            if(key === "sep"){
                lastKey === "op" && (currentNumber = 0)
                if(currentNumber) !currentNumber.includes(".") && (currentNumber += ".")
                else currentNumber += "."
            }
            if(key === "delete"){
                if(lastKey === "op") return
                (currentNumber = deleteLastCh(currentNumber))
            }
            lastKey = key
            return {currentNumber,total,currentOp}
        }
    }

    function checkResult(r){}

    function operate(a,b){
        return {
            "+":a+b,
            "-":a-b,
            "/":a/b,
            "*":a*b,
        }
    }

    function deleteLastCh(n){
        return n.slice(0,-1) || "0"
    }

    function trimNb(n){
        return n[0] === "0" && !n.includes(".") ? n.slice(1) : n
    }

    function updateScreen(n,op){
        screenResult.textContent = n || "0"
        !n && (screenOperations.textContent = "")
        if(op){
            op != "=" && (screenOperations.textContent = `${n} ${op}`)
            op == "=" && (screenOperations.textContent = `${n}`)
        }
    }


    btns.forEach(e=>e.addEventListener("click",handleClick))
    window.addEventListener("keydown",handleKey)
}

initCalculator()