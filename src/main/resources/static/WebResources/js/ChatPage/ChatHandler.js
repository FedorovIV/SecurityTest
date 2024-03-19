'use strict';

let messageInput = document.getElementById("textareaMessage");

var stompClient = null;
var username;
getUsernameWithTokenAndConnect();

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {

    if (username) {

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    )

}

function getUsernameWithTokenAndConnect(){
    // Получаем URL текущей страницы
    var urlString = window.location.href;

    // Создаем новый объект URLSearchParams
    var urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams: "+ urlParams)
    // Получаем значение параметра 'param' из URL
    var paramValue = urlParams.get('JWT-token');
    console.log("paramValue: " + paramValue)
    // Параметры для GET запроса, включая заголовки
    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': paramValue

        }
    };

    // Выполняем GET запрос с помощью fetch
    fetch("/info", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Произошла ошибка: ' + response.status);
            }
            return response.text();
        })
        .then(text => {
            console.log("username:"+text)
            username = text
            connect()
            return text;
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });

}

function onError(error) {
    console.log("Can not connect to server")
}


function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    if (message.type === 'JOIN') {

    } else if (message.type === 'LEAVE') {

    } else {
        // messageElement.classList.add('chat-message');

        // var avatarElement = document.createElement('i');
        // var avatarText = document.createTextNode(message.sender[0]);
        // avatarElement.appendChild(avatarText);
        // avatarElement.style['background-color'] = getAvatarColor(message.sender);

        // messageElement.appendChild(avatarElement);

        // var usernameElement = document.createElement('span');
        // var usernameText = document.createTextNode(message.sender);
        // usernameElement.appendChild(usernameText);
        // messageElement.appendChild(usernameElement);
        let element = document.getElementById("example-messege")
        let new_element = element.cloneNode(true);
        new_element.children[0].innerHTML = message.sender
        new_element.children[1].innerHTML = message.content;

        document.getElementsByClassName("messages")[0].appendChild(new_element);
        let messegesBar = document.getElementsByClassName("messages")[0]
        messegesBar.scrollTo(0, messegesBar.scrollHeight);

        console.log("Messege recieved!");
    }


}

//connect();

let buttonSend = document.getElementById("send-button")

buttonSend.addEventListener('click', sendMessage, true)



document.addEventListener('keyup', function (event) {
    if (event.key === "Enter" && event.ctrlKey) {
        sendMessage();
    }
})

