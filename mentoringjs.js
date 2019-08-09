function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    if (loginName === "" && loginPassword === "") {
        alert('Kérem írja be Felhasználó nevét és jelszavát!')
        return false;
    } else if (loginName !== "admin" && loginPassword === "") {
        alert('Kérem adja meg jelszavát!')
        return false;
    } else if (loginName !== "admin" && loginPassword !== "Béla") {
        alert('Hibás felhasználónév, vagy jelszó!')
        return false;
    } else if (loginName === "" && loginPassword !== "Béla") {
        alert('Kérem adja meg felhasználó nevét')
        return false;
    } else if (loginName === "admin" && loginPassword === "Béla") {
        alert('Sikeres bejelentkezés!')
        window.location.replace("accountpage.html")
    } else alert('Hibás felhasználónév, vagy jelszó!')
    return false;
};

/*function checkUserLogin() {
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    switch (loginName) {
        case loginName === "":
            alert('Kérem írja be Felhasználó nevét!');
            break;
        case loginName !== "admin":
            alert('Kérem adja meg jelszavát!');
            break;
        case (loginName === "admin"):
            alert('Sikeres bejelentkezés!')
            window.location.replace("accountpage.html");
            break
        default:
            alert('Hibás felhasználónév, vagy jelszó!')
    }
}; */


function checkUserRegistration() {
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const regPassword = document.forms["reg_form"]["reg_password"].value;
    const regPassword2 = document.forms["reg_form"]["reg_password2"].value;

    if (regEmail === "") {
        alert('Kérem írja be az e-mail címét!')
        return false;
    } else if (regName === "") {
        alert('Kérem írja be felhasználó nevét!')
        return false;
    } else if (regPassword === "") {
        alert('Kérem írja be jelszavát!')
        return false;
    } else if (regPassword2 === "") {
        alert('Kérem ismételje meg jelszavát')
        return false
    } else if (regPassword !== regPassword2) {
        alert('A két jelszó nem egyezik!')
        return false
    } else alert('Minden ki van töltve!')
    return false;
};


function regEmailCheck() {
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regEmail = document.forms["reg_form"]["reg_email"].value;
    const emailMatch = regEmail.match(regExEmail);
    if (emailMatch === null) {
        alert('Az e-mail cím nem megfelelő!')
        return false
    } else if (emailMatch[0] === regEmail) {
        alert('Az e-mail cím megfelelő!')
    } else alert('Valami nem jó!')
    return false;
};

function regPassCheck() {
    const regExPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const regPass = document.forms["reg_form"]["reg_password"].value;
    const passMatch = regPass.match(regExPass);
    if (passMatch === null) {
        alert('A jelszó nem elég erős! Kérem használjon legalább 1 nagy betűt és 1 számot!')
        return false
    } else if (passMatch[0] === regPass) {
        alert('A jelszó megfelelő!')
        return true;
    } else alert('Valami nem jó!')
    return false;
};

function regNameCheck() {
    const regExName = /^.{8,}$/;
    const regName = document.forms["reg_form"]["reg_name"].value;
    const nameMatch = regName.match(regExName);
    if (nameMatch === null) {
        alert('A felhasználónév nem elég hosszú! Kérem használjon minimum 8 karaktert!')
        return false
    } else if (nameMatch[0] === regExName) {
        alert('A felhasználónév megfelelő!')
        return true;
    } else alert('Valami nem jó!')
    return false;
};

$(document).ready(function () {
    $('.reg_name_label').mouseenter(function () {
        $('.reg_name_span').show();
    });
    $('.reg_name_label').mouseleave(function () {
        $('.reg_name_span').hide();
    });
    $('.reg_pass_label').mouseenter(function () {
        $('.reg_pass_span').show();
    });
    $('.reg_pass_label').mouseleave(function () {
        $('.reg_pass_span').hide();
    });
    $('.reg_pass2_label').mouseenter(function () {
        $('.reg_pass2_span').toggle();
    });
})


/* $('.home_icon').mouseenter(function () {
    $('.page_title').css({
        'padding-left': '0.5em',
    });
});
 $('.home_icon').mouseleave(function () {
        $('.page_title').css({
            'padding-left': '0em'
        });
}); */