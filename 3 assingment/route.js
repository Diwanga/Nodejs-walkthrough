var userslist = []
const reqHandeler = (req, res) => {

    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.setHeader("Content-type", "text/html");
        res.write('<!DOCTYPE html><html><head> <title>Welcome to the Assingment</title>  </head><body><form method = "POST" action="/createuser"><input type="text" name="uname"><button type="submit">SEND</button> </form> <hr> <form method = "POST" action="/users"><button type="submit">LIST USERS</button> </form></body></html>');
        return res.end();
    }
    if (url === "/createuser") {
        console.log("senddata");
        const body = []
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {

            const parsedbody = Buffer.concat(body).toString();
            const senddata = parsedbody.split("=")[1]
            // console.log(senddata);
            userslist.push(senddata);
            //  console.log(userslist)
            // res.setHeader("Content-type", "text/html");
            // res.write(`<!DOCTYPE html><html><head> <title>Welcome to the Assingment</title>  </head><body>${senddata}</body></html>`);
            res.statusCode = 302;
            res.setHeader("Location", "/")   //REDIRECTING
            return res.end();


        });

    }

    if (url === "/users") {
        console.log(userslist);
        res.setHeader("Content-type", "text/html");


        res.write("<ul>");
        for (user of userslist) {
            console.log(user);
            res.write(`<li>${user}</li>`);
        }
        res.write("</ul>");
        return res.end();

    }
}
module.exports = reqHandeler;