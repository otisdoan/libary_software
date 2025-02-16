import { Carousel } from "antd";
import p1 from "../../assets/images/DinhTi_0225_840x320.webp"
import p2 from "../../assets/images/MCBooks_Vangt2_840x320.webp"
import p3 from "../../assets/images/thanhguomduyetquy1124_840x320.webp"
import p4 from "../../assets/images/valentine_t2_840x320.webp"
import p5 from "../../assets/images/thanhtoankhongtienmat_t2_840x320.webp"
import p6 from "../../assets/images/UuDai_T2_392x156_1.webp"
import p7 from "../../assets/images/Fahasa_Onine_392x156.webp"
function HomeCarousel() {
    return (
        <>
            <div className="flex items-center justify-center gap-x-1 mt-[50px]">
                <div className="w-[70%] h-full">
                    <Carousel arrows infinite={true} autoplay >
                        <div>
                            <img src={p1} className="w-full text-center h-full" />
                        </div>
                        <div className="w-full">
                            <img src={p2} className="w-full text-center h-full"/>
                        </div>
                        <div className="w-full">
                            <img src={p3} className="w-full text-center h-full"/>
                        </div >
                        <div className="w-full">
                            <img src={p4} className="w-full text-center h-full"/>
                        </div>
                        <div className="w-full">
                            <img src={p5} className="w-full text-center h-full"/>
                        </div>
                    </Carousel>
                </div>
                <div className="w-[30%] flex flex-col gap-y-[20px]">
                    <img src={p6} className="h-full w-full"/>
                    <img src={p7} className="w-full h-full"/>
                </div>
            </div>
        </>
    )
}
export default HomeCarousel;