const addBtn = document.getElementById("add");
const inputValue = document.getElementById("taskName");

addBtn.addEventListener("click",()=>{
    let value = inputValue.value.trim();
    if(value === ""){
        alert("please enter task name")
        return;
    }
    console.log(value)
})