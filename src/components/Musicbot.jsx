import React, { useState, useEffect, useRef } from 'react';

const rules = [
  { keys: /hello|hi|hey|greet/i,                        reply: "Hello! Welcome to Music Base 🎵 I can help you with instruments, pricing, and music lessons. What are you looking for?" },
  { keys: /guitar|acoustic/i,                           reply: "We have acoustic guitars starting from Ksh 5,000. Want to know about guitar lessons too?" },
  { keys: /electric.*piano|electric.*keyboard/i,        reply: "Electric keyboards start from Ksh 18,000. We also offer keyboard lessons from Ksh 1,000/week!" },
  { keys: /piano|keyboard|keys/i,                       reply: "Keyboards start from Ksh 12,000. Electric keyboards from Ksh 18,000. Piano lessons available at Ksh 1,200/week!" },
  { keys: /drum set|drum kit/i,                         reply: "Drum sets range from Ksh 15,000 to Ksh 80,000. We also have drum lessons at Ksh 1,000/week." },
  { keys: /drumstick|sticks/i,                          reply: "Drumsticks cost Ksh 500 to Ksh 1,500." },
  { keys: /drum|percussion/i,                           reply: "Drum sets range from Ksh 15,000 to Ksh 80,000. Drumsticks cost Ksh 500–1,500. Drum lessons at Ksh 1,000/week." },
  { keys: /violin|bow/i,                                reply: "Violins are available from Ksh 8,000. Violin lessons at Ksh 1,200/week — great for bow technique and string control." },
  { keys: /trumpet|horn/i,                              reply: "Trumpets cost around Ksh 10,000 to Ksh 35,000. Trumpet lessons are Ksh 1,500/week — great for breathing control." },
  { keys: /saxophone|sax|jazz/i,                        reply: "Saxophones start from Ksh 25,000. Saxophone jazz lessons available at Ksh 2,000/week — perfect for expression." },
  { keys: /flute|woodwind|pipe/i,                       reply: "Flutes are available from Ksh 3,000. Flute lessons at Ksh 1,000/week focus on air and breath control." },
  { keys: /clarinet|reed/i,                             reply: "Clarinets cost around Ksh 12,000. Clarinet lessons at Ksh 1,200/week focus on tone and reed technique." },
  { keys: /trombone|slide/i,                            reply: "Trombones start from Ksh 20,000. Trombone slide lessons are Ksh 1,500/week — great for pitch control." },
  { keys: /tuba/i,                                      reply: "Tubas cost from Ksh 40,000 and above. Tuba training is Ksh 2,000/week, great for band support." },
  { keys: /microphone|mic/i,                            reply: "Microphones start from Ksh 2,500. Studio recording gear kits start from Ksh 20,000." },
  { keys: /amplifier|amp/i,                             reply: "Amplifiers range from Ksh 8,000 depending on brand and power output." },
  { keys: /headphones|audio/i,                          reply: "Headphones start from Ksh 1,500. Great for practice monitoring!" },
  { keys: /speaker|sound system/i,                      reply: "Speakers range from Ksh 5,000 and above depending on size and output." },
  { keys: /music stand|note stand/i,                    reply: "Music stands cost around Ksh 2,000." },
  { keys: /keyboard stand/i,                            reply: "Keyboard stands cost Ksh 3,000." },
  { keys: /stand|holder|support/i,                      reply: "Music stands cost Ksh 2,000. Keyboard stands cost Ksh 3,000." },
  { keys: /strap/i,                                     reply: "Guitar straps cost Ksh 300–1,000. A must-have for comfortable playing!" },
  { keys: /case|bag|box/i,                              reply: "Instrument cases start from Ksh 2,000. We have options for most instrument types." },
  { keys: /pedal|foot/i,                                reply: "Drum pedals cost around Ksh 2,500." },
  { keys: /nylon.*string|string.*nylon|guitar string/i, reply: "Guitar strings (nylon) cost around Ksh 800 per set." },
  { keys: /studio|record/i,                             reply: "Studio kits start from Ksh 20,000. Studio recording lessons are Ksh 2,500/week." },
  { keys: /band/i,                                      reply: "Group band training is Ksh 1,500/week — great for teamwork. Band setups depend on instruments selected." },
  { keys: /offer|discount|deal|promo/i,                 reply: "Yes! We have weekly discounts and bundle deals. Ask about combo packages for instruments + lessons." },
  { keys: /theory|sheet music|read.*music/i,            reply: "Music theory lessons are Ksh 1,200/week. Sheet music reading is Ksh 1,000/week." },
  { keys: /beginner|basics|start/i,                     reply: "Music basics for beginners are Ksh 1,000/week. Kids music lessons are Ksh 800/week. Great place to start!" },
  { keys: /kids|child|children|young/i,                 reply: "Kids music lessons are Ksh 800/week — perfect for young beginners!" },
  { keys: /online|digital|virtual/i,                    reply: "Yes, we offer online music classes at Ksh 1,000/week — flexible and convenient from anywhere." },
  { keys: /stage|perform|show/i,                        reply: "Stage performance coaching is Ksh 2,000/week — great for building confidence before shows." },
  { keys: /advance|master|improve|skill/i,              reply: "Advanced instrument mastery lessons are Ksh 2,000/week — ideal for players who want to reach the next level." },
  { keys: /practice|timing|rhythm/i,                    reply: "Daily practice sessions are Ksh 800/week. Rhythm training is also Ksh 800/week — great for timing." },
  { keys: /song/i,                                      reply: "Song breakdown lessons are Ksh 1,000/week — great for learning full songs and preparing for performance." },
  { keys: /lesson|learn|class|teach|course|train/i,     reply: "We offer lessons for guitar (Ksh 1,000/wk), piano (Ksh 1,200/wk), drums (Ksh 1,000/wk), violin (Ksh 1,200/wk), saxophone (Ksh 2,000/wk), flute (Ksh 1,000/wk), and many more!" },
  { keys: /rent|hire/i,                                 reply: "We offer an instrument rental service! Contact us for availability and rental pricing on specific instruments." },
  { keys: /price|cost|how much|ksh/i,                   reply: "We have instruments across all budgets! Flutes from Ksh 3,000, guitars from Ksh 5,000, pianos from Ksh 12,000, and more. What instrument interests you?" },
  { keys: /music base|what do you offer|what.*offer/i,  reply: "Music Base is your one-stop music shop! We offer: online music store, instrument rental, music lesson booking, tutor marketplace, virtual instrument shop, and a beginner learning platform." },
];

