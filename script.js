// Shared JavaScript functions

// Check authentication
function checkAuth() {
    const user = getCurrentUser();
    if (!user && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        window.location.href = 'index.html';
    }
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('saigonride_user');
    return userStr ? JSON.parse(userStr) : null;
}

// Logout
function logout() {
    localStorage.removeItem('saigonride_user');
    window.location.href = 'index.html';
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Initialize navigation
function initNav() {
    const user = getCurrentUser();
    if (!user) return;

    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    
    if (userName) {
        userName.textContent = user.name;
    }
    
    if (userRole && user.role === 'admin') {
        userRole.textContent = '(Admin)';
    }

    // Hide dashboard link for non-admins
    if (user.role !== 'admin') {
        const dashboardLinks = document.querySelectorAll('.nav-dashboard');
        dashboardLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    // Don't check auth on login page
    if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
        checkAuth();
    }
    initNav();
});
