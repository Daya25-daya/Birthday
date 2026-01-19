// Optimized Birthday Website Script
let currentPage = 0;
const pages = ['cover-page', 'wish-page', 'gallery-page', 'friendship-wall-page', 'celebration-page'];

// Efficient page transition with requestAnimationFrame
function showPage(pageId) {
    const currentPageEl = document.querySelector('.page.active');
    const nextPageEl = document.getElementById(pageId);
    
    if (currentPageEl) {
        currentPageEl.classList.remove('active');
    }
    
    requestAnimationFrame(() => {
        nextPageEl.classList.add('active');
    });
}

// Enhanced event listeners using event delegation
document.addEventListener('DOMContentLoaded', () => {
    // Cover page click handler
    const coverPage = document.getElementById('cover-page');
    coverPage.addEventListener('click', () => {
        showPage('wish-page');
        triggerPageTransitionEffect();
    });
    
    // Preload next page content for faster transitions
    const wishPage = document.getElementById('wish-page');
    wishPage.style.willChange = 'transform, opacity';
    
    // Add parallax effect on scroll (for mobile)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.cover-background');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add touch gestures for mobile
    addTouchGestures();
});

// Page transition effects
function triggerPageTransitionEffect() {
    const body = document.body;
    body.style.animation = 'pageTransition 0.5s ease-out';
    setTimeout(() => {
        body.style.animation = '';
    }, 500);
}

// Touch gesture support
function addTouchGestures() {
    let startX, startY;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Swipe left to go to next page
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next page
                goToNextPage();
            } else {
                // Swipe right - previous page
                goToPreviousPage();
            }
        }
        
        startX = null;
        startY = null;
    });
}

// Navigation functions
function goToNextPage() {
    const currentPageEl = document.querySelector('.page.active');
    const currentIndex = pages.indexOf(currentPageEl.id);
    if (currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    }
}

function goToPreviousPage() {
    const currentPageEl = document.querySelector('.page.active');
    const currentIndex = pages.indexOf(currentPageEl.id);
    if (currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    }
}

// Gallery functions with enhanced features
function showGallery() {
    showPage('gallery-page');
    animatePhotosIn();
}

function animatePhotosIn() {
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach((polaroid, index) => {
        polaroid.style.opacity = '0';
        polaroid.style.transform = 'translateY(50px) rotate(0deg)';
        
        setTimeout(() => {
            polaroid.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            polaroid.style.opacity = '1';
            polaroid.style.transform = index % 2 === 0 ? 'translateY(0) rotate(-2deg)' : 'translateY(0) rotate(2deg)';
        }, index * 200);
    });
}

function revealMessage(polaroid) {
    const message = polaroid.querySelector('.hidden-message');
    const caption = polaroid.querySelector('.photo-caption');
    
    // Add shake animation
    polaroid.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        if (message.style.display === 'block') {
            message.style.display = 'none';
            caption.style.display = 'block';
        } else {
            message.style.display = 'block';
            caption.style.display = 'none';
        }
        polaroid.style.animation = '';
    }, 250);
}

