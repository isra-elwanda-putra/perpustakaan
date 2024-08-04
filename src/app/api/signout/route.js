const signOutUser = async () => {
    try {
        await signOut(auth);
        await clearAccessToken(userId);
        const message = 'Logout successful';
        logger(`${message}`);
        return { success: true, message };
    } catch (error) {
        logger('Failed to logout: ' + error.message, 'error');
        return { success: false, message: error.message };
    };
}
const logout = async (req, res) => {
    const result = await signOutUser();
    res.status(200).json({ success: result.success, message: result.message });
}

router.get('/logout', logout);