
import { useEffect, useState } from 'react';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    tag: 'عرض جديد',
    title: 'أشهى الأكلات الشعبية من الشيف نونوه',
    subtitle: 'خصم 25% على الكشري كل يوم جمعة، اطلب من الموقع',
    background: 'linear-gradient(110deg, #c8321e, #f2761e)',
    image: '/images/banners/banner-1.jpg',
  },
  {
    id: 2,
    tag: 'جديد',
    title: 'الحواوشي بالجبنة وصل!',
    subtitle: 'جرّب الصنف الجديد الآن',
    background: 'linear-gradient(110deg, #7a2a12, #d9731c)',
    image: '/images/banners/banner-2.jpg',
  },
  {
    id: 3,
    tag: 'وفّر أكتر',
    title: 'وجبة العيلة بـ 199 جنيه',
    subtitle: 'كشري + كبدة + حواوشي + مشروبات',
    background: 'linear-gradient(110deg, #a42616, #e0a020)',
    image: '/images/banners/banner-3.jpg',
  },
];

function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider" aria-label="عروض الشيف نونوه">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
          style={{
            backgroundImage: `url("${slide.image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden={index !== activeSlide}
        >
          <div className="hero-content">
            <span className="hero-tag">{slide.tag}</span>

            {index === 0 ? (
              <h1>{slide.title}</h1>
            ) : (
              <h2>{slide.title}</h2>
            )}

            <p>{slide.subtitle}</p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-circle" />
          </div>
        </div>
      ))}

      <div className="hero-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
            aria-label={`الانتقال إلى العرض ${index + 1}`}
            aria-current={index === activeSlide ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