function addPhotoSlot() {
    const photoGrid = document.querySelector('.photo-grid');
    const newPolaroid = document.createElement('div');
    newPolaroid.className = 'polaroid';
    newPolaroid.onclick = () => revealMessage(newPolaroid);
    
    const colors = ['var(--coral), var(--sunset-orange)', 'var(--mint), var(--sky-blue)', 'var(--rose-gold), var(--gold)', 'var(--neon-purple), var(--neon-pink)'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const emojis = ['🎈', '🌟', '🎊', '🎁', '🌈', '🦄', '🍰', '🎵'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    newPolaroid.innerHTML = `
        <div class="photo-placeholder" style="background-image: linear-gradient(45deg, ${randomColor}); position: relative;">
            <div class="photo-overlay">${randomEmoji}</div>
            <div class="photo-frame"></div>
        </div>
        <div class="photo-caption">New Memory!</div>
        <div class="hidden-message">This space is waiting for our next adventure! ✨</div>
    `;
    
    // Add with animation
    newPolaroid.style.opacity = '0';
    newPolaroid.style.transform = 'scale(0.5) rotate(0deg)';
    photoGrid.appendChild(newPolaroid);
    
    requestAnimationFrame(() => {
        newPolaroid.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        newPolaroid.style.opacity = '1';
        newPolaroid.style.transform = 'scale(1) rotate(-2deg)';
    });
}

// Friendship wall functions
function showFriendshipWall() {
    showPage('friendship-wall-page');
}

function addCustomNote() {
    const textarea = document.getElementById('custom-note');
    const noteText = textarea.value.trim();
    
    if (noteText) {
        const container = document.querySelector('.sticky-notes-container');
        const note = document.createElement('div');
        note.className = 'sticky-note green';
        note.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
        note.innerHTML = `<p>${noteText}</p>`;
        
        container.appendChild(note);
        textarea.value = '';
        
        // Animate in
        note.style.opacity = '0';
        note.style.transform += ' scale(0.8)';
        
        requestAnimationFrame(() => {
            note.style.transition = 'all 0.3s ease';
            note.style.opacity = '1';
            note.style.transform = note.style.transform.replace('scale(0.8)', 'scale(1)');
        });
    }
}

// Celebration functions
function showCelebration() {
    showPage('celebration-page');
    
    // Trigger confetti animation
    setTimeout(() => {
        const confetti = document.querySelector('.confetti');
        confetti.style.animation = 'confetti-fall 3s ease-out';
    }, 100);
}

function restartExperience() {
    showPage('cover-page');
    
    // Reset any custom notes
    const customNotes = document.querySelectorAll('.sticky-note.green');
    customNotes.forEach(note => note.remove());
}

// Performance optimization: Remove will-change after transitions
document.addEventListener('transitionend', (e) => {
    if (e.target.classList.contains('page')) {
        e.target.style.willChange = 'auto';
    }
});
// Interactive Photo Upload and Edit System
let uploadedImageData = null;

// Handle file upload
document.addEventListener('DOMContentLoaded', () => {
    const photoUpload = document.getElementById('photo-upload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handleFileUpload);
    }
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageData = e.target.result;
            // Visual feedback
            const uploadBtn = document.querySelector('.upload-btn');
            uploadBtn.textContent = '✅ Photo Selected';
            uploadBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        };
        reader.readAsDataURL(file);
    }
}

// Add new photo to gallery
function addNewPhoto() {
    const captionInput = document.getElementById('photo-caption-input');
    const messageInput = document.getElementById('photo-message-input');
    
    const caption = captionInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!uploadedImageData) {
        alert('Please select a photo first! 📷');
        return;
    }
    
    if (!caption) {
        alert('Please enter a caption! ✏️');
        return;
    }
    
    if (!message) {
        alert('Please enter a hidden message! 💭');
        return;
    }
    
    // Create new polaroid
    const photoGrid = document.querySelector('.photo-grid');
    const newPolaroid = document.createElement('div');
    newPolaroid.className = 'polaroid';
    newPolaroid.onclick = () => revealMessage(newPolaroid);
    
    newPolaroid.innerHTML = `
        <div class="edit-controls">
            <button class="edit-btn" onclick="editPolaroid(this.parentElement.parentElement)">✏️</button>
            <button class="delete-btn" onclick="deletePolaroid(this.parentElement.parentElement)">🗑️</button>
        </div>
        <div class="photo-placeholder" style="position: relative;">
            <img src="${uploadedImageData}" alt="${caption}" class="actual-photo">
            <div class="photo-frame"></div>
        </div>
        <div class="photo-caption">${caption}</div>
        <div class="hidden-message" style="display: none;">${message}</div>
    `;
    
    // Add with animation
    newPolaroid.style.opacity = '0';
    newPolaroid.style.transform = 'scale(0.5) rotate(0deg)';
    photoGrid.appendChild(newPolaroid);
    
    requestAnimationFrame(() => {
        newPolaroid.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        newPolaroid.style.opacity = '1';
        newPolaroid.style.transform = 'scale(1) rotate(-2deg)';
    });
    
    // Reset form
    captionInput.value = '';
    messageInput.value = '';
    uploadedImageData = null;
    
    const uploadBtn = document.querySelector('.upload-btn');
    uploadBtn.textContent = '📷 Choose Photo';
    uploadBtn.style.background = 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))';
    
    // Success message
    showNotification('Memory added successfully! ✨');
}

// Edit existing polaroid
function editPolaroid(polaroid) {
    const caption = polaroid.querySelector('.photo-caption');
    const message = polaroid.querySelector('.hidden-message');
    
    const newCaption = prompt('Edit caption:', caption.textContent);
    const newMessage = prompt('Edit hidden message:', message.textContent);
    
    if (newCaption !== null && newCaption.trim() !== '') {
        caption.textContent = newCaption.trim();
    }
    
    if (newMessage !== null && newMessage.trim() !== '') {
        message.textContent = newMessage.trim();
    }
    
    // Visual feedback
    polaroid.classList.add('edit-mode');
    setTimeout(() => {
        polaroid.classList.remove('edit-mode');
    }, 1000);
    
    showNotification('Memory updated! ✏️');
}

// Delete polaroid
function deletePolaroid(polaroid) {
    if (confirm('Are you sure you want to delete this memory? 🗑️')) {
        polaroid.style.transition = 'all 0.5s ease-out';
        polaroid.style.opacity = '0';
        polaroid.style.transform = 'scale(0) rotate(180deg)';
        
        setTimeout(() => {
            polaroid.remove();
        }, 500);
        
        showNotification('Memory deleted! 🗑️');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--neon-pink), var(--neon-purple));
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
        animation: slideIn 0.5s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);