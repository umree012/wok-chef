// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Toggle sidebar function
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('mainContent');
  sidebar.classList.toggle('active');
  content.classList.toggle('shifted');
  document.body.classList.toggle('sidebar-active');
}

// Highlight current page in navigation
function highlightCurrentPage() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-menu li a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (window.innerWidth <= 992 && 
      !sidebar.contains(event.target) && 
      event.target !== menuToggle && 
      !menuToggle.contains(event.target)) {
    sidebar.classList.remove('active');
    document.getElementById('mainContent').classList.remove('shifted');
    document.body.classList.remove('sidebar-active');
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  highlightCurrentPage();
  
  // Show menu toggle on mobile
  if (window.innerWidth <= 992) {
    document.querySelector('.menu-toggle').style.display = 'block';
  }

  // Lazy load images
  const lazyImages = document.querySelectorAll('.item-image[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => {
            img.classList.add('loaded');
            img.removeAttribute('data-src');
          };
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.onload = () => img.classList.add('loaded');
    });
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 992) {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('mainContent').classList.remove('shifted');
    document.body.classList.remove('sidebar-active');
    document.querySelector('.menu-toggle').style.display = 'none';
  } else {
    document.querySelector('.menu-toggle').style.display = 'block';
  }
});
