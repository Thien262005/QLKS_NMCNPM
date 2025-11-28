// Mở modal chi tiết giao dịch
function viewTransaction(txnId) {
  // Giả lập dữ liệu giao dịch
  const transactionData = {
    TXN54321: {
      id: "#TXN54321",
      bookingId: "#BK3847",
      amount: "3,000,000 VNĐ",
      time: "15/01/2025 14:35",
      status: "success",
      statusText: "Giao dịch thành công",
      statusIcon: "✓",
      customer: {
        name: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        phone: "0901234567",
      },
      hotel: {
        name: "Grand Hotel",
        roomType: "Deluxe Room",
        checkin: "20/01/2025",
        checkout: "22/01/2025",
        nights: "2 đêm",
      },
      payment: {
        method: "Thẻ tín dụng",
        code: "PAY123456789",
        roomPrice: "2,800,000 VNĐ",
        serviceFee: "150,000 VNĐ",
        vat: "50,000 VNĐ",
        total: "3,000,000 VNĐ",
      },
      timeline: [
        {
          time: "15/01/2025 14:35:00",
          title: "Giao dịch hoàn tất",
          desc: "Thanh toán thành công 3,000,000 VNĐ",
        },
        {
          time: "15/01/2025 14:34:45",
          title: "Xác thực thanh toán",
          desc: "Đang xác thực với ngân hàng...",
        },
        {
          time: "15/01/2025 14:34:30",
          title: "Khởi tạo giao dịch",
          desc: "Người dùng bắt đầu thanh toán",
        },
      ],
    },
    TXN54316: {
      id: "#TXN54316",
      bookingId: "#BK3842",
      amount: "4,200,000 VNĐ",
      time: "20/12/2024 15:20",
      status: "failed",
      statusText: "Giao dịch thất bại",
      statusIcon: "✗",
      customer: {
        name: "Võ Thị F",
        email: "vothif@email.com",
        phone: "0912345678",
      },
      hotel: {
        name: "Mountain View",
        roomType: "Suite Room",
        checkin: "25/12/2024",
        checkout: "27/12/2024",
        nights: "2 đêm",
      },
      payment: {
        method: "Chuyển khoản",
        code: "PAY987654321",
        roomPrice: "3,900,000 VNĐ",
        serviceFee: "200,000 VNĐ",
        vat: "100,000 VNĐ",
        total: "4,200,000 VNĐ",
      },
      timeline: [
        {
          time: "20/12/2024 15:20:15",
          title: "Giao dịch thất bại",
          desc: "Lý do: Số dư không đủ",
        },
        {
          time: "20/12/2024 15:20:00",
          title: "Xác thực thanh toán",
          desc: "Kiểm tra số dư tài khoản...",
        },
        {
          time: "20/12/2024 15:19:45",
          title: "Khởi tạo giao dịch",
          desc: "Người dùng bắt đầu thanh toán",
        },
      ],
    },
  };

  // Lấy dữ liệu hoặc dùng default
  const data = transactionData[txnId] || transactionData["TXN54321"];

  // Cập nhật status banner
  const statusBanner = document.getElementById("transactionStatusBanner");
  statusBanner.className = `transaction-status-banner ${data.status}`;
  statusBanner.innerHTML = `<span>${data.statusIcon}</span><span>${data.statusText}</span>`;

  // Cập nhật thông tin cơ bản
  document.getElementById("txnId").textContent = data.id;
  document.getElementById("bookingId").textContent = data.bookingId;
  document.getElementById("amount").textContent = data.amount;
  document.getElementById("txnTime").textContent = data.time;

  // Cập nhật thông tin khách hàng
  document.getElementById("customerName").textContent = data.customer.name;
  document.getElementById("customerEmail").textContent = data.customer.email;
  document.getElementById("customerPhone").textContent = data.customer.phone;

  // Cập nhật thông tin khách sạn
  document.getElementById("hotelName").textContent = data.hotel.name;
  document.getElementById("roomType").textContent = data.hotel.roomType;
  document.getElementById("checkin").textContent = data.hotel.checkin;
  document.getElementById("checkout").textContent = data.hotel.checkout;
  document.getElementById("nights").textContent = data.hotel.nights;

  // Cập nhật thông tin thanh toán
  document.getElementById("paymentMethod").innerHTML = data.payment.method;
  document.getElementById("paymentCode").textContent = data.payment.code;
  document.getElementById("roomPrice").textContent = data.payment.roomPrice;
  document.getElementById("serviceFee").textContent = data.payment.serviceFee;
  document.getElementById("vat").textContent = data.payment.vat;
  document.getElementById("totalAmount").textContent = data.payment.total;

  // Cập nhật timeline
  const timeline = document.getElementById("transactionTimeline");
  timeline.innerHTML = data.timeline
    .map(
      (item) => `
                <div class="timeline-item">
                    <div class="timeline-item-time">${item.time}</div>
                    <div class="timeline-item-content">
                        <strong>${item.title}</strong><br>
                        ${item.desc}
                    </div>
                </div>
            `
    )
    .join("");

  // Hiển thị nút hoàn tiền nếu giao dịch thành công
  const refundBtn = document.getElementById("refundBtn");
  refundBtn.style.display = data.status === "success" ? "block" : "none";

  // Hiển thị modal
  document.getElementById("transactionModalOverlay").classList.add("show");
  document.getElementById("transactionDetailModal").classList.add("show");
}

// Đóng modal
function closeTransactionModal() {
  document.getElementById("transactionModalOverlay").classList.remove("show");
  document.getElementById("transactionDetailModal").classList.remove("show");
}

// In hóa đơn
function printTransaction() {
  window.print();
}

// Hoàn tiền
function refundTransaction() {
  if (confirm("Bạn có chắc muốn hoàn tiền cho giao dịch này?")) {
    alert(
      "Đã gửi yêu cầu hoàn tiền! Tiền sẽ được hoàn lại trong 3-5 ngày làm việc."
    );
    closeTransactionModal();
  }
}

// Đóng modal khi nhấn ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeTransactionModal();
  }
});
