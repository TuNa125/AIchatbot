class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButtton: document.querySelector('.send__button')
        }

        this.state = false; //to show the status of chatbox
        this.message = []; //array to store messages

    }

diplay () {
    const {openButton, chatBox, sendButtton} = this.args;

    openButton.addEventListener('click', () => this.toggleState(chatBox))

    sendButton.addEventListener('click', () => this.onSendButton(chatBox))

    const node = chatBox.querySelector('input');
    node.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state =!this.state;

        //show or hide the box
        if(this.state){
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
        }
    }

onSendButton(chatbox) {
    var textField = chatbox.querySelector('input');
    let text1 = textField.value
    if (text1 === "") {
        return;
    }

    let msg1 = { name: "User", message: text1 }
    this.message.push(msg1);

    //'http://127.0.0.1:5500/predict
    fetch($SCRIPT_ROOT + '/predict', {
        method: 'POST',
        body: JSON.stringify{ message: text1}),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(r => r.json())
    .then(r => {
        let msg2 = { name: "Sam", message: r.answer};
        this.messages.push(msg2); //push msg back to array
        this.updateChatText(chatbox)
        textField.value = ''
    
    }).catch((error) => {
        console.error('Error:', error);
        this.updateChatText(chatbox)
        textField.value = ''

    });





}  

updateChatText(chatbox) {
    var html = '';
    this.message.slice().reverse().forEach(function(item, ) {
        if (item.name === "Sam") //name of chatbot
        {
            html += '<div class="messages__item messages__item--visitor">' + item.messages + '</div>'
        }
        else
        {
            html += '<div class="messages__item messages__item--operator">' + item.messages + '</div>'
        }
    });

    const chatmessage = chatbox.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;
}

}

const chatbox = new Chatbox();
chatbox.diplay();