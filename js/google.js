function handleCredentialResponse(response) {

    // Decode Google JWT
    const payload = JSON.parse(
        atob(response.credential.split(".")[1])
    );

    console.log("Google User:", payload);

    // Update UI
    document.getElementById("username").textContent = payload.name;
    document.getElementById("user-photo").src = payload.picture;

    // Save user for later
    localStorage.setItem(
        "cv_user",
        JSON.stringify(payload)
    );

    // Start authentication animation
    if (typeof startAuthentication === "function") {
        startAuthentication();
    }
}
