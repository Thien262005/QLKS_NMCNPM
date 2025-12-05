// 1. Chức năng ẩn/hiện mật khẩu
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
        toggleIcon.style.color = '#667eea';
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
        toggleIcon.style.color = '#999';
    }
}

// Xử lý Đăng nhập (Giả lập)
function handleLogin(event) {
    event.preventDefault(); 

    const email = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const btn = document.querySelector('.btn-login');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    btn.style.opacity = '0.8';
    btn.disabled = true;

    // Giả lập delay server 1.5 giây
    setTimeout(() => {
        // Ở đây có thể check email/pass thật
        // cứ nhập là vào
        
        if (email && pass) {
            // Chuyển hướng sang trang Dashboard
            window.location.href = 'index.html';
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!');
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        }
    }, 1500);
}