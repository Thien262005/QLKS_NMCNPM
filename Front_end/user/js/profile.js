// Show/Hide Sections
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionName + 'Section');
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to clicked menu item
    event.target.closest('a').classList.add('active');

    // Scroll to top of content
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Save Profile
function saveProfile(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thông tin cá nhân đã được cập nhật thành công!', 'success');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Update profile name in header if changed
        const nameInput = event.target.querySelector('input[type="text"]');
        if (nameInput) {
            document.querySelector('.profile-name').textContent = nameInput.value;
        }
    }, 1500);
}

// Change Password
function changePassword(event) {
    event.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate passwords match
    if (newPassword !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }

    // Validate password strength
    if (newPassword.length < 8) {
        showNotification('Mật khẩu phải có ít nhất 8 ký tự!', 'error');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showNotification('Mật khẩu đã được thay đổi thành công!', 'success');
        document.getElementById('passwordForm').reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle Avatar Upload
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    
    if (file) {
        if (!file.type.startsWith('image/')) {
            showNotification('Vui lòng chọn file hình ảnh!', 'error');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Kích thước file không được vượt quá 5MB!', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarElement = document.querySelector('.profile-avatar-large');
            avatarElement.style.backgroundImage = `url(${e.target.result})`;
            avatarElement.style.backgroundSize = 'cover';
            avatarElement.style.backgroundPosition = 'center';
            avatarElement.textContent = '';
            
            showNotification('Ảnh đại diện đã được cập nhật!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// --- DỮ LIỆU MẪU ---
const myBookingsData = [
    {
        id: "BK2025001",
        hotelName: "Grand Luxury Hotel & Spa",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        checkIn: "25/11/2025", checkOut: "27/11/2025",
        price: "5.000.000đ",
        roomType: "Deluxe King Bed",
        status: "confirmed"
    },
    {
        id: "BK2025002",
        hotelName: "Paradise Beach Resort",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
        checkIn: "10/10/2025", checkOut: "12/10/2025",
        price: "3.600.000đ",
        roomType: "Ocean Suite",
        status: "completed"
    },
    {
        id: "BK2025003",
        hotelName: "Urban Boutique Hotel",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
        checkIn: "01/09/2025", checkOut: "02/09/2025",
        price: "1.500.000đ",
        roomType: "Standard Room",
        status: "cancelled"
    }
];

// --- HÀM CHUYỂN TAB MENU ---
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sidebar-menu a').forEach(el => el.classList.remove('active'));

    const targetSection = document.getElementById(sectionId + 'Section');
    if (targetSection) targetSection.classList.add('active');

    const activeLink = document.querySelector(`.sidebar-menu a[onclick*="'${sectionId}'"]`);
    if (activeLink) activeLink.classList.add('active');

    if (sectionId === 'bookings') renderProfileBookings('all');
}

// --- HÀM RENDER DANH SÁCH (GIAO DIỆN ĐẸP) ---
function renderProfileBookings(filter) {
    const container = document.getElementById('profileBookingsList');
    container.innerHTML = '';

    const filteredData = filter === 'all' ? myBookingsData : myBookingsData.filter(i => i.status === filter);

    if (filteredData.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:3rem; color:#888;">Không có đơn đặt phòng nào.</div>';
        return;
    }

    filteredData.forEach(booking => {
        // Xử lý trạng thái
        let statusText = "", statusClass = "", statusBg = "", statusColor = "";
        if(booking.status === 'confirmed') { statusText = "Đã xác nhận"; statusClass = "status-confirmed"; statusBg = "#e3f2fd"; statusColor = "#2196f3"; }
        else if(booking.status === 'completed') { statusText = "Hoàn thành"; statusClass = "status-completed"; statusBg = "#e8f5e9"; statusColor = "#4caf50"; }
        else { statusText = "Đã hủy"; statusClass = "status-cancelled"; statusBg = "#ffebee"; statusColor = "#f44336"; }

        // Tạo HTML thẻ (Giống hệt My Bookings)
        const html = `
            <div class="p-booking-card">
                <img src="${booking.image}" class="p-booking-img">
                
                <div class="p-booking-info">
                    <div class="p-booking-header">
                        <div>
                            <div class="p-booking-id"><i class="fas fa-hashtag"></i> ${booking.id}</div>
                            <h3 class="p-hotel-name">${booking.hotelName}</h3>
                        </div>
                        <span class="status-badge ${statusClass}" style="background:${statusBg}; color:${statusColor};">${statusText}</span>
                    </div>
                    
                    <div class="p-details-grid">
                        <div class="p-detail-item"><i class="fas fa-bed"></i> ${booking.roomType}</div>
                        <div class="p-detail-item"><i class="fas fa-calendar-check"></i> ${booking.checkIn}</div>
                        <div class="p-detail-item"><i class="fas fa-user-friends"></i> 2 người</div>
                        <div class="p-detail-item"><i class="fas fa-calendar-times"></i> ${booking.checkOut}</div>
                    </div>
                    
                    <div class="p-booking-footer">
                        <div class="p-price">${booking.price}</div>
                        
                        <button class="btn btn-primary btn-sm" onclick="viewDetailModal('${booking.id}')">
                            <i class="fas fa-eye"></i> Chi Tiết
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// MỞ POPUP CHI TIẾT 
function viewDetailModal(bookingId) {
    const booking = myBookingsData.find(b => b.id === bookingId); 
    
    if(booking) {
        document.getElementById('m-image').src = booking.image;
        document.getElementById('m-hotel').textContent = booking.hotelName;
        document.getElementById('m-id').textContent = booking.id;
        document.getElementById('m-checkin').textContent = booking.checkIn;
        document.getElementById('m-checkout').textContent = booking.checkOut;
        document.getElementById('m-room').textContent = booking.roomType;
        document.getElementById('m-total').textContent = booking.price;

        const statusEl = document.getElementById('m-status');
        let statusText = "", statusBg = "", statusColor = "";
        
        if(booking.status === 'confirmed') { 
            statusText = "Đã xác nhận"; statusBg = "#e3f2fd"; statusColor = "#2196f3"; 
        } else if(booking.status === 'completed') { 
            statusText = "Hoàn thành"; statusBg = "#e8f5e9"; statusColor = "#4caf50"; 
        } else { 
            statusText = "Đã hủy"; statusBg = "#ffebee"; statusColor = "#f44336"; 
        }
        
        statusEl.textContent = statusText;
        statusEl.style.background = statusBg;
        statusEl.style.color = statusColor;

        const btnPrint = document.getElementById('btnPrint');
        
        if (booking.status === 'confirmed') {
            btnPrint.style.display = 'flex'; 
        } else {
            btnPrint.style.display = 'none';
        }
        document.getElementById('detailModal').classList.add('active');
    }
}

// ĐÓNG POPUP ---
function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

document.getElementById('detailModal').addEventListener('click', (e) => {
    if(e.target.id === 'detailModal') closeDetailModal();
});

// LỌC TAB 
function filterProfileBookings(filter) {
    document.querySelectorAll('.profile-tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('onclick').includes(filter)) btn.classList.add('active');
    });
    renderProfileBookings(filter);
}

function handleAvatarUpload(event) { alert("Đã chọn ảnh: " + event.target.files[0].name); }
function saveProfile(event) { event.preventDefault(); alert("Đã lưu thông tin!"); }
function changePassword(event) { event.preventDefault(); alert("Đổi mật khẩu thành công!"); }

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        min-width: 300px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
    }

    .notification-success {
        border-left: 4px solid #28a745;
    }

    .notification-success i {
        color: #28a745;
        font-size: 1.5rem;
    }

    .notification-error {
        border-left: 4px solid #dc3545;
    }

    .notification-error i {
        color: #dc3545;
        font-size: 1.5rem;
    }
`;
document.head.appendChild(notificationStyles);

// Toggle switches
document.addEventListener('DOMContentLoaded', function() {
    // Handle toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.closest('.security-item, .settings-item').querySelector('h4, span');
            if (label) {
                const setting = label.textContent;
                const status = this.checked ? 'bật' : 'tắt';
                showNotification(`Đã ${status} "${setting}"`, 'success');
            }
        });
    });

    // Animate stats on page load
    animateStats();

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            showNotification(
                isActive ? 'Đã thêm vào yêu thích!' : 'Đã xóa khỏi yêu thích!',
                'success'
            );
        });
    });
});

