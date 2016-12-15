var items = {}
var id = 0

function getId() {
	return id++
}


module.exports.init = function (app) {

	app.get('/item', function (req, res) {
		return res.json(Object.keys(items).reduce(function (acc, key) {
			acc.push(items[key])
			return acc
		}, []))
	})

	app.post('/item', function (req, res) {
		var id = getId()
		req.body.id = id
		items[id] = req.body
		return res.json(req.body)
	})

	app.get('/item/:idItem', function (req, res) {
		return res.json(items[req.params.idItem] || null)
	})

	app.delete('/item/:idItem', function (req, res) {
		var item = items[req.params.idItem]
		if (item) {
			delete items[req.params.idItem]
			return res.json(item)
		}
		return res.json(null)
	})

}