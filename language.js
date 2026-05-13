const translations = {
    en: {
        login: "Login",
        welcome: "Welcome Back",
        username: "Username",
        password: "Password",
        dashboard: "Dashboard",
        newRental: "New Rental",
        createRental: "Create New Rental",
        selectVehicle: "Select Vehicle Type",
        selectStation: "Select Stations",
        duration: "Estimated Duration",
        payment: "Payment",
        completePayment: "Complete Payment",
        totalRevenue: "Total Revenue",
        totalRentals: "Total Rentals",
        activeRentals: "Active Rentals",
        totalVehicles: "Total Vehicles"
    },
    vi: {
        login: "Đăng nhập",
        welcome: "Chào mừng",
        username: "Tên đăng nhập",
        password: "Mật khẩu",
        dashboard: "Bảng điều khiển",
        newRental: "Thuê xe",
        createRental: "Tạo thuê xe",
        selectVehicle: "Chọn loại xe",
        selectStation: "Chọn trạm",
        duration: "Thời gian dự kiến",
        payment: "Thanh toán",
        completePayment: "Hoàn tất thanh toán",
        totalRevenue: "Tổng doanh thu",
        totalRentals: "Tổng lượt thuê",
        activeRentals: "Đang thuê",
        totalVehicles: "Tổng số xe"
    }
};

function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "en";
    applyLanguage(lang);
});