// Animate statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString('vi-VN');
        }, 16);
    });
}

// Handle form reset
document.addEventListener('DOMContentLoaded', function() {
    const resetButtons = document.querySelectorAll('button[type="reset"]');
    resetButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(() => {
                showNotification('Đã khôi phục dữ liệu gốc', 'success');
            }, 100);
        });
    });
});

// Progress bar animation
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const targetWidth = progressFill.style.width;
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = targetWidth;
        }, 500);
    }
}

// Call when loyalty section is shown
const loyaltyLink = document.querySelector('a[onclick*="loyalty"]');
if (loyaltyLink) {
    loyaltyLink.addEventListener('click', function() {
        setTimeout(animateProgressBar, 300);
    });
}

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-save draft functionality
let autoSaveTimeout;
const formInputs = document.querySelectorAll('.form-control');

formInputs.forEach(input => {
    input.addEventListener('input', function() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            // Save to localStorage as draft
            const formData = {};
            formInputs.forEach(inp => {
                if (inp.name || inp.id) {
                    formData[inp.name || inp.id] = inp.value;
                }
            });
            localStorage.setItem('profileDraft', JSON.stringify(formData));
            console.log('Draft saved automatically');
        }, 2000);
    });
});

// Load draft on page load
window.addEventListener('load', function() {
    const draft = localStorage.getItem('profileDraft');
    if (draft) {
        try {
            const formData = JSON.parse(draft);
            formInputs.forEach(input => {
                const key = input.name || input.id;
                if (key && formData[key]) {
                    input.value = formData[key];
                }
            });
        } catch (e) {
            console.error('Error loading draft:', e);
        }
    }
});

// Clear draft after successful save
function clearDraft() {
    localStorage.removeItem('profileDraft');
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