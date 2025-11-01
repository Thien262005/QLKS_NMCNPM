const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
const bookings = JSON.parse(localStorage.getItem("myBookings") || "[]");

if (bookings.length > 0) {
  const latestBooking = bookings[0];
  document.getElementById("bookingId").textContent = latestBooking.id;
  document.getElementById("hotelName").textContent = latestBooking.hotel;
  document.getElementById("roomType").textContent = latestBooking.roomType;
  document.getElementById("checkin").textContent = formatDateTime(
    latestBooking.checkin
  );
  document.getElementById("checkout").textContent = formatDateTime(
    latestBooking.checkout
  );
  document.getElementById("guests").textContent =
    latestBooking.guests + " người";
  document.getElementById("totalAmount").textContent = latestBooking.total;
}

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year} - 14:00`;
}

// Clear booking data after showing
setTimeout(() => {
  localStorage.removeItem("bookingData");
}, 1000);
