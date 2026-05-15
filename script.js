// Shared JavaScript functions cho SaigonRide
const API_BASE_URL = "https://localhost:7xxx/api"; // Lưu ý: Thay 7xxx bằng Port thật của Backend ASP.NET

// --- PHẦN KẾT NỐI API MỚI ---

// Hàm lấy danh sách User từ Backend
async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/Users`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách Users:", error);
        return [];
    }
}

async function loginUser(username, password) {
    try {
        // Trong thực tế bạn sẽ POST lên /api/Auth/login
        // Hiện tại ta dùng GET để tìm user theo logic demo
        const users = await fetchUsers();
        const user = users.find(u => u.username === username);
        
        if (user) {
            // Mapping: ASP.NET trả về 'fullName', 'userType' 
            // Ta chuyển về format 'name', 'role' để khớp với code Frontend cũ
            const userData = {
                id: user.id,
                username: user.username,
                name: user.fullName, // Mapping từ C# Class
                role: user.userType === 'admin' ? 'admin' : 'user'
            };
            
            localStorage.setItem('saigonride_user', JSON.stringify(userData));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        return false;
    }
}

// --- PHẦN LOGIC CŨ ĐÃ ĐƯỢC CẬP NHẬT ---

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
        // user.name này phải khớp với key "name" ta vừa lưu ở Bước 1
        userName.textContent = user.name || user.username; 
    }
    
    if (userRole && user.role === 'admin') {
        userRole.textContent = '(Admin)';
    }

    // Ẩn link dashboard nếu không phải admin
    if (user.role !== 'admin') {
        const dashboardLinks = document.querySelectorAll('.nav-dashboard');
        dashboardLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}

// Chạy khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const isLoginPage = path.endsWith('index.html') || path === '/';

    if (!isLoginPage) {
        checkAuth();
    }
    initNav();
});