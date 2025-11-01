// hotels.js - JavaScript cho trang quản lý khách sạn

function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('show');
}

function showAddHotelModal() {
	document.getElementById('modalOverlay').style.display = 'block';
	document.getElementById('addHotelModal').classList.add('show');
}

function closeModal() {
	document.getElementById('modalOverlay').style.display = 'none';
	document.getElementById('addHotelModal').classList.remove('show');
	document.getElementById('editHotelModal').classList.remove('show');
	document.getElementById('detailsHotelModal').classList.remove('show');
}

function refreshHotelList() {
	alert('✅ Đã làm mới danh sách khách sạn!');
}

function editHotel(id) {
	// TODO: Load dữ liệu khách sạn theo ID
	document.getElementById('modalOverlay').style.display = 'block';
	document.getElementById('editHotelModal').classList.add('show');
}

function viewHotelDetails(id) {
	// TODO: Load chi tiết khách sạn theo ID
	document.getElementById('modalOverlay').style.display = 'block';
	document.getElementById('detailsHotelModal').classList.add('show');
}

function saveHotel() {
	const name = document.getElementById('hotelName').value;
	const address = document.getElementById('hotelAddress').value;
	const rooms = document.getElementById('hotelRooms').value;
	const price = document.getElementById('hotelPrice').value;
	
	// Validation
	if (!name) {
		alert('⚠️ Vui lòng nhập tên khách sạn!');
		return;
	}
	if (!address) {
		alert('⚠️ Vui lòng nhập địa chỉ!');
		return;
	}
	if (!rooms || rooms <= 0) {
		alert('⚠️ Vui lòng nhập số phòng hợp lệ!');
		return;
	}
	if (!price || price <= 0) {
		alert('⚠️ Vui lòng nhập giá hợp lệ!');
		return;
	}
	
	// TODO: Gửi dữ liệu lên server
	alert('✅ Đã thêm khách sạn mới thành công!');
	
	// Reset form
	document.getElementById('hotelName').value = '';
	document.getElementById('hotelAddress').value = '';
	document.getElementById('hotelRooms').value = '';
	document.getElementById('hotelPrice').value = '';
	document.getElementById('hotelDescription').value = '';
	
	closeModal();
}

function updateHotel() {
	const name = document.getElementById('editHotelName').value;
	
	if (!name) {
		alert('⚠️ Vui lòng nhập tên khách sạn!');
		return;
	}
	
	// TODO: Cập nhật dữ liệu lên server
	alert('✅ Đã cập nhật thông tin khách sạn!');
	closeModal();
}

function deleteHotel() {
	if (confirm('⚠️ Bạn có chắc chắn muốn xóa khách sạn này?\n\nHành động này không thể hoàn tác!')) {
		// TODO: Gửi yêu cầu xóa lên server
		alert('✅ Đã xóa khách sạn thành công!');
		closeModal();
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