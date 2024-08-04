// Middleware untuk memeriksa otentikasi pengguna
function isAuthenticated(req, res, next) {
    // Tambahkan logika untuk memeriksa apakah pengguna sudah terautentikasi
    // Misalnya, jika menggunakan Firebase, Anda dapat memeriksa status otentikasi Firebase di sini
    // Misalnya:
    const user = firebase.auth().currentUser;
    if (user) {
        // Jika pengguna sudah terautentikasi, lanjutkan ke fungsi berikutnya
        next();
    } else {
        // Jika pengguna belum terautentikasi, kembalikan respon error 401 Unauthorized
        res.status(401).json({ error: 'Unauthorized' });
    }
}

// Middleware untuk validasi formulir
const validateForm = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {};

    if (!email || !emailRegex.test(email)) {
        errors.email = 'Invalid email address';
    }
    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errors).length > 0) {
        logger(`Form validation failed : \n${JSON.stringify(errors)}`, 'error');

        return res.status(400).json({ success: false, errors });
    }

    // Lanjutkan ke middleware atau endpoint berikutnya jika tidak ada kesalahan validasi
    next();
};
module.exports = { isAuthenticated, validateForm };