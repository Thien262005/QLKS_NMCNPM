function searchHotels() {
        alert("Đang tìm kiếm khách sạn...");
      }

      function viewHotelDetail(hotelId) {
        window.location.href = `hotel-detail.html?id=${hotelId}`;
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

// --- LOGIC CHUYỂN TAB SIDEBAR ---
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(el => {
        el.classList.remove('active');
    });

    document.querySelectorAll('.sidebar-menu a').forEach(el => {
        el.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const activeLink = document.querySelector(`.sidebar-menu a[onclick*="'${sectionId}'"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    if (sectionId === 'bookings') {
        renderProfileBookings('all');
    }
}

// XỬ LÝ ĐƠN ĐẶT PHÒNG 
function loadBookings() {
    const savedBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
    if (savedBookings.length === 0) {
        return [
            {
                id: "BK2025001",
                hotel: "Grand Luxury Hotel & Spa",
                roomType: "Deluxe King Bed",
                checkin: "2025-11-25",
                checkout: "2025-11-27",
                total: "5.775.000đ",
                status: "confirmed",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300"
            },
            {
                id: "BK2025002",
                hotel: "Paradise Beach Resort",
                roomType: "Ocean View Suite",
                checkin: "2025-10-10",
                checkout: "2025-10-12",
                total: "3.600.000đ",
                status: "completed",
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300"
            }
        ];
    }
    return savedBookings;
}

// Render 
function renderProfileBookings(filter) {
    const bookings = loadBookings();
    const container = document.getElementById('profileBookingsList');

    const filteredBookings = filter === 'all' 
        ? bookings 
        : bookings.filter(b => b.status === filter);

    container.innerHTML = '';

    if (filteredBookings.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #888;">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Không tìm thấy đơn đặt phòng nào.</p>
            </div>
        `;
        return;
    }

    filteredBookings.forEach(booking => {
        let statusText = "";
        let statusClass = "";
        
        switch(booking.status) {
            case 'confirmed': statusText = "Đã xác nhận"; statusClass = "status-confirmed"; break;
            case 'pending': statusText = "Chờ xác nhận"; statusClass = "status-pending"; break;
            case 'completed': statusText = "Hoàn thành"; statusClass = "status-completed"; break;
            case 'cancelled': statusText = "Đã hủy"; statusClass = "status-cancelled"; break;
            default: statusText = booking.status;
        }

        const html = `
            <div class="p-booking-card">
                <img src="${booking.image}" alt="Hotel" class="p-booking-img">
                
                <div class="p-booking-info">
                    <div class="p-booking-header">
                        <div>
                            <div class="p-booking-id"><i class="fas fa-hashtag"></i> ${booking.id}</div>
                            <h3 class="p-hotel-name">${booking.hotel}</h3>
                        </div>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    
                    <div class="p-booking-details">
                        <div><i class="fas fa-bed"></i> ${booking.roomType}</div>
                        <div style="margin-top: 5px;">
                            <i class="fas fa-calendar-alt"></i> 
                            ${formatDate(booking.checkin)} - ${formatDate(booking.checkout)}
                        </div>
                    </div>
                    
                    <div class="p-booking-footer">
                        <div class="p-price">${booking.total}</div>
                        
                        <button class="btn btn-outline btn-sm" style="border-radius: 20px;" onclick="viewDetail('${booking.id}')">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
}

function filterProfileBookings(filter) {
    document.querySelectorAll('.profile-tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('onclick').includes(filter)) {
            btn.classList.add('active');
        }
    });

    renderProfileBookings(filter);
}

function viewDetail(id) {
    alert("Xem chi tiết đơn hàng: " + id);
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        alert("Đã chọn ảnh: " + file.name);
    }
}

function saveProfile(event) {
    event.preventDefault();
    alert("Đã lưu thông tin hồ sơ thành công!");
}

function changePassword(event) {
    event.preventDefault();
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    
    if (newPass !== confirmPass) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }
    alert("Đổi mật khẩu thành công!");
    document.getElementById('passwordForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {});

// LOGIC POPUP 
function openFilterModal() {
    const modal = document.getElementById('filterModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeFilterModal() {
    const modal = document.getElementById('filterModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeFilterModal();
    }
});