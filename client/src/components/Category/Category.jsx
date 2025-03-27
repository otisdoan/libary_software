import kinhte from '../../assets/images/kinhte.jpg';
import ngoaivan from '../../assets/images/ngoaivan.jpg';
import tamlykynang from '../../assets/images/tamlykynang.jpg';
import thieunhi from '../../assets/images/thieunhi.jpg';
import vanhoc from '../../assets/images/vanhoc.jpg';
import ngoaingu from '../../assets/images/ngoaingu.jpg';
import dammy from '../../assets/images/dammy.jpg';
function Category() {

    return (
        <>
            <div className="bg-white rounded-md my-4 p-4">
                <h1 className="font-bold mb-[20px]">Khám phá theo danh mục </h1>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <img src={kinhte} className='w-[120px]'/>
                        <span>Kinh tế</span>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <img src={ngoaivan} className='w-[120px]'/>
                        <span>Ngoại văn </span>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <img src={tamlykynang} className='w-[120px]'/>
                        <span>Tâm lý - Kỹ năng</span>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <img src={vanhoc} className='w-[120px]'/>
                        <span>Văn học</span>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <img src={thieunhi} className='w-[120px]'/>
                        <span>Thiếu nhi</span>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <img src={ngoaingu} className='w-[120px]'/>
                        <span>Sách học ngoại ngữ</span>
                    </div>
                    <div className='flex flex-col gap-y-2 items-center'>
                        <img src={dammy} className='w-[120px]'/>
                        <span>Đam mỹ</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Category;