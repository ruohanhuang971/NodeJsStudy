const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: "TESTING: Got all products" });
}

const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: "Got all products" });
}

module.exports = { getAllProducts, getAllProductsStatic }