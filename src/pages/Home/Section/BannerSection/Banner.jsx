import { useKeenSlider } from 'keen-slider/react';
import './Banner.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );
  return (
    <>
      <div
        ref={sliderRef}
        className="keen-slider rounded-[4px] h-[50vh] md:h-[80vh]"
      >
        <div className="keen-slider__slide number-slide1 px-6 lg:px-20 py-20 ">
          <div className=" ">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-stone-200 leading-tight uppercase">
              Maximize <br /> Productivity, <br /> Minimize Hassle <br /> Your
              Asset Management <br /> Companion.
            </h2>
            <Link to="/signupAsEmployee">
              <button className="bg-darkBlue font-semibold hover:bg-blue duration-150 text-white text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 mt-6  rounded-sm uppercase">
                Join As An Employee
              </button>
            </Link>
          </div>
        </div>
        <div className="keen-slider__slide number-slide2 px-6 lg:px-20 py-20">
          <div className="  ">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-stone-200 leading-tight uppercase">
              Transformative <br /> Asset Control <br /> for Organizational{' '}
              <br />
              Success
            </h2>
            <Link to="/signupAsHR">
              <button className="bg-darkBlue font-semibold hover:bg-blue duration-150 text-white text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2 mt-6  rounded-sm uppercase">
                Join As HR
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
