let currentPromoId = null;
let isEditMode = false;

// Open Update Price Modal
function openUpdatePriceModal(roomType = null) {
    if (roomType) {
        document.getElementById('priceRoomType').value = roomType;
        // Load existing prices for this room type
        loadRoomPrices(roomType);
    }
    document.getElementById('pricingModalOverlay').classList.add('show');
    document.getElementById('updatePriceModal').classList.add('show');
}

// Load existing prices for room type
function loadRoomPrices(roomType) {
    // Giả lập dữ liệu - thay thế bằng API call thực tế
    const prices = {
        'deluxe-king': { weekday: 2500000, weekend: 3000000, holiday: 3500000 },
        'deluxe-twin': { weekday: 2500000, weekend: 3000000, holiday: 3500000 },
        'suite-executive': { weekday: 4500000, weekend: 5000000, holiday: 6000000 },
        'suite-family': { weekday: 5500000, weekend: 6000000, holiday: 7000000 },
        'presidential': { weekday: 12000000, weekend: 15000000, holiday: 18000000 }
    };

    const roomPrices = prices[roomType];
    if (roomPrices) {
        document.getElementById('weekdayPrice').value = roomPrices.weekday;
        document.getElementById('weekendPrice').value = roomPrices.weekend;
        document.getElementById('holidayPrice').value = roomPrices.holiday;
        updatePriceDisplay();
    }
}

// Update price display in real-time
function updatePriceDisplay() {
    const weekday = document.getElementById('weekdayPrice').value;
    const weekend = document.getElementById('weekendPrice').value;
    const holiday = document.getElementById('holidayPrice').value;

    if (weekday) {
        document.getElementById('weekdayPriceDisplay').textContent = formatPrice(weekday);
    }
    if (weekend) {
        document.getElementById('weekendPriceDisplay').textContent = formatPrice(weekend);
    }
    if (holiday) {
        document.getElementById('holidayPriceDisplay').textContent = formatPrice(holiday);
    }
}

// Format price to display
function formatPrice(price) {
    const million = Math.floor(price / 1000000);
    const thousand = Math.floor((price % 1000000) / 100000);
    if (thousand > 0) {
        return `${million}.${thousand}tr`;
    }
    return `${million}tr`;
}

