// JavaScript cho trang quản lý hệ thống

// Toggle Sidebar
function toggleSidebar() {
	document.getElementById('sidebar').classList.toggle('show');
}

// Close Modal
function closeModal() {
	document.getElementById('modalOverlay').classList.remove('show');
	document.getElementById('paymentConfigModal').classList.remove('show');
	document.getElementById('backupModal').classList.remove('show');
	document.getElementById('viewBackupsModal').classList.remove('show');
}

// Save System Config
function saveSystemConfig() {
	alert('✅ Lưu cấu hình hệ thống thành công!');
}

// Save Email Config
function saveEmailConfig() {
	alert('✅ Lưu cấu hình email thành công!');
}

// Test Email
function testEmail() {
	const testStatus = document.getElementById('emailTestStatus');
	testStatus.classList.add('show');
	
	// Simulate testing
	setTimeout(() => {
		alert('Email test đã được gửi thành công!');
		testStatus.classList.remove('show');
	}, 2000);
}

// Configure Payment Gateway
function configPayment(gateway) {
	document.getElementById('modalOverlay').classList.add('show');
	document.getElementById('paymentConfigModal').classList.add('show');
	
	// Update modal content based on gateway
	const modalTitle = document.getElementById('paymentModalTitle');
	const paymentLogoImg = document.getElementById('paymentLogoImg');
	const paymentLogoIcon = document.getElementById('paymentLogoIcon');
	const gatewayName = document.getElementById('gatewayName');
	const paymentLogoBox = document.getElementById('paymentLogoBox');
	
	const gateways = {
		vnpay: {
			name: 'VNPay',
			logo: 'https://cdn.brandfetch.io/idV02t6WJs/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
			color: '#ffffffff',
			isImage: true
		},
		momo: {
			name: 'MoMo',
			logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png',
			color: '#d82d8b',
			isImage: true
		},
		zalopay: {
			name: 'ZaloPay',
			logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png',
			color: '#ffffffff',
			isImage: true
		},
		bank: {
			name: 'Bank Transfer',
			logo: 'https://cdn.haitrieu.com/wp-content/uploads/2023/06/Logo-Cong-Ty-Cp-Chung-Khoan-MB-V.png',
			color: '#ffffffff',
			isImage: true
		}
	};
	
	const config = gateways[gateway];
	modalTitle.innerHTML = `Cấu hình ${config.name}`;
	gatewayName.textContent = config.name;
	
	// Set background color
	paymentLogoBox.style.background = `linear-gradient(135deg, ${config.color}, ${adjustColor(config.color, -20)})`;
	
	// Display logo or icon
	if (config.isImage && config.logo) {
		paymentLogoImg.src = config.logo;
		paymentLogoImg.style.display = 'block';
		paymentLogoIcon.style.display = 'none';
	} else {
		paymentLogoIcon.textContent = config.icon;
		paymentLogoIcon.style.display = 'block';
		paymentLogoImg.style.display = 'none';
	}
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
	const hex = color.replace('#', '');
	const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
	const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
	const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
	return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// Save Payment Config
function savePaymentConfig() {
	alert('✅ Đã lưu cấu hình cổng thanh toán!');
	closeModal();
}

// Toggle Payment Status
function togglePaymentStatus() {
	const toggle = document.getElementById('paymentToggle');
	toggle.classList.toggle('active');
}

// Test Payment Gateway
function testPaymentGateway() {
	const testStatus = document.getElementById('paymentTestStatus');
	testStatus.classList.add('show');
	
	setTimeout(() => {
		alert('✅ Kết nối cổng thanh toán thành công!');
		testStatus.classList.remove('show');
	}, 2000);
}

// Copy to Clipboard
function copyToClipboard(elementId) {
	const element = document.getElementById(elementId);
	element.select();
	document.execCommand('copy');
	alert('✅ Đã copy vào clipboard!');
}

// Backup Database
function backupDatabase() {
	document.getElementById('modalOverlay').classList.add('show');
	document.getElementById('backupModal').classList.add('show');
}

// Start Backup Process
function startBackup() {
	const backupName = document.getElementById('backupName').value || 'backup_' + new Date().toISOString().split('T')[0];
	const includeUploads = document.getElementById('includeUploads').checked;
	
	alert(`Đang backup database...\n\nTên: ${backupName}\nBao gồm uploads: ${includeUploads ? 'Có' : 'Không'}\n\n✅ Backup sẽ hoàn thành trong vài phút!`);
	closeModal();
}

// View Backups
function viewBackups() {
	document.getElementById('modalOverlay').classList.add('show');
	document.getElementById('viewBackupsModal').classList.add('show');
}

// Download Backup
function downloadBackup(filename) {
	alert(`⬇Đang tải xuống: ${filename}`);
}

// Restore Backup
function restoreBackup(filename) {
	if (confirm(`CẢNH BÁO!\n\nBạn có chắc muốn khôi phục backup "${filename}"?\n\nDữ liệu hiện tại sẽ bị ghi đè. Hành động này không thể hoàn tác!`)) {
		alert(`Đang khôi phục backup "${filename}"...\n\n Khôi phục sẽ hoàn thành trong vài phút!`);
		closeModal();
	}
}

// Delete Backup
function deleteBackup(filename) {
	if (confirm(`Bạn có chắc muốn xóa backup "${filename}"?`)) {
		alert(`Đã xóa backup: ${filename}`);
	}
}

// Test API
function testAPI(service) {
	alert(`Đang test ${service} API...\n\n API hoạt động bình thường!\n\nResponse time: 125ms\nStatus: 200 OK`);
}

// View API Logs
function viewAPILogs(service) {
	alert(`Logs của ${service} API\n\nHiển thị 50 logs gần nhất...`);
}

// Refresh System Logs
function refreshLogs() {
	const logsDiv = document.getElementById('systemLogs');
	const newLog = `<p>[${new Date().toISOString().replace('T', ' ').substring(0, 19)}] INFO: Logs refreshed</p>`;
	logsDiv.innerHTML += newLog;
	logsDiv.scrollTop = logsDiv.scrollHeight;
}

// Auto refresh logs every 5 seconds
setInterval(() => {
	const logs = [
		'INFO: User logged in successfully',
		'INFO: New booking created',
		'INFO: Payment processed',
		'WARNING: High CPU usage: 78%',
		'INFO: Email notification sent',
		'INFO: Cache updated',
		'INFO: API request completed'
	];
	const randomLog = logs[Math.floor(Math.random() * logs.length)];
	const logsDiv = document.getElementById('systemLogs');
	if (logsDiv) {
		const newLog = `<p>[${new Date().toISOString().replace('T', ' ').substring(0, 19)}] ${randomLog}</p>`;
		logsDiv.innerHTML += newLog;
		logsDiv.scrollTop = logsDiv.scrollHeight;
		
		// Keep only last 100 logs
		const logs = logsDiv.querySelectorAll('p');
		if (logs.length > 100) {
			logs[0].remove();
		}
	}
}, 5000);

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