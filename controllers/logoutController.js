async function Logout (req, res) {
    req.session.destroy(err => {
        if(!err) {
            setTimeout(()=>{
                res.redirect('/')
            }, 2000)
        }else res.send({status: 'Logout error', body: err})
    })
}

module.exports = { Logout }
