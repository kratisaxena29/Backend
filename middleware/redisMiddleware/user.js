const getLoginData = async (req, res, next) => {
    const { email } = req.body;

    let data = await getCache(email);
    if(data !== null){
        return res.json(data);
    } else {
        next()
    }
}

module.exports = { getLoginData }