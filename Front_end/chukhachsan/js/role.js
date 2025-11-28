// MENU SIDEBAR 
function toggleSubmenu(e, id) {
  e.preventDefault();
  const submenu = document.getElementById(id);
  if (submenu) {
    const parent = submenu.parentElement;
    submenu.classList.toggle("active");
    parent.classList.toggle("open");
  }
}

//  LOGIC TRANG PHÂN QUYỀN 
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".permission-group")) {
    
    const groupMasterCheckboxes = document.querySelectorAll('.group-title input[type="checkbox"]');
    groupMasterCheckboxes.forEach((masterCheckbox) => {
      masterCheckbox.addEventListener("change", function () {
        const groupContainer = this.closest(".permission-group");
        const childCheckboxes = groupContainer.querySelectorAll('.checkbox-list input[type="checkbox"]');
        childCheckboxes.forEach((child) => {
          child.checked = this.checked;
        });
      });
    });

    const allChildCheckboxes = document.querySelectorAll('.checkbox-list input[type="checkbox"]');
    allChildCheckboxes.forEach((childCheckbox) => {
      childCheckbox.addEventListener("change", function () {
        const groupContainer = this.closest(".permission-group");
        const masterCheckbox = groupContainer.querySelector('.group-title input[type="checkbox"]');
        const siblings = groupContainer.querySelectorAll('.checkbox-list input[type="checkbox"]');
        const isAllChecked = Array.from(siblings).every((item) => item.checked);
        masterCheckbox.checked = isAllChecked;
      });
    });

    // Xử lý nút Áp dụng 
    const applyBtn = document.getElementById("applyPermissionBtn") || document.querySelector(".permission-filter .btn-primary");
    
    if (applyBtn) {
      applyBtn.addEventListener("click", function () {
         const toast = document.getElementById("toast-success");
         if (toast) {
             toast.className = "show";
             setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
         } else {
             alert("Thay đổi thành công!");
         }
      });
    }
  }
});

// LOGIC TRANG VAI TRÒ 
const modal = document.getElementById("roleModal");
const modalTitle = document.getElementById("modalTitle");
const roleNameInput = document.getElementById("roleName");
const roleDescInput = document.getElementById("roleDesc");
let currentRow = null;

// Mở Modal 
function openModal(mode, btn = null) {
  if (!modal) return;

  modal.classList.add("active");

  if (mode === "add") {
    currentRow = null;
    if(modalTitle) modalTitle.innerText = "Thêm Vai Trò Mới";
    if(roleNameInput) roleNameInput.value = "";
    if(roleDescInput) roleDescInput.value = "";
  } else {
    currentRow = btn.closest("tr");
    const cells = currentRow.querySelectorAll("td");

    if(modalTitle) modalTitle.innerText = "Cập Nhật Vai Trò";
    if(roleNameInput) roleNameInput.value = cells[1].innerText;
    if(roleDescInput) roleDescInput.value = cells[2].innerText;
  }
}

// Đóng Modal
function closeModal() {
  if (modal) modal.classList.remove("active");
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// Hàm lấy ngày giờ
function getCurrentDateHTML() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN");
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr}<br><small style="color:#999">${timeStr}</small>`;
}

// Hàm Lưu Vai Trò
function saveRole() {
  if (!roleNameInput) return;

  const name = roleNameInput.value.trim();
  const desc = roleDescInput ? roleDescInput.value.trim() : "";

  if (!name) {
    alert("Vui lòng nhập tên vai trò!");
    return;
  }

  const tableBody = document.querySelector("table tbody");
  if (!tableBody) return;

  if (currentRow === null) {
    const nextSTT = tableBody.rows.length + 1;
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${nextSTT}</td>
        <td><strong>${name}</strong></td>
        <td>${desc}</td>
        <td>${getCurrentDateHTML()}</td> 
        <td align="center">
            <div class="action-btns" style="justify-content: center">
                <button class="btn btn-sm btn-edit" onclick="openModal('edit', this)"><i class="fas fa-edit"></i> Sửa</button>
                <button class="btn btn-sm btn-delete" onclick="deleteRole(this)"><i class="fas fa-trash"></i> Xóa</button>
            </div>
        </td>
    `;
    tableBody.appendChild(newRow);
  } else {
    const cells = currentRow.querySelectorAll("td");
    cells[1].innerHTML = `<strong>${name}</strong>`;
    cells[2].innerText = desc;
  }

  closeModal();
}

// Hàm Xóa Vai Trò
function deleteRole(btn) {
  if (confirm("Bạn có chắc chắn muốn xóa vai trò này không?")) {
    const row = btn.closest("tr");
    if (row) row.remove();
  }
}

// Gắn sự kiện nút Thêm mới (Kiểm tra tồn tại trước)
const btnAdd = document.querySelector(".role-toolbar .btn-primary");
if (btnAdd) {
  btnAdd.addEventListener("click", () => openModal("add"));
}

const menuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.sidebar-overlay');

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu); 