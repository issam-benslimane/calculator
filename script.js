function initCalculator() {
    const screenResult = document.querySelector(".result")
    const screenOperations = document.querySelector(".operations")
    const btns = document.querySelectorAll(".btn")
    let calc = calculator()

    function handleClick(){
        const [key,value] = Object.entries(this.dataset)[0]
        if(key === "nb") handleNumber(value)
        if(key === "sep") handleSeparator()
        if(key === "op") handleOperator(value)
        if(key === "action") handleAction(value)
        calc.updateKey(key)
    }


    function handleNumber(n){
        calc.addNumber(n)
    }

    function handleSeparator(){
        calc.addSeparator()
    }

    function handleOperator(op){
        calc.addOperator(op)
    }

    function handleAction(action){
        if(action === "reset") calc.reset()
        if(action === "delete") calc.delete()
        if(action === "equals") calc.showResult()
    }

    function calculator(){
        let total = currentNumber = 0
        let currentOp = null
        let lastKey = null
        let finalResult = false
        return {
            addNumber(value) {
                if(finalResult) return
                lastKey === "op" && (currentNumber = 0)
                currentNumber = trimNb(currentNumber+value)
                updateScreen(currentNumber)
            } ,
            addOperator(op) {
                lastKey !== "op" && (total = currentOp ? operate(+total,+currentNumber)[currentOp] :  currentNumber)
                currentOp = op
                finalResult = false
                updateScreen(total,`${total} ${op}`)
            },
            addSeparator(){
                if(finalResult) return
                lastKey === "op" && (currentNumber = 0)
                if(currentNumber) !currentNumber.includes(".") && (currentNumber += ".")
                else currentNumber += "."
                updateScreen(currentNumber)
            },
            showResult() {
                if(!currentOp) return
                const temp = total
                total = operate(+total,+currentNumber)[currentOp] || currentNumber
                updateScreen(total,`${temp} ${currentOp} ${currentNumber} =`)
                currentNumber=total
                currentOp = null
                finalResult = true
            },
            delete(){
                if(finalResult) return this.reset()
                if(lastKey === "op") return
                currentNumber = currentNumber.slice(0,-1) || "0"
                updateScreen(currentNumber)
            },
            updateKey(key){
                lastKey = key
            },
            reset(){
                total = 0
                currentNumber = 0
                currentOp = null
                lastKey = null
                finalResult = false
                updateScreen(currentNumber,"")
            }
        }
    }


    function operate(a,b){
        return {
            "+":a+b,
            "-":a-b,
            "/":a/b,
            "*":a*b,
        }
    }

    function trimNb(n){
        return n[0] === "0" && !n.includes(".") ? n.slice(1) : n
    }

    function updateScreen(result,path){
        screenResult.textContent = result
        screenOperations.textContent = path ?? screenOperations.textContent
    }


    btns.forEach(e=>e.addEventListener("click",handleClick))
    //window.addEventListener("keydown",handleKey)
}

initCalculator()