// Dữ liệu khách sạn
const hotelsData = {
    1: {
        name: "Grand Luxury Hotel & Spa",
        rating: 4.8,
        reviews: 1234,
        location: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
        description: "Grand Luxury Hotel & Spa là khách sạn 5 sao cao cấp tọa lạc tại trung tâm thành phố. Với thiết kế hiện đại sang trọng, chúng tôi mang đến trải nghiệm nghỉ dưỡng đẳng cấp thế giới. Tất cả các phòng đều có view thành phố tuyệt đẹp, nội thất cao cấp và đầy đủ tiện nghi hiện đại. Đội ngũ nhân viên chuyên nghiệp luôn sẵn sàng phục vụ 24/7 để đảm bảo kỳ nghỉ của bạn trọn vẹn nhất.",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400",
            "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400"
        ],
        amenities: [
            { icon: "wifi", title: "WiFi Miễn Phí", desc: "Tốc độ cao, ổn định" },
            { icon: "swimming-pool", title: "Bể Bơi Vô Cực", desc: "Tầng thượng, view đẹp" },
            { icon: "spa", title: "Spa & Massage", desc: "Dịch vụ cao cấp" },
            { icon: "dumbbell", title: "Phòng Gym", desc: "Trang thiết bị hiện đại" },
            { icon: "utensils", title: "3 Nhà Hàng", desc: "Ẩm thực đa quốc gia" },
            { icon: "car", title: "Đưa Đón Sân Bay", desc: "Miễn phí 24/7" },
            { icon: "parking", title: "Bãi Đỗ Xe", desc: "Rộng rãi, an toàn" },
            { icon: "cocktail", title: "Rooftop Bar", desc: "View thành phố tuyệt đẹp" }
        ],
        rooms: [
            {
                type: "Deluxe",
                name: "Phòng Deluxe - King Bed",
                price: 2500000,
                size: "35m²",
                capacity: "2 người",
                view: "View thành phố",
                features: ["King Bed", "Smart TV 55\"", "Mini Bar", "Bồn tắm"],
                image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300"
            },
            {
                type: "Suite",
                name: "Suite Room - Executive",
                price: 4500000,
                size: "55m²",
                capacity: "3 người",
                view: "View biển",
                features: ["King + Sofa Bed", "Phòng khách", "Wine Cabinet", "Jacuzzi"],
                image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300"
            },
            {
                type: "Presidential",
                name: "Presidential Suite",
                price: 12000000,
                size: "120m²",
                capacity: "6 người",
                view: "Penthouse",
                features: ["VIP", "3 Phòng ngủ", "Bếp riêng", "Bể bơi riêng"],
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300"
            }
        ],
        reviews: [
            {
                name: "Nguyễn Văn An",
                avatar: "NVA",
                date: "3 ngày trước",
                rating: 5,
                text: "Khách sạn tuyệt vời! Phòng rộng rãi, sạch sẽ, view đẹp. Nhân viên rất thân thiện và chuyên nghiệp. Bể bơi trên tầng thượng có view thành phố cực đẹp. Sẽ quay lại lần sau!"
            },
            {
                name: "Phạm Thị Lan",
                avatar: "PTL",
                date: "1 tuần trước",
                rating: 5,
                text: "Vị trí trung tâm thuận tiện đi lại. Bữa sáng buffet đa dạng và ngon. Đặc biệt ấn tượng với dịch vụ spa, rất thư giãn. Highly recommended!"
            }
        ]
    },
    2: {
        name: "Paradise Beach Resort",
        rating: 4.6,
        reviews: 892,
        location: "456 Đường Võ Văn Kiệt, Quận 7, TP. Hồ Chí Minh",
        description: "Paradise Beach Resort là khu nghỉ dưỡng 4 sao cao cấp với view sông Sài Gòn tuyệt đẹp. Không gian yên tĩnh, thư giãn lý tưởng cho gia đình và cặp đôi. Bể bơi vô cực trên tầng thượng, phòng tập gym hiện đại đầy đủ trang thiết bị. Đội ngũ nhân viên nhiệt tình, chu đáo luôn sẵn sàng phục vụ mọi nhu cầu của quý khách.",
        images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400",
            "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400"
        ],
        amenities: [
            { icon: "wifi", title: "WiFi Miễn Phí", desc: "Tốc độ cao toàn bộ khu vực" },
            { icon: "swimming-pool", title: "Bể Bơi Vô Cực", desc: "View sông tuyệt đẹp" },
            { icon: "dumbbell", title: "Phòng Gym", desc: "Trang thiết bị cao cấp" },
            { icon: "car", title: "Đưa Đón Sân Bay", desc: "Dịch vụ miễn phí" },
            { icon: "utensils", title: "Nhà Hàng", desc: "Hải sản tươi sống" },
            { icon: "bicycle", title: "Cho Thuê Xe Đạp", desc: "Khám phá xung quanh" },
            { icon: "water", title: "Thể Thao Nước", desc: "Kayak, Stand-up Paddle" },
            { icon: "baby", title: "Kids Club", desc: "Khu vui chơi trẻ em" }
        ],
        rooms: [
            {
                type: "Deluxe",
                name: "Deluxe River View",
                price: 1800000,
                size: "32m²",
                capacity: "2 người",
                view: "View sông",
                features: ["Queen Bed", "Smart TV 50\"", "Ban công riêng", "Minibar"],
                image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300"
            },
            {
                type: "Suite",
                name: "Family Suite",
                price: 3200000,
                size: "65m²",
                capacity: "4 người",
                view: "View sông và thành phố",
                features: ["2 Phòng ngủ", "Phòng khách", "Bếp nhỏ", "2 Ban công"],
                image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300"
            },
            {
                type: "Villa",
                name: "Private Pool Villa",
                price: 8500000,
                size: "150m²",
                capacity: "6 người",
                view: "Biệt thự riêng",
                features: ["3 Phòng ngủ", "Bể bơi riêng", "Bếp đầy đủ", "Sân vườn"],
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300"
            }
        ],
        reviews: [
            {
                name: "Trần Minh Tuấn",
                avatar: "TMT",
                date: "5 ngày trước",
                rating: 5,
                text: "Resort tuyệt vời cho kỳ nghỉ gia đình! Bể bơi rộng, view sông đẹp. Con nhỏ rất thích Kids Club. Nhân viên nhiệt tình, chu đáo. Sẽ quay lại!"
            },
            {
                name: "Lê Thị Hương",
                avatar: "LTH",
                date: "2 tuần trước",
                rating: 4,
                text: "Vị trí hơi xa trung tâm nhưng rất yên tĩnh. Phòng sạch sẽ, rộng rãi. Bữa sáng ngon. Dịch vụ đưa đón sân bay rất tiện lợi."
            }
        ]
    },
    3: {
        name: "Urban Boutique Hotel",
        rating: 4.7,
        reviews: 678,
        location: "789 Đường Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh",
        description: "Urban Boutique Hotel là khách sạn boutique phong cách hiện đại, độc đáo ngay trung tâm thành phố. Thiết kế nghệ thuật độc đáo kết hợp với dịch vụ chuyên nghiệp. Vị trí thuận tiện gần các trung tâm mua sắm, nhà hàng và địa điểm du lịch. Không gian ấm cúng, sang trọng phù hợp cho khách du lịch và công tác.",
        images: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
            "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400"
        ],
        amenities: [
            { icon: "wifi", title: "WiFi Tốc Độ Cao", desc: "Fiber Optic 500Mbps" },
            { icon: "coffee", title: "Café 24/7", desc: "Cà phê & đồ ăn nhẹ" },
            { icon: "concierge-bell", title: "Dịch Vụ VIP", desc: "Butler riêng" },
            { icon: "parking", title: "Bãi Đỗ Xe", desc: "Miễn phí cho khách" },
            { icon: "desktop", title: "Co-working Space", desc: "Không gian làm việc" },
            { icon: "cocktail", title: "Sky Bar", desc: "Tầng 15, view 360°" },
            { icon: "concierge-bell", title: "Concierge 24/7", desc: "Hỗ trợ mọi lúc" },
            { icon: "taxi", title: "Dịch Vụ Xe", desc: "Thuê xe, đưa đón" }
        ],
        rooms: [
            {
                type: "Standard",
                name: "Urban Standard",
                price: 1500000,
                size: "28m²",
                capacity: "2 người",
                view: "View thành phố",
                features: ["Queen Bed", "Smart TV 43\"", "Desk", "Coffee Maker"],
                image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300"
            },
            {
                type: "Deluxe",
                name: "Urban Deluxe",
                price: 2200000,
                size: "35m²",
                capacity: "2 người",
                view: "View thành phố cao",
                features: ["King Bed", "Smart TV 55\"", "Sofa", "Bathtub"],
                image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300"
            },
            {
                type: "Suite",
                name: "Urban Suite",
                price: 4000000,
                size: "60m²",
                capacity: "3 người",
                view: "Corner view panoramic",
                features: ["Phòng ngủ riêng", "Phòng khách", "Bar mini", "Jacuzzi"],
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300"
            }
        ],
        reviews: [
            {
                name: "Hoàng Đức Anh",
                avatar: "HDA",
                date: "4 ngày trước",
                rating: 5,
                text: "Khách sạn boutique rất đẹp! Thiết kế hiện đại, độc đáo. Vị trí trung tâm thuận tiện đi lại. Sky Bar trên tầng thượng view tuyệt vời. Perfect!"
            },
            {
                name: "Võ Thị Mai",
                avatar: "VTM",
                date: "1 tuần trước",
                rating: 5,
                text: "Đi công tác chọn khách sạn này rất hài lòng. Co-working space tiện lợi, WiFi nhanh. Nhân viên chuyên nghiệp. Highly recommend cho business travelers!"
            }
        ]
    }
};

