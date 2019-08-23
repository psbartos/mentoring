async function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    if (loginName === "") {
        $('.login-form__login-name-span').show();
        return false;
    } else if (loginPassword === "") {
        $('.login-form__login-name-span').hide();
        $('.login-form__login-pass-span').show();
        return false;
    } else
        return await loginCheck();
};

async function loginCheck() {
    await userLoginCheck().then(function (result) {
        if (result === true) {
            $('.login-form__login-success-span').show();
            $('.login-form__login-name-span').hide();
            $('.login-form__login-pass-span').hide();
            accountPage();
        } else {
            $('.login-form__login-pass-span').toggle();
            $('.login-form__login-name-span2').toggle();
            return false
        }
    })
};

async function accountPage() {
    const users = await getUsers();

    setTimeout(function () {
        $('.main-login-container').toggle();
        $('.main-account-container').toggle();
    }, 1500);

    document.querySelector('.accname-span').innerHTML = `${users[userID].name}`
    document.querySelector('.accemail-span').innerHTML = `${users[userID].email}`
    document.querySelector('.accpass-span').innerHTML = `${users[userID].password}`

}

const getUsers = async () => {
    try {
        return (await axios.get('http://localhost:3001/users')).data;
    } catch (error) {
        alert(`A szerver nem elérhető! Kérem ellenőrizze, fut e a JSON szerver!`)
    }
}

const countUsers = async () => {
    const users = await getUsers();
    const userCount = users.length;
    $('.counter-container').toggle();
    document.querySelector(".counter-h1").innerHTML = `Felhasználók: ${userCount}`;
};
countUsers()

const userID = [];

async function userLoginCheck() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;
    const users = await getUsers()
    const filteredUsers = users.filter(element => element.name === loginName && element.password === loginPassword && userID.push(element.id));

    return filteredUsers.length > 0;
}

async function getID() {
    const users = await getUsers();
    const userID = users[0].id
    console.log(userID);
}


const loginForm = document.forms["login_form"];
const regForm = document.forms["reg_form"];
const loginBtn = document.getElementById('login-btn');

let userData = {
    name: '',
    email: '',
    password: ''
};

function checkUserRegistration() {
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const regPassword = document.forms["reg_form"]["reg_password"].value;
    const regPassword2 = document.forms["reg_form"]["reg_password2"].value;
    userData.email = document.forms["reg_form"]["reg_email"].value;
    userData.name = document.forms["reg_form"]["reg_name"].value;
    userData.password = document.forms["reg_form"]["reg_password"].value;

    if (regEmail === "") {
        $('.reg-form__reg-email-span2').toggle();
        return false;
    } else if (regName === "") {
        $('.reg-form__reg-email-span2').toggle();
        $('.reg-form__reg-name-span2').toggle();
        return false;
    } else if (regPassword === "") {
        $('.reg-form__reg-name-span2').toggle();
        $('.reg-form__reg-pass-span2').toggle();
        return false;
    } else if (regPassword2 === "") {
        $('.reg-form__reg-pass-span2').toggle();
        $('.reg-form__reg-pass2-span').toggle();
        return false;
    } else if (regPassword !== regPassword2) {
        $('.reg-form__reg-pass2-span').toggle();
        $('.reg-form__reg-pass2-span2').toggle();
        return false;
    } else $('.reg-form__reg-success-span').toggle();
    let postUser = new XMLHttpRequest();
    postUser.open("POST", 'http://localhost:3001/users', true);
    postUser.setRequestHeader('Content-Type', 'application/json');
    postUser.send(JSON.stringify(userData));
    return true;
};

function uploadPicture(element) {

    let file = element.files[0];

    let newName = "file-" + Date.now() + "--originally-" + file.name;
    let fileURL = "files/" + newName;

    let form_data = new FormData();
    form_data.append("fileToUpload", file);
    form_data.append("newName", newName);

    $.ajax({
        url: "",
        type: 'POST',
        contentType: false,
        data: form_data,
        cache: false,
        processData: false,
        dataType: 'text',
        emulateJSON: true,
        success: function (response) {

            let pictureFile = new XMLHttpRequest();
            pictureFile.open('POST', '' + uploadId, false);
            pictureFile.setRequestHeader("Content-type", "application/json");
            pictureFile.send('{"fileURL": "' + fileURL + '"}');
        }
    });

}

function regEmailCheck() {
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const emailMatch = regExEmail.test(regEmail);
    if (emailMatch === false) {
        $('.reg-form__reg-email-span').show();
        return false;
    } else if (emailMatch === true) {
        $('.reg-form__reg-email-span').hide()
        return true
    } else alert('Hiba történt!')
    return false;
};

function regPassCheck() {
    const regExPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const regPass = document.forms["reg_form"]["reg_password"].value;
    const passMatch = regExPass.test(regPass);
    if (passMatch === false) {
        $('.reg-form__reg-pass-span').show();
        return false
    } else if (passMatch === true) {
        $('.reg-form__reg-pass-span').hide();
        return true;
    } else alert('Hiba történt!')
    return false;
};

function regNameCheck() {
    const regExName = /^.{5,}$/;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const nameMatch = regExName.test(regName);
    if (nameMatch === false) {
        $('.reg-form__reg-name-span').show();
        return false
    } else if (nameMatch === true) {
        $('.reg-form__reg-name-span').hide()
        return true;
    } else alert('Hiba történt!')
    return false;
};