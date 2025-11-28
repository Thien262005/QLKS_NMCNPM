const bookingData = {
    'BK12345': {
        customer: "Nguyễn Văn A", phone: "0912345678", email: "nguyenvana@email.com",
        room: "Deluxe King", roomNumber: "R101",
        checkin: "15/10/2025 14:00", checkout: "17/10/2025 12:00",
        guests: "2 người", total: "5.775.000đ",
        status: "Đã xác nhận"
    },
    'BK12346': {
        customer: "Trần Thị B", phone: "0987654321", email: "tranthib@email.com",
        room: "Suite Executive", roomNumber: "R102",
        checkin: "16/10/2025 14:00", checkout: "19/10/2025 12:00",
        guests: "3 người", total: "13.500.000đ",
        status: "Chờ xác nhận"
    },
    'BK12347': {
        customer: "Lê Văn C", phone: "0901234567", email: "levanc@email.com",
        room: "Presidential Suite", roomNumber: "P001",
        checkin: "18/10/2025 14:00", checkout: "23/10/2025 12:00",
        guests: "6 người", total: "60.000.000đ",
        status: "Đã xác nhận"
    },
    'BK12348': {
        customer: "Hoàng Văn E", phone: "0934567890", email: "hoangvane@email.com",
        room: "Suite Executive", roomNumber: "R104",
        checkin: "22/10/2025", checkout: "25/10/2025",
        guests: "4 người", total: "13.500.000đ",
        status: "Chờ xác nhận"
    }
};

// HIỆN MODAL CHI TIẾT
function showBookingDetail(bookingId) {
    const modal = document.getElementById("bookingModal");
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; //
    updateModalContent(bookingId);
}

// ĐÓNG MODAL
function closeModal() {
    const modal = document.getElementById("bookingModal");
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

//  CẬP NHẬT NỘI DUNG MODAL 
function updateModalContent(bookingId) {
    const data = bookingData[bookingId]; 
    
    if (data) {
        document.getElementById("modalBookingId").textContent = bookingId;
        document.getElementById("modalCustomerName").textContent = data.customer;
        document.getElementById("modalCustomerPhone").textContent = data.phone;
        document.getElementById("modalRoomType").textContent = data.room;
        document.getElementById("modalRoomNumber").textContent = data.roomNumber;
        document.getElementById("modalCheckin").textContent = data.checkin;
        document.getElementById("modalCheckout").textContent = data.checkout;
        document.getElementById("modalGuests").textContent = data.guests;
        document.getElementById("modalTotal").textContent = data.total;

        const statusBadge = document.getElementById("modalStatus");
        statusBadge.textContent = data.status;
        
        statusBadge.className = "status-badge";
        if (data.status === "Đã xác nhận") {
            statusBadge.classList.add("status-booked"); 
        } else if (data.status === "Chờ xác nhận") {
            statusBadge.classList.add("status-pending"); 
        } else if (data.status === "Đã hủy") {
            statusBadge.classList.add("status-cancelled"); 
        }
    }
}

//  HỦY ĐƠN 
function cancelBooking(bookingId, btnElement) {
    if (!confirm(`Bạn có chắc chắn muốn HỦY đơn ${bookingId} không?`)) {
        return;
    }

    if (bookingData[bookingId]) {
        bookingData[bookingId].status = "Đã hủy";
    }

    const row = btnElement.closest('tr');
    const statusCell = row.querySelector('[data-label="Trạng Thái"]');
    if (statusCell) {
        statusCell.innerHTML = '<span class="status-badge status-cancelled">Đã hủy</span>';
    }

    const actionCell = row.querySelector('.action-btns') || row.querySelector('[data-label="Hành Động"]');
    if (actionCell) {
        actionCell.innerHTML = `
            <div class="action-btns">
                <button class="btn btn-sm btn-edit" onclick="showBookingDetail('${bookingId}')">
                    <i class="fas fa-eye"></i> Xem
                </button>
            </div>
        `;
    }
}

// XÁC NHẬN ĐƠN
function confirmBooking(bookingId, btnElement) {
    if(confirm("Xác nhận đơn " + bookingId + "?")) {
        if (bookingData[bookingId]) {
            bookingData[bookingId].status = "Đã xác nhận";
        }
        const row = btnElement.closest('tr');
        const statusCell = row.querySelector('[data-label="Trạng Thái"]');
        statusCell.innerHTML = '<span class="status-badge status-booked">Đã xác nhận</span>';
        const actionCell = row.querySelector('.action-btns') || row.querySelector('[data-label="Hành Động"]');
        actionCell.innerHTML = `
            <div class="action-btns">
                <button class="btn btn-sm btn-edit" onclick="showBookingDetail('${bookingId}')">
                    <i class="fas fa-eye"></i> Xem
                </button>
            </div>
        `;
    }
}

// Toggle sidebar (Mobile)
function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("active");
    document.querySelector(".sidebar-overlay").classList.toggle("active");
}

// Đóng modal khi ấn ESC
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});