// Save price
function savePrice() {
    const roomType = document.getElementById('priceRoomType').value;
    const weekday = document.getElementById('weekdayPrice').value;
    const weekend = document.getElementById('weekendPrice').value;
    const holiday = document.getElementById('holidayPrice').value;

    if (!roomType || !weekday || !weekend || !holiday) {
        alert('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    // Giả lập lưu dữ liệu
    alert(`✅ Đã cập nhật giá cho ${getRoomTypeName(roomType)} thành công!\n\nThường ngày: ${formatCurrency(weekday)}\nCuối tuần: ${formatCurrency(weekend)}\nLễ/Tết: ${formatCurrency(holiday)}`);
    
    closePricingModal();
    // Reload table or update UI here
}

// Get room type name
function getRoomTypeName(roomType) {
    const names = {
        'deluxe-king': 'Deluxe King',
        'deluxe-twin': 'Deluxe Twin',
        'suite-executive': 'Suite Executive',
        'suite-family': 'Suite Family',
        'presidential': 'Presidential Suite'
    };
    return names[roomType] || roomType;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// ==================== PROMOTION MANAGEMENT ====================

// Open Create Promotion Modal
function openCreatePromoModal() {
    isEditMode = false;
    currentPromoId = null;
    document.getElementById('promoModalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Tạo Khuyến Mãi Mới';
    document.getElementById('promoForm').reset();
    
    // Reset discount type
    document.querySelector('input[name="discountType"][value="percentage"]').checked = true;
    toggleDiscountType();
    
    // Set default dates
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    document.getElementById('promoStartDate').value = today.toISOString().split('T')[0];
    document.getElementById('promoEndDate').value = nextMonth.toISOString().split('T')[0];
    
    document.getElementById('pricingModalOverlay').classList.add('show');
    document.getElementById('promoModal').classList.add('show');
}

// Open Edit Promotion Modal
function openEditPromoModal(promoData) {
    isEditMode = true;
    currentPromoId = promoData.id;
    document.getElementById('promoModalTitle').innerHTML = '<i class="fas fa-edit"></i> Chỉnh Sửa Khuyến Mãi';
    
    // Fill form with promo data
    document.getElementById('promoName').value = promoData.name;
    document.getElementById('promoDescription').value = promoData.description || '';
    document.getElementById('discountValue').value = promoData.discount;
    document.getElementById('promoStartDate').value = promoData.startDate;
    document.getElementById('promoEndDate').value = promoData.endDate;
    
    document.getElementById('pricingModalOverlay').classList.add('show');
    document.getElementById('promoModal').classList.add('show');
}

// Toggle discount type
function toggleDiscountType() {
    const discountType = document.querySelector('input[name="discountType"]:checked').value;
    const discountLabel = document.getElementById('discountLabel');
    const discountIcon = document.getElementById('discountIcon');
    const discountInput = document.getElementById('discountValue');
    
    // Update active state
    document.querySelectorAll('.discount-type-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`input[name="discountType"][value="${discountType}"]`).closest('.discount-type-option').classList.add('active');
    
    if (discountType === 'percentage') {
        discountLabel.innerHTML = 'Giảm Giá (%) <span class="required">*</span>';
        discountIcon.className = 'fas fa-percent';
        discountInput.placeholder = '20';
        discountInput.max = '100';
    } else {
        discountLabel.innerHTML = 'Giảm Giá (VNĐ) <span class="required">*</span>';
        discountIcon.className = 'fas fa-money-bill-wave';
        discountInput.placeholder = '500000';
        discountInput.removeAttribute('max');
    }
}

// Toggle condition input
function toggleCondition(conditionId) {
    const checkbox = document.getElementById(conditionId);
    const input = document.getElementById(conditionId + 'Input');
    
    if (checkbox.checked) {
        input.style.display = 'flex';
    } else {
        input.style.display = 'none';
    }
}

// Save promotion
function savePromotion() {
    const promoName = document.getElementById('promoName').value;
    const discountValue = document.getElementById('discountValue').value;
    const startDate = document.getElementById('promoStartDate').value;
    const endDate = document.getElementById('promoEndDate').value;

    if (!promoName || !discountValue || !startDate || !endDate) {
        alert('⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }

    // Check if end date is after start date
    if (new Date(endDate) <= new Date(startDate)) {
        alert('⚠️ Ngày kết thúc phải sau ngày bắt đầu!');
        return;
    }

    const discountType = document.querySelector('input[name="discountType"]:checked').value;
    const discountText = discountType === 'percentage' ? `${discountValue}%` : formatCurrency(discountValue);

    if (isEditMode) {
        alert(`✅ Đã cập nhật khuyến mãi "${promoName}" thành công!\n\nGiảm giá: ${discountText}\nThời gian: ${formatDate(startDate)} - ${formatDate(endDate)}`);
    } else {
        alert(`✅ Đã tạo khuyến mãi "${promoName}" thành công!\n\nGiảm giá: ${discountText}\nThời gian: ${formatDate(startDate)} - ${formatDate(endDate)}`);
    }
    
    closePricingModal();
    // Reload list or update UI here
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Stop promotion
function stopPromotion(promoName) {
    if (confirm(`⚠️ Bạn có chắc muốn dừng khuyến mãi "${promoName}"?`)) {
        alert(`✅ Đã dừng khuyến mãi "${promoName}"`);
        // Call API to stop promotion
    }
}

// Delete promotion
function deletePromotion(promoName) {
    if (confirm(`⚠️ Bạn có chắc muốn xóa khuyến mãi "${promoName}"?\n\nHành động này không thể hoàn tác!`)) {
        alert(`✅ Đã xóa khuyến mãi "${promoName}"`);
        // Call API to delete promotion
    }
}

// ==================== MODAL CONTROLS ====================

// Close all modals
function closePricingModal() {
    document.getElementById('pricingModalOverlay').classList.remove('show');
    document.getElementById('updatePriceModal').classList.remove('show');
    document.getElementById('promoModal').classList.remove('show');
}

// Close modal when clicking ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePricingModal();
    }
});

// ==================== PAGE INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    // Bind "Cập Nhật Giá" button
    const updatePriceBtn = document.querySelector('.section-header .btn-primary');
    if (updatePriceBtn && updatePriceBtn.textContent.includes('Cập Nhật Giá')) {
        updatePriceBtn.onclick = function() {
            openUpdatePriceModal();
        };
    }

    // Bind "Tạo Khuyến Mãi" button
    const createPromoBtn = document.querySelectorAll('.section-header .btn-primary')[1];
    if (createPromoBtn && createPromoBtn.textContent.includes('Tạo Khuyến Mãi')) {
        createPromoBtn.onclick = openCreatePromoModal;
    }

    // Bind "Chỉnh Sửa" price buttons
    const editPriceBtns = document.querySelectorAll('table .btn-edit');
    editPriceBtns.forEach((btn, index) => {
        btn.onclick = function() {
            const row = this.closest('tr');
            const roomType = row.querySelector('td:first-child strong').textContent.trim();
            const roomTypeValue = roomType.toLowerCase().replace(/ /g, '-');
            openUpdatePriceModal(roomTypeValue);
        };
    });

    // Bind "Sửa" promo buttons
    const editPromoBtns = document.querySelectorAll('.promo-card .btn-edit');
    editPromoBtns.forEach((btn, index) => {
        btn.onclick = function() {
            const promoCard = this.closest('.promo-card');
            const promoName = promoCard.querySelector('h4').textContent;
            const promoDescription = promoCard.querySelector('p').textContent;
            
            // Parse dates from text
            const dateText = promoCard.querySelector('div:nth-child(2) div:first-child').textContent;
            const dates = dateText.match(/\d{2}\/\d{2}/g);
            
            const promoData = {
                id: index + 1,
                name: promoName,
                description: promoDescription,
                discount: 20, // Parse from actual data
                startDate: dates ? convertToDateFormat(dates[0]) : '',
                endDate: dates ? convertToDateFormat(dates[1]) : ''
            };
            
            openEditPromoModal(promoData);
        };
    });

    // Bind "Dừng" promo buttons
    const stopPromoBtns = document.querySelectorAll('.promo-card .btn-delete');
    stopPromoBtns.forEach(btn => {
        btn.onclick = function() {
            const promoName = this.closest('.promo-card').querySelector('h4').textContent;
            stopPromotion(promoName);
        };
    });
});

// Helper function to convert DD/MM to YYYY-MM-DD
function convertToDateFormat(dateStr) {
    const [day, month] = dateStr.split('/');
    const year = new Date().getFullYear();
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}