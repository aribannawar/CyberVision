const agree = document.getElementById("agree");
const continueBtn = document.getElementById("continueBtn");

agree.addEventListener("change", () => {
    continueBtn.disabled = !agree.checked;
});

continueBtn.addEventListener("click", () => {
    window.location.href = "/authentication.html";
});
