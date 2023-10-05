import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css"

BuyerPage.propTypes = {};

function BuyerPage(props) {

  const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    const backgroundImageUrl = 'https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696342048/news/xhbc4lojs8gch5zaam8e.png';
    const img = new Image();
    img.src = backgroundImageUrl;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const divWidth = window.innerWidth; // Hoặc chiều rộng của phần tử cha nếu bạn muốn giới hạn kích thước
      const calculatedHeight = divWidth / aspectRatio;
      setDivHeight(calculatedHeight);
    };
  }, []);
  const divStyle = {
    background: `url('https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696342048/news/xhbc4lojs8gch5zaam8e.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: `900px`, // Sử dụng chiều cao tính toán từ JavaScript
  };

  return <div>
    {/* Banner Section */}
    <section>
      <section className="banner" style={divStyle}>
        {/* <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696342048/news/xhbc4lojs8gch5zaam8e.png" alt="Banner" className="banner-image" /> */}

        <div className="row">
          <div className="col-md-6">
            <button className="buttonSection">MUA VÉ NGAY</button>
          </div>
          <div className="col-md-6"></div>
        </div>
      </section>
    </section>
    <section style={{ minHeight: 550 }}>
      <div className="container">
        <h1 className="text-center fw-bolder pt-50">
          TIN TỨC
        </h1>
        <div className="row pt-50">
          {/* Column 1 */}
          <div className="col-md-3">
            <div class="card" style={{ width: 18 + 'rem' }}>
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Sự kiện mở cửa sở thú</h5>
                <p class="card-text">Sở thú sẽ mở cửa cho du khách vào cuối tuần này...</p>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-md-3">
            <div class="card" style={{ width: 18 + 'rem' }}>
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Sự kiện mở cửa sở thú</h5>
                <p class="card-text">Sở thú sẽ mở cửa cho du khách vào cuối tuần này...</p>
              </div>
            </div>
          </div>
          {/* Column 3 */}
          <div className="col-md-3">
            <div class="card" style={{ width: 18 + 'rem' }}>
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Sự kiện mở cửa sở thú</h5>
                <p class="card-text">Sở thú sẽ mở cửa cho du khách vào cuối tuần này...</p>
              </div>
            </div>
          </div>

          {/* Column 4 */}
          <div className="col-md-3">
            <div class="card" style={{ width: 18 + 'rem' }}>
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Sự kiện mở cửa sở thú</h5>
                <p class="card-text">Sở thú sẽ mở cửa cho du khách vào cuối tuần này...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="pt-100">
      <div className="row about-us">
        <div className="col-md-6">
          <div style={{ width: '100%' }}>
            <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
          </div>
        </div>
        <div className="col-md-6">
          <div className="about-us-text">
            <h1>
              VỀ CHÚNG TÔI
            </h1>
            <p>Chào mừng bạn đến với <strong>ANIMALL</strong> - Thiên đàng của thế giới động vật! <strong>ANIMALL</strong> là một sở thú thú vị và đa dạng, nơi bạn có cơ hội thám hiểm và khám phá sự kỳ diệu của các loài động vật. Chúng tôi tự hào là ngôi nhà cho hàng trăm loài động vật từ khắp nơi trên hành tinh, từ những con tinh tế và quyến rũ cho đến những sinh vật hoang dã và huyền bí.</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div>
        <div className="decor-bg row">
          <div className="col-md-3">
            <div className="decor-bg-img-top">
              <img src="https://res.cloudinary.com/dv0jmkfnn/image/upload/v1696499134/news/b9iswyhoqyh9agpdtkqf.jpg" class="card-img-top" alt="..." />
            </div>
            <div className="decor-bg-img-bot">
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
            </div>
          </div>
          <div className="col-md-3">
            <div className="decor-bg-img-top-2">
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
            </div>
            <div className="decor-bg-img-bot-2">
              <img src="https://res.cloudinary.com/dv0jmkfnn/image/upload/v1696499132/news/sno7jdpq1o1sydh54xym.jpg" class="card-img-top" alt="..." />
            </div>
          </div>
          <div className="col-md-3">
            <div className="decor-bg-img-top">
              <img src="https://res.cloudinary.com/dv0jmkfnn/image/upload/v1696499132/news/dyxcck4djxqysdvx6dyv.jpg" class="card-img-top" alt="..." />
            </div>
            <div className="decor-bg-img-bot">
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
            </div>
          </div>
          <div className="col-md-3">
            <div className="decor-bg-img-top-2">
              <img src="https://res.cloudinary.com/dw5ucgy1y/image/upload/v1696334107/news/jku6bumsu9eyjxuvbpy4.png" class="card-img-top" alt="..." />
            </div>
            <div className="decor-bg-img-bot-2">
              <img src="https://res.cloudinary.com/dv0jmkfnn/image/upload/v1696499132/news/cquxj6zjrxfacxrlnicd.jpg" class="card-img-top" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>;
}

export default BuyerPage;
