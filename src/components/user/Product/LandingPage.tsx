import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../../../assets/banner_header1.jpg";
import banner2 from "../../../assets/banner_header2.jpg";
import banner3 from "../../../assets/banner_header3.jpg";
import banner4 from "../../../assets/banner_header4.png";
import "./LandingPage.scss";
import { FaStar } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setCartCount } from "../../../redux/slices/cartSlice";
import { getTopSellingProductCategory, addProductToCart, getNumberCart, buyNow} from "../../../services/apiServices";
import { toast } from "react-toastify";
import { FcCellPhone } from "react-icons/fc";
import { ImFire } from "react-icons/im";
import AiChatWidget from "./AiChatWidget"; 
import type { ProductSummary } from "../../../interfaces";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const banners = [banner1, banner2, banner3, banner4];

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [topLaptops, setTopLaptops] = useState<ProductSummary[]>([]);
  const [topPhones, setTopPhones] = useState<ProductSummary[]>([]);

  const [isOpen, setIsOpen] = useState(false); 

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      toast.warning("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    try {
      const res = await addProductToCart(productId);
      
      if (res?.data?.statusCode <400) {
        toast.success("Đã thêm vào giỏ hàng!");
        const cartRes = await getNumberCart();
        console.log('Cart response after add:', cartRes?.data);
        if (cartRes?.data?.statusCode <400 && cartRes?.data?.data!== undefined) {
          dispatch(setCartCount(cartRes.data.data));
        }
      } else {
        toast.error(res?.data?.message || "Không thể thêm vào giỏ hàng");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const handleBuyNow = async (productId: number) => {
    if (!isAuthenticated) {
      toast.warning("Vui lòng đăng nhập để mua sản phẩm!");
      return;
    }

    try {
      const res = await buyNow(productId);
      
      if (res?.data?.statusCode <400) {
        const cartRes = await getNumberCart();
        console.log('Cart response after buy now:', cartRes?.data);
        if (cartRes?.data?.statusCode <400 && cartRes?.data?.data !== undefined) {
          dispatch(setCartCount(cartRes.data.data));
        }
        navigate('/cart');
      } else {
        toast.error(res?.data?.message || "Không thể mua sản phẩm");
      }
    } catch (error) {
      console.error("Error buying now:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 15000);

    const fetchTopSelling = async () => {
      try {
        const [laptopRes, phoneRes] = await Promise.all([
          getTopSellingProductCategory("LAPTOP"),
          getTopSellingProductCategory("PHONE"),
        ]);
        
        if (laptopRes?.data?.statusCode < 400 && Array.isArray(laptopRes.data?.data)) {
          setTopLaptops(laptopRes.data.data);
        } else {
          setTopLaptops([]);
        }

        if (phoneRes?.data?.statusCode < 400 && Array.isArray(phoneRes.data?.data)) {
          setTopPhones(phoneRes.data.data);
        } else {
          setTopPhones([]);
        }
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm bán chạy:", err);
        toast.error("Không thể tải danh sách sản phẩm bán chạy");
      }
    };

    fetchTopSelling();
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`);
  };

  const navigateProduct = () =>{
    navigate('/product');
  }

  const renderProducts = (list: ProductSummary[] = []) =>
    list.map((item) => {
      const imgUrl = item.imageUrl
  ? (item.imageUrl.startsWith("/") ? `${BASE_URL}${item.imageUrl}` : item.imageUrl)
  : "/no-image.png";
      const avgRating = Number(item.avgRating || 0).toFixed(2);
      const totalReviews = item.totalReviews || "0";

      const hasDiscount = item.coupon > 0;
      const newPrice = item.price?.toLocaleString("vi-VN") + "đ";
      const oldPrice = item.originalPrice?.toLocaleString("vi-VN") + "đ";

      return (
        <div key={item.id} className="product-card">
          {hasDiscount && <div className="discount">-{item.coupon}%</div>}
          <img
            src={imgUrl}
            alt={item.name}
            onClick={() => handleNavigate(item.id)}
            style={{ cursor: "pointer" }}
          />
          <div className="info">
            <div className="rating">
              <FaStar className="star"/> {avgRating} <span>({totalReviews})</span>
            </div>
            <h3>{item.name}</h3>
            <div className={`price ${!hasDiscount ? "center" : ""}`}>
              <span className="new">{newPrice}</span>
              {hasDiscount && <span className="old">{oldPrice}</span>}
            </div>

            <div className="actions">
              <button className="add-cart" onClick={() => handleAddToCart(item.id)}>
                Add To Cart
              </button>
              <button className="buy-now" onClick={() => handleBuyNow(item.id)}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="landing-page">
      {/* ===== HERO BANNER ===== */}
      <section className="header__hero">
        <div className="header__hero-content">
          <h4>100% Sản Phẩm Chính Hãng</h4>
          <h1>
            Trải nghiệm khác biệt <br />
            <span>Deal hot mỗi ngày</span>
          </h1>
          <button className="hero-btn" onClick={() => navigateProduct()}>Mua ngay</button>
        </div>
        <div className="header__hero-image">
          <img src={banners[currentBanner]} alt="Banner" />
        </div>
      </section>

      {/* ===== TOP LAPTOP ===== */}
      <section className="bestseller">
        <div className="bestseller__header">
          <h2><ImFire className="fire"/> Top Laptop Bán Chạy</h2>
        </div>
        <div className="bestseller__list">
          {topLaptops.length ? renderProducts(topLaptops) : <p>Đang tải dữ liệu...</p>}
        </div>
      </section>

      {/* ===== TOP PHONE ===== */}
      <section className="bestseller">
        <div className="bestseller__header">
          <h2><FcCellPhone className='phone'/> Top Điện Thoại Bán Chạy</h2>
        </div>
        <div className="bestseller__list">
          {topPhones.length ? renderProducts(topPhones) : <p>Đang tải dữ liệu...</p>}
        </div>
      </section>
      <AiChatWidget isOpen={isOpen} setIsOpen={setIsOpen} /> 
    </div>
  );
};

export default LandingPage;
