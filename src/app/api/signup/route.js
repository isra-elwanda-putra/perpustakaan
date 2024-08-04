const { validateForm } = require('../middlewares/authMiddleware');
router.post('/register', validateForm, register);

const { registerUser, signInUser, signOutUser } = require('../services/authService');
const register = async (req, res) => {
    const { email, password } = req.body;
    const result = await registerUser(email, password);
    res.status(200).json({ success: result.success, message: result.message, user: result.user });
}
// Fungsi untuk mendaftar pengguna baru
const registerUser = async (email, password) => {
    logger(`Registering user with email: ${email}`);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const { accessToken, refreshToken } = generateTokens(user.uid);
        const message = 'successfully complete the registration';
        logger(`${message}`);
        return { success: true, message, user, accessToken, refreshToken };
    } catch (error) {
        logger('Registration was not successful: ' + error.message, 'error');
        return { success: false, message: error.message, user: null, accessToken: null, refreshToken: null };
    }
};