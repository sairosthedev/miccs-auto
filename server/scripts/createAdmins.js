require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function createAdmins() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const admins = [
    {
      username: 'admin1@miccsauto.com',
      password: 'admin123',
      email: 'admin1@miccsauto.com',
      role: 'admin',
      phone: '1234567890',
    },
    {
      username: 'admin2@miccsauto.com',
      password: 'admin456',
      email: 'admin2@miccsauto.com',
      role: 'admin',
      phone: '0987654321',
    },
  ];

  for (const admin of admins) {
    const exists = await User.findOne({ email: admin.email });
    if (!exists) {
      await User.create(admin);
      console.log(`Created admin: ${admin.email}`);
    } else {
      console.log(`Admin already exists: ${admin.email}`);
    }
  }

  await mongoose.disconnect();
  process.exit();
}

createAdmins().catch((err) => {
  console.error(err);
  process.exit(1);
}); 