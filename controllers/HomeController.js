class HomeController{

    async index(req, res){
        res.send("Api esta funcionando");
    }

}

module.exports = new HomeController();