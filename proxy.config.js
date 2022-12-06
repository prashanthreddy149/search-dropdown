module.exports=[
    {
        context:["/d3api/getDropDownList","/d3api/getDropDown"],
        target: "http://dashboard.engrid.in",
        secure: false,
        logLevel: "debug",
        bypass: function(req,res,proxyOption){
            res.setHeader("Access-Control-Allow-Origin","http://dashboard.engrid.in")
        }
    }
];