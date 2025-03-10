import PropTypes from "prop-types";

const tours = [
  {
    id: 1,
    title: "Hà Nội - Việt Phủ Thành Chương - Sapa - Fansipan - Yên Tử - Hạ Long - Ninh Bình - Tràng An - Bái Đính",
    price: 10890000,
    duration: "7N6Đ",
    departure: "TP. Hồ Chí Minh",
    startDates: ["28/02", "01/03", "02/03", "03/03"],
    image: "https://via.placeholder.com/300",
    type: "Tiết kiệm",
  },
  {
    id: 2,
    title: "Hà Nội - Sapa - Fansipan - Yên Tử - Hạ Long - Ninh Bình - Tràng An - Bái Đính - Tặng vé tàu hỏa leo núi Mường Hoa",
    price: 10890000,
    duration: "7N6Đ",
    departure: "TP. Hồ Chí Minh",
    startDates: ["28/02", "01/03", "02/03", "03/03"],
    image: "https://via.placeholder.com/300",
    type: "Tiết kiệm",
  },
  {
    id: 3,
    title: "Hà Nội - Lào Cai - Quảng Ninh - Ninh Bình - Sapa - Bản Cát Cát - Fansipan Hạ Long - Động Thiên Cung - Yên Tử - K...",
    price: 11790000,
    duration: "7N6Đ",
    departure: "TP. Hồ Chí Minh",
    startDates: ["28/02", "01/03", "02/03", "03/03"],
    image: "https://via.placeholder.com/300",
    type: "Tiêu chuẩn",
  },
];

const TourCard = ({ tour }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="font-semibold mt-2">{tour.title}</h3>
      <p className="text-gray-500">Mã tour: NDSGN{tour.id}</p>
      <p className="text-gray-500">Thời gian: {tour.duration}</p>
      <p className="text-gray-500">Phương tiện: Máy bay</p>
      <p className="font-bold text-red-600 text-lg">{tour.price.toLocaleString()} đ</p>
      <button className="w-full text-white px-4 py-2 rounded font-semibold shadow-md bg-gradient-to-r from-[#89A5C7] to-[#AFD7E6]">
        Xem chi tiết
      </button>
    </div>
  );
};

// ✅ PropTypes validation for TourCard
TourCard.propTypes = {
  tour: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    departure: PropTypes.string,
    startDates: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }).isRequired,
};

const Sidebar = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="font-semibold text-lg">BỘ LỌC TÌM KIẾM</h2>
      <div className="mt-4">
        <label className="block text-gray-700">Ngân sách:</label>
        <select className="w-full border p-2 rounded mt-1">
          <option>Tất cả</option>
          <option>Dưới 5 triệu</option>
          <option>5 - 10 triệu</option>
          <option>10 - 20 triệu</option>
          <option>Trên 20 triệu</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Điểm đến:</label>
        <select className="w-full border p-2 rounded mt-1">
          <option>Quảng Ninh</option>
          <option>Hà Nội</option>
          <option>Sapa</option>
        </select>
      </div>
      <button className="w-full text-white py-2 rounded font-semibold shadow-md bg-gradient-to-r from-[#89A5C7] to-[#AFD7E6]">
        Áp dụng
      </button>
    </div>
  );
};

const TourList = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-4 gap-6">
      <Sidebar />
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-4">DU LỊCH QUẢNG NINH</h1>
        <p className="text-gray-600">
          Chúng tôi tìm thấy <strong>{tours.length}</strong> chương trình tour cho quý khách
        </p>
        <div className="grid grid-cols-3 gap-6 mt-4">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourList;