// Lấy hotel ID từ URL
function getHotelIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '1'; // Default là hotel 1
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// Render thông tin khách sạn
function renderHotelDetails() {
    const hotelId = getHotelIdFromURL();
    const hotel = hotelsData[hotelId];

    if (!hotel) {
        document.querySelector('.container').innerHTML = '<h1>Không tìm thấy khách sạn!</h1>';
        return;
    }

    // Update page title
    document.title = `${hotel.name} - やばい`;

    // Update hotel name
    document.querySelector('.hotel-title').textContent = hotel.name;

    // Update rating
    const ratingContainer = document.querySelector('.hotel-meta .rating');
    ratingContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.className = i < Math.floor(hotel.rating) ? 'fas fa-star' : 'far fa-star';
        ratingContainer.appendChild(star);
    }
    ratingContainer.innerHTML += `
        <span style="color: #333; margin-left: 0.5rem; font-weight: 600;">${hotel.rating}</span>
        <span style="color: #666;">(${hotel.reviews} đánh giá)</span>
    `;

    // Update location
    document.querySelector('.location').innerHTML = `
        <i class="fas fa-map-marker-alt"></i>
        ${hotel.location}
    `;

    // Update description
    document.querySelector('.section p').textContent = hotel.description;

    // Update gallery
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    hotel.images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = hotel.name;
        if (index === hotel.images.length - 1) {
            const div = document.createElement('div');
            div.className = 'view-all-photos';
            div.appendChild(imgElement);
            gallery.appendChild(div);
        } else {
            gallery.appendChild(imgElement);
        }
    });

    // Update amenities
    const featuresGrid = document.querySelector('.features-grid');
    featuresGrid.innerHTML = '';
    hotel.amenities.forEach(amenity => {
        featuresGrid.innerHTML += `
            <div class="feature-item">
                <div class="feature-icon">
                    <i class="fas fa-${amenity.icon}"></i>
                </div>
                <div class="feature-text">
                    <h4>${amenity.title}</h4>
                    <p>${amenity.desc}</p>
                </div>
            </div>
        `;
    });

    // Update rooms
    const roomsSection = document.querySelector('.section:has(.room-card)');
    const roomCardsHTML = hotel.rooms.map(room => `
        <div class="room-card">
            <img src="${room.image}" alt="${room.name}" class="room-image">
            <div class="room-info">
                <h4>${room.name}</h4>
                <p style="color: #666; margin-bottom: 0.5rem;">${room.size} • ${room.capacity} • ${room.view}</p>
                <div class="room-features">
                    ${room.features.map(feature => `
                        <span class="room-feature-tag"><i class="fas fa-check"></i> ${feature}</span>
                    `).join('')}
                </div>
            </div>
            <div class="room-price-section">
                <div class="room-price">${formatPrice(room.price)}</div>
                <div class="room-price-unit">/ đêm</div>
                <button class="book-room-btn" onclick="selectRoom('${room.type}', ${room.price})">
                    <i class="fas fa-check-circle"></i> Chọn Phòng
                </button>
            </div>
        </div>
    `).join('');

    // Find the rooms section and update only room cards
    const roomsSectionTitle = Array.from(document.querySelectorAll('.section-title')).find(
        el => el.textContent.includes('Loại Phòng')
    );
    if (roomsSectionTitle) {
        const roomsContainer = roomsSectionTitle.parentElement;
        // Keep the title, replace everything else
        roomsContainer.innerHTML = roomsSectionTitle.outerHTML + roomCardsHTML;
    }

    // Update reviews
    const reviewsSection = document.querySelector('.section:last-child');
    const reviewsHTML = hotel.reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.avatar}</div>
                    <div>
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
                </div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');

    const reviewsSectionTitle = Array.from(document.querySelectorAll('.section-title')).find(
        el => el.textContent.includes('Đánh Giá')
    );
    if (reviewsSectionTitle) {
        const reviewsContainer = reviewsSectionTitle.parentElement;
        reviewsContainer.innerHTML = reviewsSectionTitle.outerHTML + reviewsHTML;
    }

    // Update room type selector with current hotel's rooms
    const roomTypeSelect = document.getElementById('roomType');
    roomTypeSelect.innerHTML = hotel.rooms.map((room, index) => `
        <option value="${room.price}" ${index === 0 ? 'selected' : ''}>
            ${room.name} - ${formatPrice(room.price)}
        </option>
    `).join('');

    // Update initial price
    updatePrice();
}

