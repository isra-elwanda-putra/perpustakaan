import jwt from 'jsonwebtoken'
import { promisify } from 'util';
// Fungsi untuk memeriksa apakah token sudah kedaluwarsa
// const isTokenExpired = (decodedToken) => {
//     const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang dalam detik
//     return decodedToken.exp < currentTime;
// };

// // Fungsi untuk menangani token yang sudah kedaluwarsa
// const handleExpiredToken = (decodedToken) => {
//     const userId = decodedToken.userId; // Mendapatkan ID pengguna dari token
//     // Di sini Anda bisa menangani token yang sudah kedaluwarsa, misalnya:
//     // - Memberikan pesan kesalahan kepada pengguna
//     // - Menghapus token dari penyimpanan
//     // - Melakukan logging atau pemantauan
//     console.log(`Token akses untuk pengguna dengan ID ${userId} sudah kedaluwarsa.`);
//     // Jika Anda ingin menghapus token dari penyimpanan, Anda dapat memanggil fungsi untuk menghapusnya di sini
//     // removeTokenFromStorage(userId);
// };
const expiresInAccessToken = 30 * 60;
const expiresInRefreshToken = 2 * 60 * 60
// Fungsi untuk memperbarui token akses menggunakan refresh token
const refreshAccessToken = (refreshToken) => {
    const decodedRefreshToken = verifyRefreshToken(refreshToken);
    if (decodedRefreshToken) {
        return generateAccessToken(decodedRefreshToken.userId);
    } else {
        return null;
    }
};

// Fungsi untuk menghasilkan token akses JWT dan refresh token
const generateTokens = (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    return { accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken };
};

// Fungsi untuk memverifikasi token akses JWT dan menghapus jika sudah kedaluwarsa
const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // if (isTokenExpired(decoded)) {
        //     // Token sudah kedaluwarsa, maka lakukan penanganan
        //     handleExpiredToken(decoded);
        //     return null;
        // }
        return decoded;
    } catch (error) {
        return null;
    }
};

// Fungsi untuk memverifikasi dan mengekstrak informasi dari refresh token
const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};

const generateAccessToken = (userId) => {
    const payload = {
        userId: userId,
        // Tidak perlu menyetel issuedAt secara manual, `iat` akan disetel otomatis oleh jwt.sign
    };
    const options = {
        expiresIn: expiresInAccessToken // 30 menit dalam detik
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
    return token;
};

// Fungsi untuk menghasilkan refresh token
const generateRefreshToken = (userId) => {
    const payload = {
        userId: userId,
        // Tidak perlu menyetel issuedAt secara manual, `iat` akan disetel otomatis oleh jwt.sign
    };
    const options = {
        expiresIn: expiresInRefreshToken // 2 jam dalam detik
    };
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
    return token;
};

export { generateTokens, refreshAccessToken, verifyAccessToken, verifyRefreshToken }
