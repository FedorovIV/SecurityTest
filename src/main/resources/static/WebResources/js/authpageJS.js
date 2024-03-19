
let buttonLogIn = document.getElementById("buttonLogIn")

buttonLogIn.addEventListener('click', function () {
    let usernameInput = document.getElementById("username")
    let passwordInput = document.getElementById("password")

    usernameText = usernameInput.value;
    passwordText = passwordInput.value;

    DataForRequest = {
        "username": usernameText,
        "password": passwordText
    }

    const url =window.location.href + 'auth';
    // Получаю токен
    let myToken;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DataForRequest)
    })
        .then(response => response.json())
        .then(data => {

            myToken = data

            console.log(myToken);



            function setCookie(name, value, days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                const expires = "expires=" + date.toUTCString();
                document.cookie = name + "=" + value + ";" + expires + ";path=/";
            }

            // Сохраняем JWT токен в cookie на 1/60 день
            const jwtToken = myToken.token
            console.log(jwtToken)
            setCookie('jwtToken', jwtToken, 1 / 60);
            getCookieAndTryToAuth()




        })
        .catch((error) => {
            console.error('Error:', error);
        });

})

function getCookieAndTryToAuth(){
    let cookieBtn = document.getElementById("cookieBtn")

    function getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookiesArray = decodedCookie.split(';');
        for (let i = 0; i < cookiesArray.length; i++) {
            let cookie = cookiesArray[i].trim();
            // Проверяем, начинается ли значение cookie с искомого имени
            if (cookie.indexOf(name + '=') === 0) {
                return cookie.substring(name.length + 1);
            }
        }
        return "";
    }

    // Получаем значение JWT токена из cookie
    const jwtToken = getCookie('jwtToken');
    console.log(jwtToken)

    //Пробуем сделать get-запрос
    var url = new URL(window.location.href + "chatPage");

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    })
        .then(response => {
            if (response.ok) {
                //Создаём url адрес с токеном

                var url = new URL(window.location.href + "chatPage");
                url.searchParams.append('JWT-token', "Bearer " + jwtToken);




                // Изменяем адрес страницы для перенаправления

                window.location.href = url;

            } else {
                throw new Error('Unauthorized');
            }
        })


}

getCookieAndTryToAuth()

    //     function getCookie(name) {
    //     const decodedCookie = decodeURIComponent(document.cookie);
    //     const cookiesArray = decodedCookie.split(';');
    //     for (let i = 0; i < cookiesArray.length; i++) {
    //         let cookie = cookiesArray[i].trim();
    //         // Проверяем, начинается ли значение cookie с искомого имени
    //         if (cookie.indexOf(name + '=') === 0) {
    //             return cookie.substring(name.length + 1);
    //         }
    //     }
    //     return "";
    // }
    // const jwtToken = getCookie('jwtToken');

    // var url = new URL("http://localhost:8189/chatPage");

    // fetch(url, {
    //     method: 'GET',
    //     headers: {
            
    //         'Authorization': "Bearer " + jwtToken       

    //     }
    // })
    //     .then(response => {
    //         if (response.ok) {
    //         } else {
    //             throw new Error('Unauthorized');
    //         }
    //     })

    