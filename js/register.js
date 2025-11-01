function switchTab(tab) {
    const customerForm = document.getElementById('customer-form');
    const hotelForm = document.getElementById('hotel-form');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'customer') {
        customerForm.classList.add('active');
        hotelForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        hotelForm.classList.add('active');
        customerForm.classList.remove('active');
        tabs[1].classList.add('active');
    }

    hideAlert();
    }

function showAlert(message, type) {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert ${type}`;
    alert.style.display = 'block';
            
    setTimeout(() => {
        hideAlert();
    }, 5000);
}

function hideAlert() {
    const alert = document.getElementById('alert');
    alert.style.display = 'none';
}

function registerCustomer(e) {
    e.preventDefault();
    showAlert('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

function registerHotel(e) {
    e.preventDefault();
    showAlert('Đăng ký thành công! Chúng tôi sẽ xem xét hồ sơ và phản hồi trong 24h.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}