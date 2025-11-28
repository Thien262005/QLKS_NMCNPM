function showAlert(message, type) {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert ${type}`;
    alert.style.display = 'block';
            
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

function handleLogin(e) {
    e.preventDefault();
    showAlert('Đăng nhập thành công!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function socialLogin(platform) {
    showAlert(`Đang đăng nhập với ${platform}...`, 'success');
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);