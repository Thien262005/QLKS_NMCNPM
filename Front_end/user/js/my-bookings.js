let currentFilter = "all";
let bookingToCancel = null;

// Sample data + loaded data from localStorage
function loadBookings() {
  const savedBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");

  // Add sample bookings if no data exists
  if (savedBookings.length === 0) {
    const sampleBookings = [
      {
        id: "BK" + Date.now(),
        hotel: "Grand Luxury Hotel & Spa",
        roomType: "Deluxe King Bed",
        checkin: "2025-10-15",
        checkout: "2025-10-17",
        guests: "2 người",
        total: "5.775.000đ",
        status: "confirmed",
        bookingDate: new Date().toISOString(),
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300",
      },
    ];
    return sampleBookings;
  }

  return savedBookings;
}

function renderBookings(filter = "all") {
  const bookings = loadBookings();
  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const container = document.getElementById("bookingsList");

  if (filteredBookings.length === 0) {
    container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="fas fa-inbox"></i>
                        </div>
                        <h3 class="empty-title">Không có đơn đặt phòng</h3>
                        <p class="empty-text">
                            ${
                              filter === "all"
                                ? "Bạn chưa có đơn đặt phòng nào. Hãy khám phá và đặt phòng ngay!"
                                : "Không có đơn đặt phòng nào ở trạng thái này."
                            }
                        </p>
                        <a href="booking.html" class="empty-action">
                            <i class="fas fa-search"></i> Tìm Khách Sạn
                        </a>
                    </div>
                `;
    return;
  }

  container.innerHTML = filteredBookings
    .map((booking) => {
      const statusClass = `status-${booking.status}`;
      const statusText = {
        confirmed: "Đã xác nhận",
        pending: "Chờ xác nhận",
        cancelled: "Đã hủy",
        completed: "Đã hoàn thành",
      }[booking.status];

      const showCancelButton =
        booking.status === "confirmed" || booking.status === "pending";
      const showRebookButton =
        booking.status === "cancelled" || booking.status === "completed";

      return `
                    <div class="booking-card">
                        <img src="${
                          booking.image ||
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300"
                        }" 
                             alt="${booking.hotel}" class="booking-image">
                        
                        <div class="booking-info">
                            <div class="booking-header">
                                <div>
                                    <div class="booking-id">
                                        <i class="fas fa-ticket-alt"></i> ${
                                          booking.id
                                        }
                                    </div>
                                    <h3 class="hotel-name">${booking.hotel}</h3>
                                </div>
                                <div class="status-badge ${statusClass}">
                                    ${statusText}
                                </div>
                            </div>

                            <div class="booking-details">
                                <div class="detail-item">
                                    <i class="fas fa-bed"></i>
                                    <span>${booking.roomType}</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-calendar-check"></i>
                                    <span>${formatDate(booking.checkin)}</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-calendar-times"></i>
                                    <span>${formatDate(booking.checkout)}</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-users"></i>
                                    <span>${booking.guests}</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-money-bill-wave"></i>
                                    <span><strong>${
                                      booking.total
                                    }</strong></span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-clock"></i>
                                    <span>${formatBookingDate(
                                      booking.bookingDate
                                    )}</span>
                                </div>
                            </div>
                        </div>

                        <div class="booking-actions">
                            <button class="action-btn btn-view" onclick="viewBookingDetail('${
                              booking.id
                            }')">
                                <i class="fas fa-eye"></i> Chi Tiết
                            </button>
                            ${
                              showCancelButton
                                ? `
                                <button class="action-btn btn-cancel" onclick="showCancelModal('${booking.id}')">
                                    <i class="fas fa-times"></i> Hủy Đơn
                                </button>
                            `
                                : ""
                            }
                            ${
                              showRebookButton
                                ? `
                                <button class="action-btn btn-rebook" onclick="rebookHotel('${booking.id}')">
                                    <i class="fas fa-redo"></i> Đặt Lại
                                </button>
                            `
                                : ""
                            }
                        </div>
                    </div>
                `;
    })
    .join("");
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN");
}

function formatBookingDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN");
}

function filterBookings(filter) {
  currentFilter = filter;

  // Update active tab
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  event.target.closest(".tab").classList.add("active");

  renderBookings(filter);
}

function viewBookingDetail(bookingId) {
  alert(`Xem chi tiết đơn đặt phòng: ${bookingId}`);
  // Navigate to detail page or show modal
}

function showCancelModal(bookingId) {
  bookingToCancel = bookingId;
  document.getElementById("cancelModal").classList.add("active");
}

function closeModal() {
  document.getElementById("cancelModal").classList.remove("active");
  bookingToCancel = null;
}

function confirmCancel() {
  if (!bookingToCancel) return;

  const bookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
  const index = bookings.findIndex((b) => b.id === bookingToCancel);

  if (index !== -1) {
    bookings[index].status = "cancelled";
    localStorage.setItem("myBookings", JSON.stringify(bookings));

    closeModal();
    renderBookings(currentFilter);

    // Show success message
    alert(
      "Đã hủy đặt phòng thành công. Tiền sẽ được hoàn lại trong 3-5 ngày làm việc."
    );
  }
}

function rebookHotel(bookingId) {
  window.location.href = "booking.html";
}

// Click outside modal to close
document.getElementById("cancelModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Initial render
renderBookings();

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

// Open Modal
function viewBookingDetail(bookingId) {
    const bookings = loadBookings(); 
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        document.getElementById('m-hotel').textContent = booking.hotel;
        document.getElementById('m-image').src = booking.image;
        document.getElementById('m-id').textContent = booking.id;
        document.getElementById('m-bookingDate').textContent = formatBookingDate(booking.bookingDate);
        document.getElementById('m-checkin').textContent = formatDate(booking.checkin);
        document.getElementById('m-checkout').textContent = formatDate(booking.checkout);
        document.getElementById('m-room').textContent = booking.roomType;
        document.getElementById('m-guests').textContent = booking.guests;
        document.getElementById('m-total').textContent = booking.total;

        const statusEl = document.getElementById('m-status');
        let statusText = "";
        let statusColor = "";
        let statusBg = "";

        if (booking.status === 'confirmed') {
            statusText = "Đã xác nhận"; statusBg = "#e3f2fd"; statusColor = "#2196f3";
        } else if (booking.status === 'pending') {
            statusText = "Chờ xác nhận"; statusBg = "#fff3e0"; statusColor = "#ff9800";
        } else if (booking.status === 'completed') {
            statusText = "Hoàn thành"; statusBg = "#e8f5e9"; statusColor = "#4caf50";
        } else {
            statusText = "Đã hủy"; statusBg = "#ffebee"; statusColor = "#f44336";
        }

        statusEl.textContent = statusText;
        statusEl.style.backgroundColor = statusBg;
        statusEl.style.color = statusColor;

        document.getElementById('detailModal').classList.add('active');
    }
}

// Close Modal 
function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

document.getElementById('detailModal').addEventListener('click', function(e) {
    if (e.target === this) closeDetailModal();
});

// XEM CHI TIẾT
function viewBookingDetail(bookingId) {
    const bookings = loadBookings();
    const booking = bookings.find((b) => b.id === bookingId);

    if (booking) {
        document.getElementById("m-image").src = booking.image;
        document.getElementById("m-hotel").textContent = booking.hotel;
        document.getElementById("m-id").textContent = booking.id;
        
        const bDate = booking.bookingDate ? formatBookingDate(booking.bookingDate) : "25/11/2025";
        document.getElementById("m-bookingDate").textContent = bDate;
        
        document.getElementById("m-checkin").textContent = formatDate(booking.checkin);
        document.getElementById("m-checkout").textContent = formatDate(booking.checkout);
        document.getElementById("m-room").textContent = booking.roomType;
        document.getElementById("m-guests").textContent = booking.guests;
        document.getElementById("m-total").textContent = booking.total;

        const statusEl = document.getElementById("m-status");
        let statusText = "";
        let statusBg = "";
        let statusColor = "";

        if (booking.status === "confirmed") {
            statusText = "Đã xác nhận";
            statusBg = "#e3f2fd";
            statusColor = "#2196f3";
        } else if (booking.status === "pending") {
            statusText = "Chờ xác nhận";
            statusBg = "#fff3e0";
            statusColor = "#ff9800";
        } else if (booking.status === "completed") {
            statusText = "Hoàn thành";
            statusBg = "#e8f5e9";
            statusColor = "#4caf50";
        } else {
            statusText = "Đã hủy";
            statusBg = "#ffebee";
            statusColor = "#f44336";
        }

        statusEl.textContent = statusText;
        statusEl.style.backgroundColor = statusBg;
        statusEl.style.color = statusColor;

        // 4. LOGIC ẨN/HIỆN NÚT IN VÉ
        const btnPrint = document.getElementById("btnPrint");
        if (booking.status === "confirmed") {
            btnPrint.style.display = "inline-flex"; 
        } else {
            btnPrint.style.display = "none"; 
        }
        document.getElementById("detailModal").classList.add("active");
    }
}

function closeDetailModal() {
    document.getElementById("detailModal").classList.remove("active");
}

document.getElementById("detailModal").addEventListener("click", function (e) {
    if (e.target === this) {
        closeDetailModal();
    }
});