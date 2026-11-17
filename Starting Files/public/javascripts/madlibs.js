import React from 'react';
import { createRoot } from 'react-dom/client';

const FormComponent = () => {
  const [formData, setFormData] = React.useState({
    clothing: '',
    female1: '',
    female2: '',
    male1: '',
    male2: '',
    plural: '',
  });

  const [message, setMessage] = React.useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendStuff = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/madlibs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessage(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div>
      <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: 'bold' }}>
        ITEMS FROM A GOSSIP COLUMN
      </h1>

      <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
        Input Your Word Choices:
      </h3>

      <form onSubmit={sendStuff}>
        <div style={{ marginBottom: '4px' }}>
          <label>Article of Clothing </label>
          <input
            type="text"
            name="clothing"
            value={formData.clothing}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '4px' }}>
          <label>Female Person You Know #1 </label>
          <input
            type="text"
            name="female1"
            value={formData.female1}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '4px' }}>
          <label>Female Person You Know #2 </label>
          <input
            type="text"
            name="female2"
            value={formData.female2}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '4px' }}>
          <label>Male Person You Know #1 </label>
          <input
            type="text"
            name="male1"
            value={formData.male1}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '4px' }}>
          <label>Male Person You Know #2 </label>
          <input
            type="text"
            name="male2"
            value={formData.male2}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label>Plural Noun </label>
          <input
            type="text"
            name="plural"
            value={formData.plural}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="See the Results!" />
      </form>

      {/* Render the gossip story when the response is returned */}
      {message && (
        <div style={{ marginTop: '20px', maxWidth: '420px', lineHeight: '1.4' }}>
          <div style={{ marginBottom: '15px' }}>
            <img 
              src="/images/gossip.gif" 
              alt="Gossip icon" 
              style={{ width: '80px', height: 'auto' }}
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          </div>

          <p style={{ margin: '0 0 16px 0' }}>
            {message.female1} and her ex-husband {message.male1} were seen last night at the Twnty-Three club holding. {message.plural}
          </p>

          <p style={{ margin: '0 0 16px 0' }}>
            Could it be reconcilliation? The international heartthrob, {message.male2} and the glamorous top model {message.female2} are expecting their first baby in November.
          </p>

          <p style={{ margin: '0 0 16px 0' }}>
            {message.female2} is denying stork rumors, but yesterday she was buying a maternity {message.clothing}
          </p>
        </div>
      )}
    </div>
  );
};

const form = createRoot(document.getElementById('form'));
form.render(<FormComponent />);