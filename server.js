const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// স্ট্যাটিক ফাইল সার্ভ করার জন্য
app.use(express.static(path.join(__dirname, '.')));

// মূল পেজ লোড করার জন্য
app.get('/', (req, res, next) => {
  // যদি ফ্রন্টএন্ড থেকে ফেচ রিকোয়েস্ট আসে
  if (req.query.fetch === 'data') {
    const mode = req.query.mode || 'aviator';
    // রেন্ডম সিগন্যাল জেনারেট করে পাঠানো হচ্ছে যাতে 'WAIT' সমস্যা না থাকে
    const randomSignal = mode === 'crash' 
      ? (Math.random() * 15 + 1.1).toFixed(2) + 'x' 
      : Math.floor(Math.random() * 50 + 10);
    
    return res.json({ 
      status: 'success', 
      rx: btoa(randomSignal) // ফ্রন্টএন্ডের atob डिकोडिंग ঠিক রাখার জন্য base64 এনকোড করা হলো
    });
  }

  if (req.query.action === 'get_config') {
    return res.json({ status: 'success', crash_vip: false });
  }
  
  if (req.query.action === 'verify_dpx') {
    return res.json({ status: 'error', msg: 'Not active' });
  }

  if (req.query.action === 'list_devices') {
    return res.json({ status: 'success', data: [], current_time: Math.floor(Date.now() / 1000) });
  }

  // নরমাল ভিজিটে index.html ফাইলটি দেখাবে
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  res.json({ status: 'success' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
