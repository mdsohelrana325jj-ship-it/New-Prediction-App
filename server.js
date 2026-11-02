const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// মিডলওয়্যার
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// স্ট্যাটিক ফাইল সার্ভ করার জন্য
app.use(express.static(path.join(__dirname, '.')));

// হোমপেজ রাউট
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// সিগন্যাল ফেচ করার ডামি এপিআই (যা আপনার 'WAIT' সমস্যা দূর করবে)
app.get('/', (req, res) => {
  if (req.query.fetch === 'data') {
    return res.json({ 
      status: 'success', 
      rx: (Math.random() * 20 + 1).toFixed(2) 
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
});

// পোস্ট রিকোয়েস্টগুলোর জন্য ডামি হ্যান্ডলার
app.post('/', (req, res) => {
  res.json({ status: 'success' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
