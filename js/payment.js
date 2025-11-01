let currentPaymentMethod = "card";

// Load booking data
const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");

if (bookingData.hotel) {
  document.getElementById("hotelName").textContent = bookingData.hotel;
  document.getElementById("roomType").textContent = bookingData.roomType;
  document.getElementById("checkinDate").textContent = formatDate(
    bookingData.checkin
  );
  document.getElementById("checkoutDate").textContent = formatDate(
    bookingData.checkout
  );
  document.getElementById("guests").textContent = bookingData.guests + " người";
  document.getElementById("totalAmount").textContent = bookingData.total;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN");
}

function selectPayment(method) {
  currentPaymentMethod = method;

  // Update active state
  document.querySelectorAll(".payment-method").forEach((el) => {
    el.classList.remove("active");
  });
  document.querySelector(`.payment-method.${method}`).classList.add("active");

  // Show corresponding form
  document.querySelectorAll(".form-section").forEach((el) => {
    el.classList.remove("active");
  });
  document.getElementById(`${method}-form`).classList.add("active");
}

function applyPromo() {
  const promoInput = document.querySelector(".promo-input");
  const promoCode = promoInput.value.trim().toUpperCase();

  if (promoCode === "LUXSTAY500") {
    document.getElementById("discountRow").style.display = "flex";
    document.getElementById("totalAmount").textContent = "5.275.000đ";
    showAlert("Áp dụng mã giảm giá thành công! Giảm 500.000đ", "success");
    promoInput.value = "";
  } else if (promoCode) {
    showAlert("Mã giảm giá không hợp lệ", "info");
  }
}

function showAlert(message, type) {
  const alert = document.getElementById("alert");
  alert.textContent = message;
  alert.className = `alert ${type}`;
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
  }, 5000);
}

function processPayment(e) {
  if (e) e.preventDefault();

  // Simulate payment processing
  const submitBtn = document.querySelector(".submit-payment");
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
  submitBtn.disabled = true;

  setTimeout(() => {
    // Save booking to history
    saveBookingToHistory();

    // Redirect to success page
    window.location.href = "booking-success.html";
  }, 2000);
}

function saveBookingToHistory() {
  const bookings = JSON.parse(localStorage.getItem("myBookings") || "[]");

  const newBooking = {
    id: "BK" + Date.now(),
    hotel: bookingData.hotel || "Grand Luxury Hotel & Spa",
    roomType: bookingData.roomType || "Deluxe King Bed",
    checkin: bookingData.checkin,
    checkout: bookingData.checkout,
    guests: bookingData.guests,
    total: document.getElementById("totalAmount").textContent,
    status: "confirmed",
    bookingDate: new Date().toISOString(),
    paymentMethod: currentPaymentMethod,
  };

  bookings.unshift(newBooking);
  localStorage.setItem("myBookings", JSON.stringify(bookings));
}
