let humanVerified = false;

async function turnstileSuccess(token){

    const res = await fetch("/api/security/turnstile",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            token
        })

    });

    const data = await res.json();

    if(data.success){

        humanVerified = true;

        console.log("✔ Human Verified");

    }else{

        alert("Human verification failed.");

    }

}

function handleCredentialResponse(response){

    if(!humanVerified){

        alert("Complete Human Verification first.");

        return;

    }

    const payload = JSON.parse(

        atob(response.credential.split(".")[1])

    );

    document.getElementById("username").textContent =
        payload.name;

    document.getElementById("user-photo").src =
        payload.picture;

    localStorage.setItem(
        "cv_user",
        JSON.stringify(payload)
    );

    startAuthentication();

}
