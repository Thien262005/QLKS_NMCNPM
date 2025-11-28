let currentRoomId = null;
let isEditMode = false;

// Open Add Room Modal
function openAddRoomModal() {
  isEditMode = false;
  document.getElementById("roomModalTitle").innerHTML =
    '<i class="fas fa-plus-circle"></i> Thêm Phòng Mới';
  document.getElementById("roomForm").reset();
  document.getElementById("imagePreview").innerHTML = "";
  document.getElementById("roomModalOverlay").classList.add("show");
  document.getElementById("roomFormModal").classList.add("show");
}

// Open Edit Room Modal
function openEditRoomModal(roomData) {
  isEditMode = true;
  currentRoomId = roomData.id;
  document.getElementById("roomModalTitle").innerHTML =
    '<i class="fas fa-edit"></i> Chỉnh Sửa Phòng';

  // Fill form with room data
  document.getElementById("roomCode").value = roomData.code;
  document.getElementById("roomType").value = roomData.type;
  document.getElementById("roomPrice").value = roomData.price;
  document.getElementById("roomStatus").value = roomData.status;
  document.getElementById("roomFloor").value = roomData.floor;
  document.getElementById("roomCapacity").value = roomData.capacity;

  document.getElementById("roomModalOverlay").classList.add("show");
  document.getElementById("roomFormModal").classList.add("show");
}

// Close Room Modal
function closeRoomModal() {
  document.getElementById("roomModalOverlay").classList.remove("show");
  document.getElementById("roomFormModal").classList.remove("show");
}

// Open Delete Modal
function openDeleteModal(roomCode, roomType) {
  currentRoomId = roomCode;
  document.getElementById(
    "deleteRoomInfo"
  ).textContent = `${roomCode} - ${roomType}`;
  document.getElementById("roomModalOverlay").classList.add("show");
  document.getElementById("deleteRoomModal").classList.add("show");
}

// Close Delete Modal
function closeDeleteModal() {
  document.getElementById("roomModalOverlay").classList.remove("show");
  document.getElementById("deleteRoomModal").classList.remove("show");
}

// Save Room
function saveRoom() {
  const roomCode = document.getElementById("roomCode").value;
  const roomType = document.getElementById("roomType").value;
  const roomPrice = document.getElementById("roomPrice").value;

  if (!roomCode || !roomType || !roomPrice) {
    alert("⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!");
    return;
  }

  if (isEditMode) {
    alert(`✅ Đã cập nhật phòng ${roomCode} thành công!`);
  } else {
    alert(`✅ Đã thêm phòng ${roomCode} thành công!`);
  }

  closeRoomModal();
  // Reload table or update UI here
}

// Confirm Delete Room
function confirmDeleteRoom() {
  alert(`✅ Đã xóa phòng ${currentRoomId} thành công!`);
  closeDeleteModal();
  // Remove row from table or reload data
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    if (row.querySelector("td strong").textContent === currentRoomId) {
      row.remove();
    }
  });
}

// Handle Image Upload
document.getElementById("roomImages").addEventListener("change", function (e) {
  const files = e.target.files;
  const preview = document.getElementById("imagePreview");

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const div = document.createElement("div");
      div.className = "preview-item";
      div.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="remove-image" onclick="this.parentElement.remove()">×</button>
                    `;
      preview.appendChild(div);
    };
    reader.readAsDataURL(file);
  }
});

// Bind buttons to modals (thêm vào các nút trong bảng)
document.addEventListener("DOMContentLoaded", function () {
  // Bind Add button
  const addBtn = document.querySelector(".btn-primary");
  if (addBtn) {
    addBtn.onclick = openAddRoomModal;
  }

  // Bind Edit buttons
  const editBtns = document.querySelectorAll(".btn-edit");
  editBtns.forEach((btn, index) => {
    btn.onclick = function () {
      const row = this.closest("tr");
      const roomData = {
        id: row.querySelector("td:nth-child(1) strong").textContent,
        code: row.querySelector("td:nth-child(1) strong").textContent,
        type: row.querySelector("td:nth-child(2)").textContent,
        price: row
          .querySelector("td:nth-child(3) strong")
          .textContent.replace(/[^\d]/g, ""),
        status:
          row.querySelector(".status-badge").textContent.trim() === "Trống"
            ? "available"
            : row.querySelector(".status-badge").textContent.trim() === "Đã đặt"
            ? "booked"
            : "maintenance",
        floor: row
          .querySelector("td:nth-child(5)")
          .textContent.replace("Tầng ", ""),
        capacity: row
          .querySelector("td:nth-child(6)")
          .textContent.replace(" người", ""),
      };
      openEditRoomModal(roomData);
    };
  });

  // Bind Delete buttons
  const deleteBtns = document.querySelectorAll(".btn-delete");
  deleteBtns.forEach((btn) => {
    btn.onclick = function () {
      const row = this.closest("tr");
      const roomCode = row.querySelector("td:nth-child(1) strong").textContent;
      const roomType = row.querySelector("td:nth-child(2)").textContent;
      openDeleteModal(roomCode, roomType);
    };
  });
});

// Close modal when clicking ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeRoomModal();
    closeDeleteModal();
  }
});

