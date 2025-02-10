import logo from "../../assets/images/logo.png";
import { FaMapMarker } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
function Footer() {
  return (
    <>
      <div className="contanier mx-auto px-[6rem] pt-[20px] pb-[50px] bg-[#f5f5f5] flex">
        <div className="flex flex-col justify-center items-start w-[40%] px-[10px] border-r-[1px] border-r-[#ddd]">
          <div className="flex items-center justify-center mb-[15px]">
            <img src={logo} className="w-[8rem] mr-[5px]" />
            <span className="text-[#d2370c] font-bold text-[2rem]">HOKO</span>
          </div>
          <div className="mb-[15px]">
            <p className="text-[0.9rem]">
              HOKO là nhà sách uy tín, cung cấp đa dạng sách từ văn học, kỹ năng, khoa học đến chuyên ngành IT,
              giúp bạn mở rộng kiến thức và phát triển bản thân.
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tiện lợi, chất lượng và dịch vụ tận tâm.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="flex items-center justify-center mb-[6px]">
              <FaMapMarker className="mr-[5px]" />
              <span className="text-[0.9rem]">R639+HM2, Khu đô thị mới, Quy Nhơn, Bình Định 55117</span>
            </div>
            <div className="flex items-center justify-center mb-[6px]">
              <CiMail className="mr-[5px]" />
              <span className="text-[0.9rem]">hieuldqe180112@fpt.edu.vn</span>
            </div>
            <div className="flex items-center justify-center mb-[6px]">
              <FaPhoneVolume className="mr-[5px]" />
              <span className="text-[0.9rem]">+84 344 258 554</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-[60%] pl-[50px] gap-y-[20px]">
          <div className="flex items-center justify-around w-full">
            <div className="flex flex-col w-1/2 gap-y-[10px]">
              <h1 className="font-bold">DỊCH VỤ</h1>
              <Link to="#" className="text-[0.9rem]">Giới thiệu Hoko</Link>
              <Link to="#" className="text-[0.9rem]">Chính sách bảo mật thông tin cá nhân</Link>
            </div>
            <div className="flex flex-col w-1/2 gap-y-[10px]">
              <h1 className="font-bold">HỖ TRỢ</h1>
              <Link to="#" className="text-[0.9rem]">Chính sách trả - mượn</Link>
              <Link to="#" className="text-[0.9rem]">Chính sách phạt</Link>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div><FaFacebook className="text-[2rem] mr-[20px]"/></div>
            <div><SiZalo className="text-[2rem]"/></div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Footer;