const SUGGESTIONS = [
  "I want a guitar",
  "How much is a drum set?",
  "I need piano lessons",
  "Do you have offers?",
  "Violin price?",
  "Online classes?",
  "Beginner lessons",
  "What does Music Base offer?",
];

const getReply = (text) => {
  for (const rule of rules) {
    if (rule.keys.test(text)) return rule.reply;
  }
  return "I'm not sure about that. Please visit our shop or contact us directly for more details. We're happy to help! 🎵";
};

const Musicbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { who: 'bot', text: "Hello! Welcome to Music Base 🎵 Ask me about instruments, pricing, or music lessons. How can I help you today?", id: 0 },
  ]);
  const [input, setInput]         = useState('');
  const [typing, setTyping]       = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef             = useRef(null);
  const inputRef                   = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    setInput('');
    setShowChips(false);

    const userMsg = { who: 'user', text: trimmed, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { who: 'bot', text: getReply(trimmed), id: Date.now() + 1 }]);
    }, 750);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') send();
  };

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 1055,
          backdropFilter: 'blur(2px)',
        }}
      />

      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '360px', maxWidth: '95vw', height: '100vh',
        background: '#fff', zIndex: 1060,
        display: 'flex', flexDirection: 'column',
        boxShadow: '6px 0 32px rgba(0,0,0,0.18)',
        animation: 'slideInLeft 0.28s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #1a7a4a 0%, #25a065 100%)',
          color: '#fff', display: 'flex', alignItems: 'center',
          gap: '12px', flexShrink: 0,
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
          }}>🎵</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '15px' }}>Music Base Assistant</p>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.85 }}>
              <span style={{
                display: 'inline-block', width: '7px', height: '7px',
                borderRadius: '50%', background: '#7fff9a',
                marginRight: '5px', verticalAlign: 'middle',
              }} />
              Online
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff',
            borderRadius: '50%', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '18px', lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '10px',
          background: '#f6f8f6',
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{
              display: 'flex',
              justifyContent: msg.who === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end', gap: '8px',
            }}>
              {msg.who === 'bot' && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: '#1a7a4a', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '13px', flexShrink: 0,
                }}>🎵</div>
              )}
              <div style={{
                maxWidth: '78%', padding: '10px 14px',
                borderRadius: msg.who === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.who === 'user' ? '#1a7a4a' : '#fff',
                color: msg.who === 'user' ? '#fff' : '#1a1a1a',
                fontSize: '14px', lineHeight: 1.55,
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}>{msg.text}</div>
              {msg.who === 'user' && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: '#1a7a4a', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff', fontSize: '12px',
                  fontWeight: 700, flexShrink: 0,
                }}>U</div>
              )}
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#1a7a4a', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '13px', flexShrink: 0,
              }}>🎵</div>
              <div style={{
                padding: '12px 16px', background: '#fff',
                borderRadius: '18px 18px 18px 4px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#1a7a4a', display: 'inline-block',
                    animation: `typingBounce 1.2s infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {showChips && (
            <div style={{ marginTop: '8px' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Quick suggestions:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)} style={{
                    padding: '5px 11px', borderRadius: '14px',
                    border: '1px solid #1a7a4a', background: '#fff',
                    color: '#1a7a4a', fontSize: '12px', cursor: 'pointer',
                    fontWeight: 500, transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#e8f5ee'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
                  >{s}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid #e8e8e8',
          background: '#fff', display: 'flex', gap: '8px',
          alignItems: 'center', flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about instruments, prices, lessons…"
            style={{
              flex: 1, padding: '10px 16px', borderRadius: '22px',
              border: '1.5px solid #d0d0d0', fontSize: '14px',
              outline: 'none', color: '#1a1a1a', background: '#f6f8f6',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = '#1a7a4a'; }}
            onBlur={e => { e.target.style.borderColor = '#d0d0d0'; }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: input.trim() ? '#1a7a4a' : '#ccc',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s, transform 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { if (input.trim()) e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
};

export default Musicbot;