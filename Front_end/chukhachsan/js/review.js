function replyReview(btn) {
  const card = btn.closest(".review-card");
  const actionsDiv = card.querySelector(".action-btns");

  // Kiểm tra xem đã có form reply chưa
  if (card.querySelector(".reply-form")) {
    return;
  }

  // Tạo form reply
  const replyForm = document.createElement("div");
  replyForm.className = "review-response";
  replyForm.style.marginTop = "1rem";
  replyForm.innerHTML = `
        <div class="review-response-header">
          <i class="fas fa-reply"></i> Trả lời đánh giá
        </div>
        <textarea class="reply-form" style="width: 100%; padding: 0.8rem; border: 2px solid #e1e5e9; border-radius: 12px; min-height: 100px; font-family: 'Poppins', sans-serif; margin-top: 0.5rem" placeholder="Nhập phản hồi của bạn..."></textarea>
        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem">
          <button class="btn btn-sm" style="background: #4caf50; color: white" onclick="submitReply(this)">
            <i class="fas fa-check"></i> Gửi
          </button>
          <button class="btn btn-sm" style="background: #f44336; color: white" onclick="cancelReply(this)">
            <i class="fas fa-times"></i> Hủy
          </button>
        </div>
      `;

  actionsDiv.parentNode.insertBefore(replyForm, actionsDiv);
}

function submitReply(btn) {
  const form = btn.closest(".review-response");
  const textarea = form.querySelector("textarea");
  const replyText = textarea.value.trim();

  if (!replyText) {
    alert("Vui lòng nhập nội dung phản hồi!");
    return;
  }

  // Thay thế form bằng phản hồi đã gửi
  form.innerHTML = `
        <div class="review-response-header">
          <i class="fas fa-reply"></i> Phản hồi từ LuxStay
        </div>
        <p class="review-response-text">${replyText}</p>
        <div style="margin-top: 0.5rem">
          <button class="btn btn-sm" style="background: #ff9800; color: white" onclick="editReply(this)">
            <i class="fas fa-edit"></i> Sửa
          </button>
        </div>
      `;

  alert("Đã gửi phản hồi thành công!");
}

function cancelReply(btn) {
  const form = btn.closest(".review-response");
  form.remove();
}

function editReply(btn) {
  const responseDiv = btn.closest(".review-response");
  const currentText = responseDiv.querySelector(
    ".review-response-text"
  ).textContent;

  // Thay thế phản hồi bằng form chỉnh sửa
  responseDiv.innerHTML = `
        <div class="review-response-header">
          <i class="fas fa-edit"></i> Chỉnh sửa phản hồi
        </div>
        <textarea class="reply-form" style="width: 100%; padding: 0.8rem; border: 2px solid #e1e5e9; border-radius: 12px; min-height: 100px; font-family: 'Poppins', sans-serif; margin-top: 0.5rem">${currentText}</textarea>
        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem">
          <button class="btn btn-sm" style="background: #4caf50; color: white" onclick="saveEditReply(this, '${currentText.replace(
            /'/g,
            "\\'"
          )}')">
            <i class="fas fa-check"></i> Lưu
          </button>
          <button class="btn btn-sm" style="background: #f44336; color: white" onclick="cancelEditReply(this, '${currentText.replace(
            /'/g,
            "\\'"
          )}')">
            <i class="fas fa-times"></i> Hủy
          </button>
        </div>
      `;
}

function saveEditReply(btn, oldText) {
  const responseDiv = btn.closest(".review-response");
  const textarea = responseDiv.querySelector("textarea");
  const newText = textarea.value.trim();

  if (!newText) {
    alert("Vui lòng nhập nội dung phản hồi!");
    return;
  }

  // Cập nhật phản hồi
  responseDiv.innerHTML = `
        <div class="review-response-header">
          <i class="fas fa-reply"></i> Phản hồi từ LuxStay
        </div>
        <p class="review-response-text">${newText}</p>
        <div style="margin-top: 0.5rem">
          <button class="btn btn-sm" style="background: #ff9800; color: white" onclick="editReply(this)">
            <i class="fas fa-edit"></i> Sửa
          </button>
        </div>
      `;

  alert("Đã cập nhật phản hồi thành công!");
}

function cancelEditReply(btn, oldText) {
  const responseDiv = btn.closest(".review-response");

  // Khôi phục phản hồi cũ
  responseDiv.innerHTML = `
        <div class="review-response-header">
          <i class="fas fa-reply"></i> Phản hồi từ LuxStay
        </div>
        <p class="review-response-text">${oldText}</p>
        <div style="margin-top: 0.5rem">
          <button class="btn btn-sm" style="background: #ff9800; color: white" onclick="editReply(this)">
            <i class="fas fa-edit"></i> Sửa
          </button>
        </div>
      `;
}