// Select room function
let selectedRoomType = 'Deluxe';
let selectedRoomPrice = 2500000;

function selectRoom(roomType, price) {
    selectedRoomType = roomType;
    selectedRoomPrice = price;
    
    document.getElementById('selectedPrice').textContent = formatPrice(price);
    document.getElementById('roomType').value = price;
    
    updatePrice();
    
    // Scroll to booking form
    document.querySelector('.booking-card').scrollIntoView({ behavior: 'smooth' });
}

// Update price calculation
function updatePrice() {
    const checkin = new Date(document.getElementById('checkin').value);
    const checkout = new Date(document.getElementById('checkout').value);
    const roomPrice = parseInt(document.getElementById('roomType').value);
    
    let nights = 1;
    if (checkin && checkout && checkout > checkin) {
        nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    }
    
    const roomTotal = roomPrice * nights;
    const serviceFee = roomTotal * 0.05;
    const tax = (roomTotal + serviceFee) * 0.1;
    const total = roomTotal + serviceFee + tax;
    
    document.getElementById('nights').textContent = nights;
    document.getElementById('roomTotal').textContent = formatPrice(roomTotal);
    document.getElementById('serviceFee').textContent = formatPrice(serviceFee);
    document.getElementById('tax').textContent = formatPrice(tax);
    document.getElementById('totalPrice').textContent = formatPrice(total);
    document.getElementById('selectedPrice').textContent = formatPrice(roomPrice);
}

// Proceed to payment
function proceedToPayment(event) {
    event.preventDefault();
    
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('roomType').value;
    
    if (!checkin || !checkout) {
        alert('Vui lòng chọn ngày nhận phòng và trả phòng!');
        return;
    }
    
    const hotelId = getHotelIdFromURL();
    const hotel = hotelsData[hotelId];
    
    // Store booking info
    const bookingInfo = {
        hotelId: hotelId,
        hotelName: hotel.name,
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        roomPrice: roomType,
        totalPrice: document.getElementById('totalPrice').textContent
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingInfo));
    
    // Redirect to payment or booking confirmation
    window.location.href = "../payment.html";
}

// Set minimum date for check-in (today)
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput) checkinInput.min = today;
    if (checkoutInput) checkoutInput.min = today;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    renderHotelDetails();
    setMinDates();
    
    // Add event listeners
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const roomTypeSelect = document.getElementById('roomType');
    
    if (checkinInput) {
        checkinInput.addEventListener('change', function() {
            if (checkoutInput) {
                checkoutInput.min = this.value;
            }
            updatePrice();
        });
    }
    
    if (checkoutInput) {
        checkoutInput.addEventListener('change', updatePrice);
    }
    
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', updatePrice);
    }
});