"use client";

import { Mail, PhoneCall } from "lucide-react";

// Contact — Apple-style light form on a white canvas. Copy kept exactly as given.
export default function ContactPage() {
  return (
    <main className="cu">
      <style>{`
        .cu {
          background: #ffffff;
          width: 100vw;
          min-height: 100vh;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(72px, 11vh, 140px) clamp(20px, 6vw, 88px) clamp(72px, 12vh, 140px);
          font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
          color: #1d1d1f;
          display: flex;
          justify-content: center;
        }
        .cu-inner { width: 100%; max-width: 720px; }

        .cu-eyebrow {
          margin: 0;
          text-align: center;
          color: #148042;
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .cu-title {
          margin: clamp(10px, 1.4vw, 16px) 0 0;
          text-align: center;
          color: #1d1d1f;
          font-size: clamp(36px, 5.6vw, 68px);
          font-weight: 600;
          line-height: 1.04;
          letter-spacing: -0.03em;
        }
        .cu-sub {
          margin: clamp(12px, 1.6vw, 18px) 0 0;
          text-align: center;
          color: #6e6e73;
          font-size: clamp(16px, 1.5vw, 20px);
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .cu-form {
          margin-top: clamp(36px, 5vw, 56px);
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2vw, 24px);
        }
        .cu-field { display: flex; flex-direction: column; gap: 8px; }
        .cu-label {
          color: #6e6e73;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .cu-input {
          box-sizing: border-box;
          width: 100%;
          background: #f5f5f7;
          border: 1px solid transparent;
          border-radius: 12px;
          padding: 15px 18px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 400;
          color: #1d1d1f;
          outline: none;
          transition: border-color 200ms ease, background 200ms ease,
            box-shadow 200ms ease;
        }
        .cu-input::placeholder { color: #a1a1a6; }
        .cu-input:focus {
          background: #ffffff;
          border-color: #148042;
          box-shadow: 0 0 0 4px rgba(20, 128, 66, 0.12);
        }
        .cu-textarea { resize: vertical; min-height: 132px; line-height: 1.5; }

        .cu-submit {
          box-sizing: border-box;
          margin-top: clamp(8px, 1vw, 14px);
          width: 100%;
          background: #1d1d1f;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          padding: 18px;
          font-family: inherit;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background 200ms ease, transform 200ms ease;
        }
        .cu-submit:hover { background: #000000; transform: translateY(-1px); }
        .cu-submit:active { transform: translateY(0); }

        /* Contact info cards */
        .cu-contact { margin-top: clamp(48px, 7vw, 88px); }
        .cu-contact-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 clamp(18px, 2vw, 26px);
        }
        .cu-contact-emoji { font-size: clamp(20px, 2vw, 26px); line-height: 1; }
        .cu-contact-title {
          margin: 0;
          color: #1d1d1f;
          font-size: clamp(22px, 2.4vw, 30px);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .cu-cards {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vw, 22px);
        }
        .cu-card {
          box-sizing: border-box;
          border: 1px solid #e6e6e9;
          border-radius: 16px;
          background: #fbfbfd;
          padding: clamp(22px, 2.6vw, 30px);
          display: flex;
          flex-direction: column;
          gap: clamp(26px, 4vw, 44px);
        }
        .cu-card-icon { width: 26px; height: 26px; color: #1d1d1f; }
        .cu-card-text { display: flex; flex-direction: column; gap: 8px; }
        .cu-card-label {
          margin: 0;
          color: #6e6e73;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .cu-card-value {
          color: #1d1d1f;
          font-size: clamp(16px, 1.4vw, 19px);
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          width: fit-content;
          transition: color 200ms ease;
        }
        .cu-card-value:hover { color: #148042; }
      `}</style>

      <div className="cu-inner">
        <p className="cu-eyebrow">Contact Us</p>
        <h1 className="cu-title">Looking to Order or Customize?</h1>
        <p className="cu-sub">
          Tell us your requirement and our team will reach out to you on priority
        </p>

        <form className="cu-form" onSubmit={(e) => e.preventDefault()}>
          <div className="cu-field">
            <label className="cu-label" htmlFor="cu-name">
              Name
            </label>
            <input
              className="cu-input"
              id="cu-name"
              name="name"
              type="text"
              placeholder="Jane Smith"
            />
          </div>

          <div className="cu-field">
            <label className="cu-label" htmlFor="cu-email">
              Email
            </label>
            <input
              className="cu-input"
              id="cu-email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="cu-field">
            <label className="cu-label" htmlFor="cu-phone">
              Phone Number
            </label>
            <input
              className="cu-input"
              id="cu-phone"
              name="phone"
              type="tel"
              placeholder="Enter your number"
            />
          </div>

          <div className="cu-field">
            <label className="cu-label" htmlFor="cu-requirement">
              Tell Us Your Requirement
            </label>
            <textarea
              className="cu-input cu-textarea"
              id="cu-requirement"
              name="requirement"
              rows={5}
              placeholder="I need.."
            />
          </div>

          <button type="submit" className="cu-submit">
            Submit
          </button>
        </form>

        <section className="cu-contact" aria-label="Email Us">
          <div className="cu-contact-head">
            <span className="cu-contact-emoji" aria-hidden>
              📧
            </span>
            <h2 className="cu-contact-title">Email Us</h2>
          </div>

          <div className="cu-cards">
            <div className="cu-card">
              <Mail className="cu-card-icon" strokeWidth={1.8} aria-hidden />
              <div className="cu-card-text">
                <p className="cu-card-label">Email</p>
                <a className="cu-card-value" href="mailto:info@mrhtech.in">
                  info@mrhtech.in
                </a>
              </div>
            </div>

            <div className="cu-card">
              <PhoneCall className="cu-card-icon" strokeWidth={1.8} aria-hidden />
              <div className="cu-card-text">
                <p className="cu-card-label">Call or Whatsapp Us</p>
                <a className="cu-card-value" href="tel:9996999260">
                  9996-999-260
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
