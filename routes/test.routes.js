module.exports = (app) => {

    app.get("/api/ping", (req, res) => {
        res.json({ test: "pong" });
    });

    app.post("/api/ping", (req, res) => {
        if (req.body.ping) {
            res.json({ test: "pong" });
        }
    });

};