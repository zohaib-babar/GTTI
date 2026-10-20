
import React from "react";

const Footer = () => {
  const styles = `
    .zohaib-footer {
      position: relative;
      overflow: hidden;
      width: 100%;
      color: #f8fafc;
      background:
        radial-gradient(ellipse at center, #172332 0%, transparent 75%),
        linear-gradient(110deg, #070c13, #111c29, #070c13);
      border-top: 1px solid rgba(224, 177, 82, 0.45);
      border-bottom: 1px solid rgba(224, 177, 82, 0.2);
      font-family: Arial, Helvetica, sans-serif;
      box-sizing: border-box;
    }

    .zohaib-footer *,
    .zohaib-footer *::before,
    .zohaib-footer *::after {
      box-sizing: border-box;
    }

    .zohaib-footer::before,
    .zohaib-footer::after {
      content: "";
      position: absolute;
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #d6a64c, #ffe2a0);
      transform: rotate(-48deg);
      pointer-events: none;
    }

    .zohaib-footer::before {
      left: -25px;
      top: 32px;
    }

    .zohaib-footer::after {
      right: -25px;
      bottom: 32px;
    }

    .zohaib-footer .footer-content {
      width: min(100% - 48px, 1440px);
      min-height: 132px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .zohaib-footer .footer-brand {
      display: flex;
      align-items: center;
      gap: 22px;
      min-width: 0;
    }

    .zohaib-footer .footer-logo {
      width: 78px;
      height: 78px;
      object-fit: contain;
      flex-shrink: 0;
      filter: drop-shadow(0 0 8px rgba(242, 184, 78, 0.2));
      transition: transform 0.3s ease;
    }

    .zohaib-footer .footer-logo:hover {
      transform: scale(1.06);
    }

    .zohaib-footer .footer-divider,
    .zohaib-footer .right-divider {
      width: 2px;
      flex-shrink: 0;
      background: linear-gradient(
        to bottom,
        transparent,
        #e6b85c,
        #ffe5a4,
        transparent
      );
    }

    .zohaib-footer .footer-divider {
      height: 65px;
    }

    .zohaib-footer .footer-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .zohaib-footer .footer-subtitle {
      margin: 0;
      color: #d1d5db;
      font-size: 15px;
      font-weight: 400;
    }

    .zohaib-footer .footer-name {
      margin: 0;
      font-size: clamp(23px, 2.2vw, 32px);
      line-height: 1.2;
      font-weight: 700;
      letter-spacing: 7px;
      background: linear-gradient(
        110deg,
        #d49a35,
        #fff0b0,
        #e3ac48,
        #fff1bf
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .zohaib-footer .footer-right {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .zohaib-footer .react-credit {
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .zohaib-footer .react-icon {
      width: 40px;
      height: 40px;
      color: #edbd63;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .zohaib-footer .react-icon:hover {
      transform: rotate(20deg);
    }

    .zohaib-footer .right-divider {
      height: 40px;
    }

    .zohaib-footer .react-credit p {
      margin: 0;
      color: #f1f5f9;
      font-size: 15px;
      white-space: nowrap;
    }

    .zohaib-footer .react-credit p span {
      color: #f2c46c;
      font-weight: 700;
    }

    .zohaib-footer .back-to-top {
      display: grid;
      place-items: center;
      width: 52px;
      height: 52px;
      flex-shrink: 0;
      border: 1px solid #e7b858;
      border-radius: 12px;
      background: rgba(8, 14, 22, 0.85);
      color: #f5cd78;
      cursor: pointer;
      box-shadow: 0 0 14px rgba(231, 184, 88, 0.12);
      transition: all 0.3s ease;
    }

    .zohaib-footer .back-to-top:hover {
      background: #e7b858;
      color: #080d14;
      transform: translateY(-4px);
      box-shadow: 0 0 22px rgba(231, 184, 88, 0.3);
    }

    .zohaib-footer .back-to-top:focus-visible {
      outline: 2px solid #fff0b0;
      outline-offset: 4px;
    }

    @media (max-width: 900px) {
      .zohaib-footer .footer-content {
        width: calc(100% - 32px);
        min-height: 112px;
        gap: 14px;
      }

      .zohaib-footer .footer-brand {
        gap: 13px;
      }

      .zohaib-footer .footer-logo {
        width: 60px;
        height: 60px;
      }

      .zohaib-footer .footer-divider {
        height: 50px;
      }

      .zohaib-footer .footer-subtitle,
      .zohaib-footer .react-credit p {
        font-size: 12px;
      }

      .zohaib-footer .footer-name {
        font-size: 23px;
        letter-spacing: 4px;
      }

      .zohaib-footer .footer-right {
        gap: 14px;
      }

      .zohaib-footer .react-credit {
        gap: 10px;
      }

      .zohaib-footer .react-icon {
        width: 30px;
        height: 30px;
      }

      .zohaib-footer .right-divider {
        height: 32px;
      }

      .zohaib-footer .back-to-top {
        width: 42px;
        height: 42px;
      }
    }

    @media (max-width: 600px) {
      .zohaib-footer .footer-content {
        width: calc(100% - 28px);
        padding: 20px 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 22px;
      }

      .zohaib-footer .footer-logo {
        width: 56px;
        height: 56px;
      }

      .zohaib-footer .footer-subtitle {
        font-size: 12px;
      }

      .zohaib-footer .footer-name {
        font-size: 22px;
        letter-spacing: 4px;
      }

      .zohaib-footer .footer-right {
        width: 100%;
        justify-content: space-between;
      }

      .zohaib-footer .react-credit p {
        font-size: 13px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .zohaib-footer .footer-logo,
      .zohaib-footer .react-icon,
      .zohaib-footer .back-to-top {
        transition: none;
      }
    }
  `;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{styles}</style>

      <footer className="zohaib-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src="/zohaib-logo.png"
              alt="Zohaib Logo"
              className="footer-logo"
            />

            <div className="footer-divider" />

            <div className="footer-info">
              <p className="footer-subtitle">
                Designed &amp; Developed by
              </p>
              <h2 className="footer-name">ZOHAIB</h2>
            </div>
          </div>

          <div className="footer-right">
            <div className="react-credit">
              <svg
                className="react-icon"
                viewBox="-11.5 -10.2 23 20.4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="React"
              >
                <circle r="2" fill="currentColor" />
                <g
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <ellipse rx="11" ry="4.2" />
                  <ellipse
                    rx="11"
                    ry="4.2"
                    transform="rotate(60)"
                  />
                  <ellipse
                    rx="11"
                    ry="4.2"
                    transform="rotate(120)"
                  />
                </g>
              </svg>

              <div className="right-divider" />

              <p>
                Built with <span>React</span>
              </p>
            </div>

            <button
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
            >
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 14 6-6 6 6" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
