// users.js - JavaScript cho trang quản lý người dùng

// Toggle Sidebar
function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('show');
}

// Show Add User Modal
function showAddUserModal() {
	document.getElementById('modalOverlay').classList.add('show');
	document.getElementById('addUserModal').classList.add('show');
}

// Show Edit User Modal
function editUser(userId) {
	// TODO: Load user data from server
	document.getElementById('modalOverlay').classList.add('show');
	document.getElementById('editUserModal').classList.add('show');
	
	// Demo: Pre-fill form with user data
	if (userId === 'U001') {
		document.getElementById('editUserName').value = 'Nguyễn Văn A';
		document.getElementById('editUserEmail').value = 'nguyenvana@email.com';
		document.getElementById('editUserPhone').value = '0901234567';
		document.getElementById('editUserRole').value = 'customer';
		document.getElementById('editUserStatus').value = 'active';
	}
}

// Close Modal
function closeModal() {
	document.getElementById('modalOverlay').classList.remove('show');
	document.getElementById('addUserModal').classList.remove('show');
	document.getElementById('editUserModal').classList.remove('show');
}

// Save New User
function saveUser() {
	const name = document.getElementById('userName').value.trim();
	const email = document.getElementById('userEmail').value.trim();
	const phone = document.getElementById('userPhone').value.trim();
	const password = document.getElementById('userPassword').value;
	const confirmPassword = document.getElementById('userConfirmPassword').value;
	const role = document.getElementById('userRole').value;
	
	// Validation
	if (!name) {
		alert('⚠️ Vui lòng nhập họ tên!');
		return;
	}
	
	if (!email) {
		alert('⚠️ Vui lòng nhập email!');
		return;
	}
	
	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		alert('⚠️ Email không hợp lệ!');
		return;
	}
	
	if (!phone) {
		alert('⚠️ Vui lòng nhập số điện thoại!');
		return;
	}
	
	// Phone validation (10 digits)
	const phoneRegex = /^0\d{9}$/;
	if (!phoneRegex.test(phone)) {
		alert('⚠️ Số điện thoại không hợp lệ! (10 số, bắt đầu bằng 0)');
		return;
	}
	
	if (!password) {
		alert('⚠️ Vui lòng nhập mật khẩu!');
		return;
	}
	
	if (password.length < 6) {
		alert('⚠️ Mật khẩu phải có ít nhất 6 ký tự!');
		return;
	}
	
	if (password !== confirmPassword) {
		alert('⚠️ Mật khẩu xác nhận không khớp!');
		return;
	}
	
	if (!role) {
		alert('⚠️ Vui lòng chọn vai trò!');
		return;
	}
	
	// TODO: Send data to server
	const userData = {
		name,
		email,
		phone,
		password,
		role
	};
	
	console.log('Creating user:', userData);
	alert('✅ Đã thêm người dùng mới thành công!');
	
	// Reset form
	document.getElementById('addUserForm').reset();
	closeModal();
	
	// TODO: Refresh user list
}

// Update User
function updateUser() {
	const name = document.getElementById('editUserName').value.trim();
	const email = document.getElementById('editUserEmail').value.trim();
	const phone = document.getElementById('editUserPhone').value.trim();
	const role = document.getElementById('editUserRole').value;
	const status = document.getElementById('editUserStatus').value;
	
	// Validation
	if (!name) {
		alert('⚠️ Vui lòng nhập họ tên!');
		return;
	}
	
	if (!email) {
		alert('⚠️ Vui lòng nhập email!');
		return;
	}
	
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		alert('⚠️ Email không hợp lệ!');
		return;
	}
	
	if (!phone) {
		alert('⚠️ Vui lòng nhập số điện thoại!');
		return;
	}
	
	const phoneRegex = /^0\d{9}$/;
	if (!phoneRegex.test(phone)) {
		alert('⚠️ Số điện thoại không hợp lệ!');
		return;
	}
	
	// TODO: Send update to server
	const userData = {
		name,
		email,
		phone,
		role,
		status
	};
	
	console.log('Updating user:', userData);
	alert('✅ Đã cập nhật thông tin người dùng!');
	closeModal();
	
	// TODO: Refresh user list
}

// Delete User
function deleteUser() {
	if (confirm('⚠️ Bạn có chắc chắn muốn xóa người dùng này?\n\nHành động này không thể hoàn tác!')) {
		// TODO: Send delete request to server
		alert('✅ Đã xóa người dùng thành công!');
		closeModal();
		// TODO: Refresh user list
	}
}

// Block User
function blockUser(userId) {
	if (confirm(`⚠️ Bạn có chắc muốn khóa tài khoản người dùng ${userId}?`)) {
		// TODO: Send block request to server
		alert(`✅ Đã khóa người dùng: ${userId}`);
		// TODO: Refresh user list
	}
}

// Unblock User
function unblockUser(userId) {
	if (confirm(`⚠️ Bạn có chắc muốn mở khóa tài khoản người dùng ${userId}?`)) {
		// TODO: Send unblock request to server
		alert(`✅ Đã mở khóa người dùng: ${userId}`);
		// TODO: Refresh user list
	}
}

// Refresh User List
function refreshUserList() {
	alert('✅ Đang làm mới danh sách người dùng...');
	// TODO: Reload user data from server
}

// Filter Functions
function filterByRole(role) {
	console.log('Filtering by role:', role);
	// TODO: Filter users by role
}

function filterByStatus(status) {
	console.log('Filtering by status:', status);
	// TODO: Filter users by status
}

function applySearch() {
	const searchInput = document.querySelector('input[placeholder*="Tìm kiếm"]');
	const searchTerm = searchInput ? searchInput.value.trim() : '';
	console.log('Searching for:', searchTerm);
	// TODO: Search users
}

// Preview Avatar
function previewAvatar(input, previewId) {
	if (input.files && input.files[0]) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const preview = document.getElementById(previewId);
			preview.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
		};
		reader.readAsDataURL(input.files[0]);
	}
}

// Reset Password
function resetPassword() {
	if (confirm('⚠️ Bạn có chắc muốn reset mật khẩu cho người dùng này?\n\nMật khẩu mới sẽ được gửi qua email.')) {
		alert('✅ Đã gửi email reset mật khẩu!');
	}
}

// Send Notification
function sendNotification() {
	const message = prompt('Nhập nội dung thông báo:');
	if (message) {
		alert('✅ Đã gửi thông báo đến người dùng!');
	}
}

// Close modal when clicking ESC
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		closeModal();
	}
});

// Active menu handling
document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('.sidebar__nav-link');
	const currentPage = window.location.pathname.split('/').pop() || 'index.html';
	
	navLinks.forEach(link => {
		const href = link.getAttribute('href');
		if (href === currentPage || (currentPage === '' && href === 'index.html')) {
			link.classList.add('sidebar__nav-link--active');
		} else {
			link.classList.remove('sidebar__nav-link--active');
		}
	});
	
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			navLinks.forEach(l => l.classList.remove('sidebar__nav-link--active'));
			this.classList.add('sidebar__nav-link--active');
		});
	});
});