import User from '../models/User.js';

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        const adminExists = await User.findOne({ email: adminEmail });

        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }

        await User.create({
            fullName: 'System Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
        });

        console.log('Admin user seeded successfully');
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

export default seedAdmin;
