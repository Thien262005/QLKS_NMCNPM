const chatMessages = document.getElementById('chatMessages');
chatMessages.scrollTop = chatMessages.scrollHeight;

// Gửi tin nhắn
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text !== "") {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const newMessageHTML = `
            <div class="message sent">
                <div class="msg-bubble">
                    ${text}
                    <span class="msg-timestamp">${time}</span>
                </div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', newMessageHTML);
        input.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            receiveMockReply();
        }, 2000);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function receiveMockReply() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyHTML = `
        <div class="message received">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" class="msg-avatar">
            <div class="msg-bubble">
                Cảm ơn khách sạn đã hỗ trợ ạ!
                <span class="msg-timestamp">${time}</span>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', replyHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chọn user 
function selectUser(userId) {
    document.querySelectorAll('.user-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
    
    const userName = event.currentTarget.querySelector('h4').innerText;
    const userAvatar = event.currentTarget.querySelector('img') ? event.currentTarget.querySelector('img').src : '';
    
    document.getElementById('currentName').innerText = userName;
    if(userAvatar) document.getElementById('currentAvatar').src = userAvatar;
}
