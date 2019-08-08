function checkUser(){
    const loginName = document.forms["login_form"]["loginName"].value;
    const loginPassword = document.forms["login_form"]["loginPassword"].value;

    if(loginName == "" && loginPassword == "" ){
        alert('Kérem írja be Felhasználó nevét és jelszavát!')
        return false;
    }  else if (loginName == "admin" && loginPassword == ""){
        alert('Kérem adja meg jelszavát!')
        return false;
    } else if (loginName == "" && loginPassword == "Béla"){
        alert('Kérem adja meg felhasználó nevét')
        return false;
    } else if (loginName == "admin" && loginPassword == "Béla"){
        alert ('Sikeres bejelentkezés!')
        return false;
    }
     else alert('Valami hiba történt!')
}; 

