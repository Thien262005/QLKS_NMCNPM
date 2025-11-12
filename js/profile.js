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
        // Show success message
        showNotification('Mật khẩu đã được thay đổi thành công!', 'success');
        
        // Reset form
        document.getElementById('passwordForm').reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Handle Avatar Upload
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showNotification('Vui lòng chọn file hình ảnh!', 'error');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Kích thước file không được vượt quá 5MB!', 'error');
            return;
        }

        // Read and display image
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
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

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

// Add to saveProfile function
// clearDraft(); // Uncomment this in the saveProfile function after successful save