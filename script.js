function calculator() {
    const resultEl = document.querySelector(".result")
    const operationsEl = document.querySelector(".operations")
    const btns = document.querySelectorAll(".btn")

    function handleClick(){
        const [data,value] = Object.entries(this.dataset)[0]
        if(data === "nb") handleNumber(value)
        if(data === "sep") handleSeparator()
        if(data === "op") handleOperator(value)
        if(data === "action") handleAction(value)
    }

    function handleNumber(n){}

    function handleSeparator(){}

    function handleOperator(op){}

    function handleAction(type){}

    function operate(a,b){
        return {
            "+":()=>a+b,
            "-":()=>a-b,
            "/":()=>a/b,
            "*":()=>a*b,
        }
    }


    btns.forEach(e=>e.addEventListener("click",handleClick))
}

calculator()