export const forwardMessage = (message:string, type:number) => {
    const status = document.getElementById('status')!
    const classes = ['green', 'red', 'load']
	status.innerText = message;
    console.log(message)
    status.classList.forEach((name) => {classes.includes(name) ? status.classList.remove(name):undefined})
	status.classList.add(classes[type])
}

export async function parse(){
    const rawInput = document.querySelector<HTMLInputElement>('#search')!
    switch(true) {
        case (/mangasee123\.com/).test(rawInput.value):{
            forwardMessage(`Match found`, 0);
            if (/\/manga\/[\s\w\d]+\/?/.test(rawInput.value) ) {
                return `mangasee/${rawInput.value.split("/")[4]}`;
            } else {
                forwardMessage("The path for the manga wasn't provided",1)
            }
            break
        }
        default: {
            if (!rawInput.value) {
                forwardMessage('Nothing was provided', 1)
                return
            } else if (!rawInput.checkValidity()) {
                forwardMessage(`Not a valid URL: ${rawInput.value}`, 1)
                return
            }
            else{
                forwardMessage("Sorry, we couldn't understand that.", 1)
                return  
            }
        }
    }
}