CREATE DATABASE saigon_ride_db;
GO

USE saigon_ride_db;
GO

-- Stations
CREATE TABLE stations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    address NVARCHAR(255) NOT NULL,
    district NVARCHAR(100),
    capacity INT NOT NULL,
    current_bikes INT DEFAULT 0,
    current_scooters INT DEFAULT 0,
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE()
);

-- Users
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) UNIQUE NOT NULL,
    password_hash NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE,
    phone NVARCHAR(20),
    user_type NVARCHAR(50) CHECK (user_type IN ('local_commuter', 'foreign_tourist', 'admin')) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Vehicles
CREATE TABLE vehicles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    vehicle_code NVARCHAR(20) UNIQUE NOT NULL,
    type NVARCHAR(20) CHECK (type IN ('bike', 'e-scooter')) NOT NULL,
    battery_percent INT DEFAULT 100,
    status NVARCHAR(50) CHECK (status IN ('available', 'renting', 'maintenance', 'low_battery')) DEFAULT 'available',
    current_station_id INT,
    created_at DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (current_station_id) REFERENCES stations(id)
);

-- Rentals
CREATE TABLE rentals (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_station_id INT NOT NULL,
    end_station_id INT,
    start_time DATETIME DEFAULT GETDATE(),
    end_time DATETIME NULL,
    estimated_duration_minutes INT,
    actual_duration_minutes INT,
    base_price_per_minute DECIMAL(10,2),
    is_discounted BIT DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,
    status NVARCHAR(20) CHECK (status IN ('ongoing', 'completed', 'cancelled')) DEFAULT 'ongoing',

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (start_station_id) REFERENCES stations(id),
    FOREIGN KEY (end_station_id) REFERENCES stations(id)
);

-- Payments
CREATE TABLE payments (
    id INT IDENTITY(1,1) PRIMARY KEY,
    rental_id INT UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method NVARCHAR(50) CHECK (payment_method IN ('momo', 'vnpay', 'apple_pay', 'paypal', 'cash')) NOT NULL,
    transaction_id NVARCHAR(100),
    payment_status NVARCHAR(20) CHECK (payment_status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
    payment_time DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (rental_id) REFERENCES rentals(id)
);

USE saigon_ride_db;
GO

-- 1. XÓA DỮ LIỆU CŨ (Nếu có) để tránh lỗi trùng lặp khi chạy lại nhiều lần
DELETE FROM payments;
DELETE FROM rentals;
DELETE FROM vehicles;
DELETE FROM users;
DELETE FROM stations;

-- 1. THÊM CÁC TRẠM MỚI (Để kiểm tra bản đồ/danh sách trạm)
INSERT INTO stations (name, address, district, capacity, current_bikes, current_scooters) 
VALUES 
(N'Nguyen Hue Station', N'Walking Street', N'District 1', 30, 10, 5),
(N'Turtle Lake Station', N'Vong Xoay Con Rua', N'District 3', 20, 2, 1), -- Trạm này ít xe (<20%)
(N'Thao Dien Station', N'Xuan Thuy St', N'District 2', 40, 20, 15);

-- 2. THÊM NGƯỜI DÙNG MỚI (Để kiểm tra Login/Dashboard)
INSERT INTO users (username, password_hash, full_name, email, user_type) 
VALUES 
(N'tourist_bob', N'pass123', N'Bob the Traveler', 'bob@example.com', 'foreign_tourist'),
(N'van_minh', N'pass456', N'Trần Văn Minh', 'minh@gmail.com', 'local_commuter');

-- 3. THÊM XE MỚI
INSERT INTO vehicles (vehicle_code, type, current_station_id, status, battery_percent) 
VALUES 
(N'ES-999', 'e-scooter', (SELECT id FROM stations WHERE name = N'Nguyen Hue Station'), 'available', 95),
(N'BK-888', 'bike', (SELECT id FROM stations WHERE name = N'Thao Dien Station'), 'renting', 100);

-- 4. THÊM LƯỢT THUÊ ĐANG DIỄN RA (Status = 'ongoing')
-- Cái này rất quan trọng để kiểm tra xem Dashboard có hiện "Xe đang thuê" không
INSERT INTO rentals (user_id, vehicle_id, start_station_id, start_time, status, base_price_per_minute)
VALUES (
    (SELECT id FROM users WHERE username = 'tourist_bob'),
    (SELECT id FROM vehicles WHERE vehicle_code = 'ES-999'),
    (SELECT id FROM stations WHERE name = N'Nguyen Hue Station'),
    GETDATE(), 'ongoing', 1500.00
);

GO
-- Kiểm tra nhanh xem dữ liệu đã vào DB chưa
SELECT 'Users' as TableName, COUNT(*) as Total FROM users
UNION ALL
SELECT 'Stations', COUNT(*) FROM stations
UNION ALL
SELECT 'Rentals', COUNT(*) FROM rentals;

-- 7. KIỂM TRA KẾT QUẢ
SELECT * FROM users;
SELECT * FROM vehicles;
SELECT * FROM rentals;
SELECT * FROM payments;

SELECT * FROM rentals WHERE user_id = (SELECT id FROM users WHERE username = 'van_minh');

USE saigon_ride_db;
INSERT INTO users (username, password_hash, full_name, email, user_type) 
VALUES (N'admin', N'123', N'Tổng Quản Trị', 'admin@saigonride.com', 'admin');