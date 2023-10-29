const chatInput =document.querySelector(".chat-input textarea")
const sendChatBtn=document=document.querySelector(".chat-input div")
const chatBox=document.querySelector(".chatbox")
const chatBottoggler=document.querySelector(".chatbot-toggler")
const chatBotClosebtn=document.querySelector(".close-btn")

let userMessage ;
const API_KEY ="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";

const createChalli = (message , className) =>{
    // this for create elements 
    const chatLi= document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? ` <p></p>`:`<span ><i class="fa-brands fa-slack">Smart_toy</i></span><p></p>`;
    chatLi.innerHTML=chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;

}

const generateResponse =(incomingChatLi) =>{
    const API_URL =`https://api.chatbot.com/v2/stories`;
    const messageElement =incomingChatLi.querySelector("p")
    const RequsetOptions ={
        method : "POST",
        headers : {
            "content-Type" : "application/json",
            "Authorization" : `Bearer ${API_KEY} `
        },
        body: JSON.stringify({
            model:"gpt-3.5-turbo",
            message :[{role:"user", content: userMessage}]
        })
    }

     // Send a POST request to the API
    fetch(API_URL, RequsetOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content;
        // Handle the response data here
    })
    .catch((error) => {
        messageElement.textContent =   `Oops ! Something went wrong . Please try again `;
        messageElement.classList.add("error")
        // Handle errors if any occur during the API request
    }).finally(()=>  chatBox.scrollTo(0,chatBox.scrollHeight))
}

const handleChat =() =>{
    userMessage =chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value="";
    // this for add user message in the box 
    chatBox.appendChild(createChalli(userMessage,"outgoing"))
    chatBox.scrollTo(0,chatBox.scrollHeight)
    chatInput.style.height =`${chatInput.scrollHeight}px`
    setTimeout(()=>{
        const incomingChatLi=createChalli("Thinking ...","incoming")
        chatBox.appendChild(incomingChatLi)
        chatBox.scrollTo(0,chatBox.scrollHeight)
        generateResponse(incomingChatLi);
    },600)

}


sendChatBtn.addEventListener("click", handleChat);

chatBottoggler.addEventListener("click",()=> document.body.classList.toggle("show-chatbot"))
chatBotClosebtn.addEventListener("click",()=> document.body.classList.remove("show-chatbot"))
const heghtinput=chatInput.scrollHeight;
chatInput.addEventListener("input",()=>{
    chatInput.style.height =`${heghtinput}px`
    chatInput.style.height =`${chatInput.scrollHeight}px`
})


chatInput.addEventListener("keydown",(e)=>{
    
    if(e.key === "Enter" && !e.shiftkey && window.innerWidth>800){
        e.preventDefault()
        handleChat();
    }
})