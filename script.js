// ==========================================================================
// Mercy Naliaka Moraa — Portfolio Interactive Script
// Warm, lightweight, fast, no external libraries needed.
// ==========================================================================

// Case Studies Filtering
function filterCaseStudies(category, event) {
  const btn = event ? (event.currentTarget || (event.target ? event.target.closest('button') : null)) : null;
  const chips = document.querySelectorAll('.project-filter-row .filter-chip');

  chips.forEach(chip => chip.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.case-study-card');
  cards.forEach(card => {
    const itemCat = (card.getAttribute('data-category') || '').toLowerCase();
    if (category === 'all' || itemCat === category.toLowerCase()) {
      card.classList.remove('is-hidden');
    } else {
      card.classList.add('is-hidden');
    }
  });
}

// Moments & Field Work Gallery Filtering
function filterMoments(category, event) {
  const btn = event ? (event.currentTarget || (event.target ? event.target.closest('button') : null)) : null;
  const chips = document.querySelectorAll('.moment-filter-chip');

  chips.forEach(chip => chip.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.moment-card');
  cards.forEach(card => {
    const itemCats = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/);
    if (category === 'all' || itemCats.includes(category.toLowerCase())) {
      card.classList.remove('is-hidden');
    } else {
      card.classList.add('is-hidden');
    }
  });
}

// In-UI Presentation Reel Player & Deck Modal Handler
function playPresentationReel(event) {
  if (event) event.preventDefault();
  const screenWrap = document.getElementById('presentationScreen');
  const videoElem = document.getElementById('embeddedReelVideo');
  const posterImg = document.getElementById('reelPosterImg');

  // Check if video element has loaded a valid video file
  if (videoElem && videoElem.canPlayType && videoElem.currentSrc && videoElem.readyState >= 2) {
    if (videoElem.paused) {
      videoElem.style.display = 'block';
      if (posterImg) posterImg.style.display = 'none';
      videoElem.play().then(() => {
        showToast('Playing presentation reel...');
      }).catch(() => {
        if (posterImg) posterImg.style.display = 'block';
        videoElem.style.display = 'none';
        openPresentationModal();
      });
      return;
    } else {
      videoElem.pause();
      return;
    }
  }

  // Gracefully open the full interactive slide deck modal
  openPresentationModal();
}

function openPresentationModal() {
  const modal = document.getElementById('presentationModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    showToast('Viewing DigiCow AI presentation slides & pitch deck...');
  }
}

function closePresentationModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('presentationModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Close presentation modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePresentationModal();
  }
});


// Copy to Clipboard Utility with Toast Notification
function copyContact(text, message) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message || 'Copied to clipboard!');
    }).catch(() => {
      fallbackCopyText(text, message);
    });
  } else {
    fallbackCopyText(text, message);
  }
}

function fallbackCopyText(text, message) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message || 'Copied to clipboard!');
  } catch (err) {
    showToast('Press Ctrl+C to copy');
  }
  document.body.removeChild(textArea);
}

// Toast Display
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Mobile Nav Toggle
function toggleMobileNav() {
  const panel = document.getElementById('mobileNavPanel');
  if (panel) {
    panel.classList.toggle('open');
  }
}

function closeMobileNav() {
  const panel = document.getElementById('mobileNavPanel');
  if (panel) {
    panel.classList.remove('open');
  }
}

// Contact Form Submission Handler (Mailto link generator)
function handleInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('inqName').value.trim();
  const email = document.getElementById('inqEmail').value.trim();
  const subject = document.getElementById('inqSubject').value.trim();
  const message = document.getElementById('inqMessage').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Please fill out all fields.');
    return;
  }

  const emailBody = `Hi Mercy,\n\nSender: ${name} (${email})\n\nMessage:\n${message}\n\nSent from Portfolio Website.`;
  const mailtoLink = `mailto:mercymoraa012@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  window.location.href = mailtoLink;
  showToast('Opening your email client...');
}

// Active Nav Link Spy on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 160) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
});

// Sticker Micro-Interaction (Mouse Tracking Tilt)
document.addEventListener('DOMContentLoaded', () => {
  const sticker = document.querySelector('.hero-sticker-card');
  if (!sticker) return;

  sticker.addEventListener('mousemove', (e) => {
    const rect = sticker.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    sticker.style.transform = `perspective(300px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg) scale(1.05)`;
  });

  sticker.addEventListener('mouseleave', () => {
    sticker.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});
