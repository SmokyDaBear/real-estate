export function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Agent</h2>
      <div className="form-grid">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label className="full-width">
          Message:
          <textarea name="message" required></textarea>
        </label>
      </div>
      <button type="submit">Send</button>
    </form>
  );
}
export function ContactFormFull() {
  return (
    <form>
      <h1>Contact</h1>
      <p>Get in touch with our agents for more information.</p>
      <div className="form-grid">
        <p>Let's get some contact information from you:</p>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" />
        </label>
        <label>
          Preferred Contact Method:
          <select name="contact-method" required>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </label>
        <label className="full-width">
          Message:
          <textarea name="message" required></textarea>
        </label>
      </div>
      <div className="form-grid">
        <p>What are you interested in?</p>
        <div className="form-selections">
          <label>
            <input type="radio" name="interest" value="buy" />
            <span></span> Buying a Home
          </label>
          <label>
            <input type="radio" name="interest" value="sell" />
            <span></span> Selling a Home
          </label>
          <label>
            <input type="radio" name="interest" value="general" />
            <span></span> General Inquiry
          </label>
        </div>
      </div>
      <div className="form-info">
        <p>
          Our agents will get back to you within 1-3 business days. We look
          forward to assisting you!
        </p>
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
