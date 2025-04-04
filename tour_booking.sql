CREATE DATABASE tours_booking;

USE tours_booking;

CREATE TABLE Users ( 
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NULL,
    address TEXT,
    dob DATE NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE Categories (
	category_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	image_1 VARCHAR(255) NULL,
	image_2 VARCHAR(255) NULL,
	image_3 VARCHAR(255) NULL,
	image_4 VARCHAR(255) NULL, 
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Locations (
	location_id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	image_1 VARCHAR(255) NULL,
	image_2 VARCHAR(255) NULL,
	image_3 VARCHAR(255) NULL,
	image_4 VARCHAR(255) NULL,
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tours (
    tour_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    location_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    duration INT,
    start_date DATE,
    end_date DATE,
    available INT,
    image_url VARCHAR(255),
    status ENUM('Active', 'Inactive', 'Completed') DEFAULT 'Active',
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (location_id) REFERENCES Locations(location_id)
);

CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tour_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    number_of_people INT NOT NULL,
    total_price DECIMAL(10,2),
    status ENUM('Pending', 'Confirmed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (tour_id) REFERENCES Tours(tour_id)
);

CREATE TABLE Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('Credit Card', 'Debit Card', 'PayPal') NOT NULL,
    payment_status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    transaction_id VARCHAR(100) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    tour_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    helpful_votes INT DEFAULT 0,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (tour_id) REFERENCES Tours(tour_id)
);
