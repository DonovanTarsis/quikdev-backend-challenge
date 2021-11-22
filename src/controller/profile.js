const requestProfileCurrentUser = async (req, res) => {
    try {
        const { __v, password: _, ...response } = req.user._doc;
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    requestProfileCurrentUser
}