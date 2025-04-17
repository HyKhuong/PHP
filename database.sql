CREATE DATABASE tours_booking;

USE tours_booking;

CREATE TABLE Users ( 
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NULL,
    address TEXT,
    image VARCHAR(255) NULL,
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
    booking_id VARCHAR(36) PRIMARY KEY,
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
    booking_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('VNPay') NOT NULL,
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

/*Categories data*/
INSERT INTO Categories (title, description, image_1, image_2, image_3, image_4) VALUES
('Biển', 'Các tour du lịch biển tuyệt đẹp tại Việt Nam', 'https://example.com/bien1.jpg', 'https://example.com/bien2.jpg', 'https://example.com/bien3.jpg', 'https://example.com/bien4.jpg'),
('Núi Rừng', 'Khám phá các tour du lịch leo núi và thiên nhiên hùng vĩ', 'https://example.com/nui1.jpg', 'https://example.com/nui2.jpg', 'https://example.com/nui3.jpg', 'https://example.com/nui4.jpg'),
('Văn hóa', 'Các tour du lịch khám phá văn hóa, lịch sử đặc sắc', 'https://example.com/vanhoa1.jpg', 'https://example.com/vanhoa2.jpg', 'https://example.com/vanhoa3.jpg', 'https://example.com/vanhoa4.jpg'),
('Sinh thái', 'Trải nghiệm du lịch sinh thái gần gũi với thiên nhiên', 'https://example.com/sinhthai1.jpg', 'https://example.com/sinhthai2.jpg', 'https://example.com/sinhthai3.jpg', 'https://example.com/sinhthai4.jpg')

/*Locations data*/
INSERT INTO Locations (title, description, image_1, image_2, image_3, image_4, create_at) VALUES
('Đà Nẵng', 'Thành phố đáng sống nhất Việt Nam với bãi biển Mỹ Khê nổi tiếng.', 'https://img5.thuthuatphanmem.vn/uploads/2022/01/13/hinh-anh-thanh-pho-da-nang-ve-dem-dep_024513140.jpg', 'danang2.jpg', 'danang3.jpg', 'danang4.jpg', NOW()),
('Hạ Long', 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi.', 'halong1.jpg', 'halong2.jpg', 'halong3.jpg', 'halong4.jpg', NOW()),
('Phú Quốc', 'Đảo ngọc với những bãi biển hoang sơ tuyệt đẹp.', 'phuquoc1.jpg', 'phuquoc2.jpg', 'phuquoc3.jpg', 'phuquoc4.jpg', NOW()),
('Sapa', 'Thị trấn mù sương với ruộng bậc thang tuyệt đẹp.', 'sapa1.jpg', 'sapa2.jpg', 'sapa3.jpg', 'sapa4.jpg', NOW()),
('Đà Lạt', 'Thành phố ngàn hoa với khí hậu mát mẻ quanh năm.', 'dalat1.jpg', 'dalat2.jpg', 'dalat3.jpg', 'dalat4.jpg', NOW()),
('Hội An', 'Phố cổ Hội An với những chiếc đèn lồng đầy màu sắc.', 'hoian1.jpg', 'hoian2.jpg', 'hoian3.jpg', 'hoian4.jpg', NOW()),
('Nha Trang', 'Thiên đường biển với những rạn san hô rực rỡ.', 'nhatrang1.jpg', 'nhatrang2.jpg', 'nhatrang3.jpg', 'nhatrang4.jpg', NOW()),
('Mộc Châu', 'Cao nguyên chè xanh ngút ngàn, nổi bật với hoa cải trắng.', 'mocchau1.jpg', 'mocchau2.jpg', 'mocchau3.jpg', 'mocchau4.jpg', NOW()),
('Ninh Bình', 'Cố đô Hoa Lư và danh thắng Tràng An nổi tiếng.', 'ninhbinh1.jpg', 'ninhbinh2.jpg', 'ninhbinh3.jpg', 'ninhbinh4.jpg', NOW()),
('Côn Đảo', 'Hòn đảo lịch sử với bãi biển hoang sơ tuyệt đẹp.', 'condao1.jpg', 'condao2.jpg', 'condao3.jpg', 'condao4.jpg', NOW()),
('Bình Thuận', 'Nổi tiếng với đồi cát bay và những bãi biển đẹp.', 'binhthuan1.jpg', 'binhthuan2.jpg', 'binhthuan3.jpg', 'binhthuan4.jpg', NOW()),
('Huế', 'Kinh thành Huế với vẻ đẹp cổ kính và lịch sử phong phú.', 'hue1.jpg', 'hue2.jpg', 'hue3.jpg', 'hue4.jpg', NOW()),
('Tây Nguyên', 'Vùng đất của những con voi và nền văn hóa cồng chiêng.', 'taynguyen1.jpg', 'taynguyen2.jpg', 'taynguyen3.jpg', 'taynguyen4.jpg', NOW()),
('Phan Thiết', 'Thành phố biển với hải sản tươi ngon và Mũi Né nổi tiếng.', 'phanthiet1.jpg', 'phanthiet2.jpg', 'phanthiet3.jpg', 'phanthiet4.jpg', NOW()),
('Cà Mau', 'Điểm cực Nam của Việt Nam với rừng ngập mặn phong phú.', 'camau1.jpg', 'camau2.jpg', 'camau3.jpg', 'camau4.jpg', NOW()),
('Hà Giang', 'Cung đường phượt đẹp nhất Việt Nam với cao nguyên đá Đồng Văn.', 'hagiang1.jpg', 'hagiang2.jpg', 'hagiang3.jpg', 'hagiang4.jpg', NOW());

/*Tour data*/
INSERT INTO Tours (title, category_id, location_id, description, price, duration, start_date, end_date, available, image_url, status, create_at) 
VALUES

/*Đà Nẵng*/
('Tour  Bà Nà Hills', 2, 1, 'Khám phá vẻ đẹp hoang sơ và hùng vĩ của thiên nhiên', 3500000.00, 3, '2025-04-15', '2025-04-18', 20, 'https://img5.thuthuatphanmem.vn/uploads/2022/01/13/hinh-anh-thanh-pho-da-nang-ve-dem-dep_024513140.jpg', 'Active', NOW()),
('Tour Bán đảo Sơn Trà', 1, 1, 'Khám phá vẻ đẹp hoang sơ và hùng vĩ của thiên nhiên', 4500000.00, 3, '2025-06-10', '2025-06-13', 15, 'https://i.imgur.com/0h6p4ah.jpg', 'Active', NOW()),
('Tour Ngũ Hành Sơn', 2, 1, 'Khám phá vẻ đẹp hoang sơ và hùng vĩ của thiên nhiên', 5200000.00, 4, '2025-07-05', '2025-07-09', 20, 'https://static.vinwonders.com/2022/04/du-lich-phu-quoc-thang-10-.jpg', 'Active', NOW()),
('Tour Bãi biển Mỹ Khê', 1, 1, 'Khám phá vẻ đẹp hoang sơ và hùng vĩ của thiên nhiên', 3200000.00, 2, '2025-02-05', '2025-02-08', 20, 'https://static.vinwonders.com/2022/04/du-lich-phu-quoc-thang-10-.jpg', 'Active', NOW()),
('Tour Bãi biển Bắc Mỹ An', 1, 1, 'Khám phá vẻ đẹp hoang sơ và hùng vĩ của thiên nhiên', 6300000.00, 2, '2025-07-05', '2025-07-08', 20, 'https://static.vinwonders.com/2022/04/du-lich-phu-quoc-thang-10-.jpg', 'Active', NOW()),
('Tour  Cù Lao Chàm', 2, 1, 'Khám phá vẻ đẹp hoang sơ và hùng vĩ của thiên nhiên', 3900000.00, 3, '2025-08-15', '2025-08-18', 10, 'https://images.wallpapershq.com/wallpapers/6334/wallpaper_6334_3840x2160.jpg', 'Active', NOW()),

/**Hội An*/
('Tour Phố cổ Hội An', 3, 6, 'Khám phá vẻ đẹp hoang sơ và hùng vĩ của thiên nhiên', 4100000.00, 3, '2025-09-10', '2025-09-13', 18, 'https://th.bing.com/th/id/R.77a21595acbac038ab38064aef978703?rik=ExGzz%2bskss4btw&riu=http%3a%2f%2fhtqtravel.com.vn%2fapp%2fwebroot%2fupload%2fadmin%2ffiles%2f2(3).jpg', 'Active', NOW()),
('Tour Rừng Dừa Bảy Mẫu - Hội An', 4, 6, 'Trải nghiệm chèo thuyền thúng, xem biểu diễn quăng chài và khám phá hệ sinh thái rừng dừa nước.', 450000, 1, '2025-10-05', '2025-10-05', 20, 'https://tse2.mm.bing.net/th?id=OIP.1yP0rHqLPiMTJj5HtMxdLQHaEK&pid=Api', 'Active', NOW()),
('Tour Hội An và VinWonders Nam Hội An', 3, 6, 'Tham quan phố cổ Hội An, chụp ảnh tại ngôi nhà hoa giấy và vui chơi tại VinWonders.', 350000, 1, '2025-09-25', '2025-09-25', 22, 'https://tse1.mm.bing.net/th?id=OIP.Wl2LoOaia4Bxk7UaxI088QHaE8&pid=Api', 'Active', NOW()),
('Tour du thuyền sông Hoài và xem show Ký ức Hội An', 3, 6, 'Trải nghiệm du thuyền trên sông Hoài và xem show diễn Ký ức Hội An.', 720000, 1, '2025-09-30', '2025-09-30', 15, 'https://tse3.mm.bing.net/th?id=OIP.N4dPyMeFr-UMJgHOGVfOOwHaEr&pid=Api', 'Active', NOW()),

/*Nha Trang*/
('VinWonders Nha Trang', 4, 7, 'Khu vui chơi giải trí hàng đầu với công viên nước, thủy cung và các trò chơi mạo hiểm.', 880000, 1, '2025-06-10', '2025-06-10', 20, 'https://tse1.mm.bing.net/th?id=OIP.fk3GxT7XckR2nNc9TtMoKgHaEK&pid=Api', 'Active', NOW()),
('Đảo Bình Ba', 1, 7, 'Hòn đảo hoang sơ nổi tiếng với bãi biển tuyệt đẹp và đặc sản tôm hùm.', 550000, 1, '2025-06-15', '2025-06-15', 15, 'https://tse4.mm.bing.net/th?id=OIP.oA5snOe5U9VNs3Aqdfnd4QHaE8&pid=Api', 'Active', NOW()),
('Tháp Bà Ponagar', 3, 7, 'Di tích Chăm Pa cổ kính với kiến trúc độc đáo, thu hút du khách và người hành hương.', 30000, 1, '2025-06-20', '2025-06-20', 30, 'https://tse3.mm.bing.net/th?id=OIP.WVwztKxBPS70f3L-rI5xawHaE8&pid=Api', 'Active', NOW()),
('Viện Hải Dương Học', 3, 7, 'Nơi lưu trữ hàng nghìn mẫu vật sinh vật biển và có bộ xương cá voi khổng lồ.', 40000, 1, '2025-06-25', '2025-06-25', 25, 'https://tse1.mm.bing.net/th?id=OIP.qEotB7LzW2Noe02jUj23sQHaEK&pid=Api', 'Active', NOW()),
('Hòn Mun', 1, 7, 'Khu bảo tồn biển với làn nước trong xanh, thích hợp cho hoạt động lặn ngắm san hô.', 250000, 1, '2025-06-30', '2025-06-30', 18, 'https://tse2.mm.bing.net/th?id=OIP.Jfyo2KtFt3LZSKD6Z3BaLgHaFj&pid=Api', 'Active', NOW()),

/*Mộc Châu*/
('Tour Đồi Chè Trái Tim', 2, 8, 'Check-in tại đồi chè hình trái tim tuyệt đẹp, một trong những điểm đến nổi tiếng nhất của Mộc Châu.', 0, 1, '2025-06-20', '2025-06-20', 30, 'https://vietnamtravel.com/images/2018/09/Moc-Chau3.jpg', 'Active', NOW()),
('Tour Thác Dải Yếm', 2, 8, 'Tham quan thác nước Dải Yếm – vẻ đẹp hùng vĩ giữa núi rừng Tây Bắc.', 50000, 1, '2025-06-21', '2025-06-21', 25, 'https://tse1.mm.bing.net/th?id=OIP.2ZjX81OjqFDkKkAo5lj0JwHaEK&pid=Api', 'Active', NOW()),
('Tour Rừng Thông Bản Áng', 2, 8, 'Khám phá vẻ đẹp hoang sơ của rừng thông và hồ nước trong xanh tại Bản Áng.', 30000, 1, '2025-06-22', '2025-06-22', 20, 'https://tse4.mm.bing.net/th?id=OIP.rXLQuwP-jkJ4h2S4xTpRwgHaE8&pid=Api', 'Active', NOW()),
('Tour Ngũ Động Bản Ôn', 2, 8, 'Chinh phục hệ thống hang động huyền bí Ngũ Động Bản Ôn, khám phá những hình thù kỳ vĩ của thiên nhiên.', 50000, 1, '2025-06-23', '2025-06-23', 18, 'https://tse2.mm.bing.net/th?id=OIP.0P9AcP7BYQhD8Y8xUz2VUwHaEK&pid=Api', 'Active', NOW()),
('Tour Happy Land Mộc Châu', 3, 8, 'Tham quan khu du lịch Happy Land với những cánh đồng hoa rực rỡ, tạo nên không gian check-in đẹp như mơ.', 60000, 1, '2025-06-24', '2025-06-24', 22, 'https://tse3.mm.bing.net/th?id=OIP.PfGoLhWpb0a9_yPzH3Ym_gHaE8&pid=Api', 'Active', NOW()),

/*Ninh Bình*/
('Tour Tràng An', 2, 9, 'Khám phá quần thể danh thắng Tràng An với hệ thống hang động và sông nước tuyệt đẹp.', 250000, 1, '2025-07-05', '2025-07-05', 25, 'https://static.vecteezy.com/system/resources/thumbnails/025/368/867/original/aerial-view-4k-by-drone-at-tam-coc-ninh-binh-vietnam-free-video.jpg', 'Active', NOW()),
('Tour Tam Cốc - Bích Động', 4, 9, 'Du ngoạn Tam Cốc - Bích Động, thưởng ngoạn cảnh đẹp hữu tình của non nước Ninh Bình.', 200000, 1, '2025-07-06', '2025-07-06', 30, 'https://vietnam.travel/sites/default/files/2021-01/tamcoc1.jpg', 'Active', NOW()),
('Tour Cố Đô Hoa Lư', 3, 9, 'Tham quan di tích cố đô Hoa Lư - kinh đô đầu tiên của nước Đại Cồ Việt.', 150000, 1, '2025-07-07', '2025-07-07', 40, 'https://cdn3.ivivu.com/2014/11/co-do-hoa-lu.jpg', 'Active', NOW()),
('Tour Hang Múa', 3, 9, 'Chinh phục đỉnh Hang Múa để ngắm nhìn toàn cảnh tuyệt đẹp của Tam Cốc từ trên cao.', 120000, 1, '2025-07-08', '2025-07-08', 20, 'https://upload.wikimedia.org/wikipedia/commons/4/41/Hang_Mua_Viewpoint%2C_Ninh_Binh%2C_Vietnam.jpg', 'Active', NOW()),
('Tour Chùa Bái Đính', 3, 9, 'Viếng thăm chùa Bái Đính - ngôi chùa lớn nhất Đông Nam Á với kiến trúc hoành tráng.', 300000, 1, '2025-07-09', '2025-07-09', 35, 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Bai_Dinh_Pagoda.jpg', 'Active', NOW()),

/* Côn Đảo */
('Khám Phá Côn Đảo', 1, 10, 'Tham quan hệ thống nhà tù Côn Đảo và các bãi biển hoang sơ.', 5600000, 4, '2025-07-20', '2025-07-24', 20, 'https://th.bing.com/th/id/R.83d04897815e36ab094ef809b6d4a6ee?rik=3yJZkksq0OMv4A&pid=ImgRaw&r=0', 'Active', NOW()),
('Lặn Biển Côn Đảo', 1, 10, 'Khám phá rạn san hô và thế giới đại dương tại Côn Đảo.', 6000000, 3, '2025-07-25', '2025-07-28', 18, 'https://dulich3mien.vn/wp-content/uploads/2023/05/lặn-ngắm-san-hô.jpg', 'Active', NOW()),
('Tour Câu Cá Côn Đảo', 1, 10, 'Trải nghiệm câu cá giữa biển khơi tại Côn Đảo.', 5200000, 2, '2025-07-29', '2025-07-31', 15, 'https://th.bing.com/th/id/OIP.VY9CtmCg1GjDhSR_5AAVcwHaEK?pid=ImgDet&rs=1', 'Active', NOW()),
('Đảo Bé & Đảo Lớn', 1, 10, 'Du ngoạn qua các đảo hoang sơ tại Côn Đảo.', 5800000, 3, '2025-08-01', '2025-08-04', 22, 'https://th.bing.com/th/id/R.dca3c0e1b636fe5509d943d59c473c5e?rik=YBk0w3C22Wnc0A&pid=ImgRaw&r=0', 'Active', NOW()),
('Cắm Trại Bãi Biển', 1, 10, 'Trải nghiệm cắm trại ven biển Côn Đảo cùng BBQ hải sản.', 4900000, 2, '2025-08-05', '2025-08-07', 30, 'https://cdn2.ivivu.com/2023/03/cam-trai.jpg', 'Active', NOW()),
('Hành Trình Tâm Linh', 1, 10, 'Viếng thăm nghĩa trang Hàng Dương và mộ chị Võ Thị Sáu.', 4500000, 1, '2025-08-08', '2025-08-08', 40, 'https://th.bing.com/th/id/OIP.Ghv9uH3Uwm5ZpV8NsOIbGwHaEK?pid=ImgDet&rs=1', 'Active', NOW()),

/* Bình Thuận */
('Tour Mũi Né', 1, 11, 'Khám phá bãi biển Mũi Né và thưởng thức hải sản tươi ngon.', 3900000, 3, '2025-08-10', '2025-08-13', 19, 'https://th.bing.com/th/id/OIP.D0v2Hzhp6lTTI38m3HtKXgHaEv?rs=1&pid=ImgDetMain', 'Active', NOW()),
('Trượt Cát Đồi Cát Bay', 1, 11, 'Trải nghiệm cảm giác mạnh khi trượt cát trên Đồi Cát Bay.', 3500000, 2, '2025-08-14', '2025-08-16', 20, 'https://th.bing.com/th/id/OIP.kBy1Iwn-d8-PH_R7HpXZxAHaE7?rs=1&pid=ImgDetMain', 'Active', NOW()),
('Làng Chài Mũi Né', 3, 11, 'Thăm làng chài truyền thống và thưởng thức các món đặc sản.', 3200000, 1, '2025-08-17', '2025-08-17', 25, 'https://th.bing.com/th/id/OIP.TT-KgS_k_A0PyOdNstxZhAHaE8?pid=ImgDet&rs=1', 'Active', NOW()),
('Suối Tiên Bình Thuận', 3, 11, 'Dạo bộ giữa dòng suối đỏ rực độc đáo ở Bình Thuận.', 2800000, 1, '2025-08-18', '2025-08-18', 30, 'https://th.bing.com/th/id/OIP.zkhBdFZCndRA6e-mc16TkQHaE6?pid=ImgDet&rs=1', 'Active', NOW()),
('Bàu Trắng', 4, 11, 'Khám phá tiểu sa mạc Sahara của Việt Nam.', 3600000, 2, '2025-08-19', '2025-08-21', 15, 'https://th.bing.com/th/id/OIP.G-zZDpShYmBkdmvQwyJmDgHaE8?pid=ImgDet&rs=1', 'Active', NOW()),
('Khám Phá Hải Đăng Kê Gà', 3, 11, 'Tham quan ngọn hải đăng cổ nhất Đông Dương.', 3300000, 1, '2025-08-22', '2025-08-22', 18, 'https://th.bing.com/th/id/OIP.M3XsHJIsA5DDsBw4Byc92gHaE7?pid=ImgDet&rs=1', 'Active', NOW()),

/* Huế */
('Tour Cố Đô Huế', 3, 12, 'Thăm quan Đại Nội Huế - biểu tượng của triều Nguyễn.', 3600000, 3, '2025-09-01', '2025-09-04', 25, 'https://danviet.mediacdn.vn/296231569849192448/2022/9/2/hue-15-1662112004058828931902.jpg', 'Active', NOW()),
('Chùa Thiên Mụ', 3, 12, 'Chiêm bái ngôi chùa nổi tiếng bên dòng sông Hương.', 3100000, 1, '2025-09-05', '2025-09-05', 40, 'https://th.bing.com/th/id/OIP.Ghv9uH3Uwm5ZpV8NsOIbGwHaEK?pid=ImgDet&rs=1', 'Active', NOW()),
('Sông Hương - Cầu Tràng Tiền', 3, 12, 'Du thuyền trên sông Hương, ngắm cầu Tràng Tiền lung linh về đêm.', 2900000, 1, '2025-09-06', '2025-09-06', 35, 'https://th.bing.com/th/id/OIP.uw3RfFdwCsoBqxXYynsZIQHaEo?pid=ImgDet&rs=1', 'Active', NOW()),
('Lăng Khải Định', 3, 12, 'Tham quan lăng tẩm với kiến trúc độc đáo bậc nhất Việt Nam.', 3400000, 1, '2025-09-07', '2025-09-07', 28, 'https://th.bing.com/th/id/OIP.Jzk4Mxv2PnWzFT5XsO9elAHaEo?pid=ImgDet&rs=1', 'Active', NOW()),
('Vịnh Lăng Cô', 1, 12, 'Khám phá bãi biển hoang sơ tuyệt đẹp tại Huế.', 3700000, 2, '2025-09-08', '2025-09-09', 20, 'https://th.bing.com/th/id/OIP.-MlHE2tPMtHvuJQ1ygfAdgHaE7?pid=ImgDet&rs=1', 'Active', NOW()),
('Thưởng Thức Ẩm Thực Huế', 3, 12, 'Thử các món đặc sản như bún bò Huế, bánh bèo, bánh nậm.', 2700000, 1, '2025-09-10', '2025-09-10', 50, 'https://th.bing.com/th/id/OIP.B76xmvIpj8pW_A6bsWkFGgHaE8?pid=ImgDet&rs=1', 'Active', NOW()),

/* Tây Nguyên */
('Khám Phá Tây Nguyên', 2, 13, 'Tham quan những cánh rừng nguyên sinh hùng vĩ của Tây Nguyên.', 4000000.00, 4, '2025-09-20', '2025-09-24', 16, 'https://th.bing.com/th/id/R.d45a910a00766e4bdd7a730e5c2555bf?rik=Ogj5X40TpgYWrA&pid=ImgRaw&r=0', 'Active', NOW()),  
('Thác Dray Nur', 2, 13, 'Chiêm ngưỡng vẻ đẹp hoang sơ của thác nước Dray Nur.', 3500000.00, 3, '2025-09-25', '2025-09-28', 18, 'https://th.bing.com/th/id/OIP.xU6c9x9K4PCn7ZkVa2Gl7AHaE7?pid=ImgDet&rs=1', 'Active', NOW()),  
('Hồ Lắk & Cưỡi Voi', 3, 13, 'Trải nghiệm cưỡi voi và đi thuyền độc mộc trên hồ Lắk.', 3700000.00, 2, '2025-09-29', '2025-10-01', 22, 'https://th.bing.com/th/id/OIP.PyQ7LrUt6M8_y_Xv-jZ2bgHaE8?pid=ImgDet&rs=1', 'Active', NOW()),  
('Làng Cà Phê Buôn Ma Thuột', 3, 13, 'Thưởng thức cà phê nguyên chất tại vùng đất Tây Nguyên.', 3200000.00, 1, '2025-10-02', '2025-10-02', 30, 'https://th.bing.com/th/id/OIP.Z9DWYj35dc-_pr5rN6ONwAHaE7?pid=ImgDet&rs=1', 'Active', NOW()),  
('Vườn Quốc Gia Yok Đôn', 4, 13, 'Khám phá rừng khộp khổng lồ tại Yok Đôn.', 4100000.00, 3, '2025-10-03', '2025-10-06', 19, 'https://th.bing.com/th/id/OIP.qCJ3qNED6RAuJOlcMJ8k8QHaEK?pid=ImgDet&rs=1', 'Active', NOW()),  
('Lễ Hội Cồng Chiêng Tây Nguyên', 3, 13, 'Tham gia lễ hội văn hóa truyền thống của người Tây Nguyên.', 3800000.00, 2, '2025-10-07', '2025-10-09', 25, 'https://th.bing.com/th/id/OIP.fgNfpMJ_z2iR6T5B6ErPOgHaE6?pid=ImgDet&rs=1', 'Active', NOW()),  

/* Phan Thiết */
('Tour Thành Phố Biển Phan Thiết', 1, 14, 'Khám phá bãi biển tuyệt đẹp của Phan Thiết.', 4200000.00, 3, '2025-10-10', '2025-10-13', 21, 'https://otosaigon.com/attachments/phan-thiet-jpg.2617996/', 'Active', NOW()),  
('Khám Phá Bàu Trắng', 4, 14, 'Đi xe jeep qua những đồi cát rộng lớn tại Bàu Trắng.', 3800000.00, 2, '2025-10-14', '2025-10-16', 18, 'https://th.bing.com/th/id/OIP.BoUl8JQGhnqFGDC02_wNQQHaE8?pid=ImgDet&rs=1', 'Active', NOW()),  
('Hải Đăng Kê Gà', 3, 14, 'Tham quan ngọn hải đăng cổ kính nhất Việt Nam.', 3600000.00, 1, '2025-10-17', '2025-10-17', 30, 'https://th.bing.com/th/id/OIP.AH8_R7o0al2B6MuOKQ_zzQHaE7?pid=ImgDet&rs=1', 'Active', NOW()),  
('Thưởng Thức Hải Sản Phan Thiết', 1, 14, 'Thử các món đặc sản tươi sống ven biển.', 3000000.00, 1, '2025-10-18', '2025-10-18', 40, 'https://th.bing.com/th/id/OIP.gKwvUNWB6Y7dFgldewvS7AHaE8?pid=ImgDet&rs=1', 'Active', NOW()),  
('Trượt Cát Đồi Hồng', 4, 14, 'Trải nghiệm trượt cát độc đáo trên đồi Hồng.', 3400000.00, 1, '2025-10-19', '2025-10-19', 35, 'https://th.bing.com/th/id/OIP.J6l7lfN4YZv5NEBw4OwdyQHaFj?pid=ImgDet&rs=1', 'Active', NOW()),  
('Làng Chài Mũi Né', 3, 14, 'Gặp gỡ ngư dân và tham quan làng chài ven biển.', 3100000.00, 1, '2025-10-20', '2025-10-20', 50, 'https://th.bing.com/th/id/OIP.f0xS06ogH1ZnYX5dJadM2AHaE8?pid=ImgDet&rs=1', 'Active', NOW()),  

/* Cà Mau */
('Tour Mũi Cà Mau', 1, 15, 'Chinh phục điểm cực Nam của Việt Nam.', 4400000.00, 3, '2025-10-25', '2025-10-28', 17, 'https://sayhellovietnam.com/wp-content/uploads/2023/03/image-71-1140x694.png', 'Active', NOW()),  
('Khám Phá Rừng U Minh Hạ', 4, 15, 'Tận hưởng cảnh đẹp thiên nhiên hoang sơ tại rừng U Minh.', 3900000.00, 2, '2025-10-29', '2025-10-31', 20, 'https://th.bing.com/th/id/OIP.XWl7nfpLTK0T2-TyX-OHIAHaFj?pid=ImgDet&rs=1', 'Active', NOW()),  

/* Hà Giang */
('Tour Hà Giang', 3, 16, 'Trải nghiệm cung đường hùng vĩ của Hà Giang.', 5000000.00, 5, '2025-11-05', '2025-11-10', 14, 'https://th.bing.com/th/id/OIP.UfpyltIahlV-9Pq837LDpgHaEb?rs=1&pid=ImgDetMain', 'Active', NOW()),  
('Cung Đường Hạnh Phúc', 3, 16, 'Chinh phục cung đường đẹp nhất Việt Nam.', 4800000.00, 3, '2025-11-11', '2025-11-14', 20, 'https://th.bing.com/th/id/OIP.-0R4pb3XwnkGQLd2PV9FGwHaE7?pid=ImgDet&rs=1', 'Active', NOW()),  
('Đèo Mã Pí Lèng', 2, 16, 'Check-in đèo Mã Pí Lèng - một trong tứ đại đỉnh đèo.', 4600000.00, 2, '2025-11-15', '2025-11-17', 25, 'https://th.bing.com/th/id/OIP.sATt3TGQXrC5jb6fcpVJzAHaE8?pid=ImgDet&rs=1', 'Active', NOW()),  
('Chợ Tình Khâu Vai', 3, 16, 'Khám phá chợ tình độc đáo của người dân tộc vùng cao.', 4500000.00, 1, '2025-11-18', '2025-11-18', 30, 'https://th.bing.com/th/id/OIP.xAt6x37tFHU4d_4B_dF7WQHaE8?pid=ImgDet&rs=1', 'Active', NOW());  
