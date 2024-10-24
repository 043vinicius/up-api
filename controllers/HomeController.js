class HomeController{

    /**
     * Página inicial para validar funcionamento da API
     * @param {*} req 
     * @param {*} res 
     */
    async index(req, res){
        res.send("Api esta funcionando");
    }

}

module.exports = new HomeController();