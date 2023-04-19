const { Client } = require("discord.js")
const ms = require("ms")
const axios = require("axios")
require("dotenv").config()

module.exports = {
    name: "ready",

    /**
     * @param {Client} client
     */
    async execute(client) {
        try {

            const { user } = client

            console.log(`${user.tag} is now online!`)

            var fee

            function getFee() {
                axios.get("https://api-optimistic.etherscan.io/api?", {
                    params: {
                        module : "account",
                        action : "tokenbalance",
                        contractaddress : "0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9",
                        address : "0xfeEFEEfeefEeFeefEEFEEfEeFeefEEFeeFEEFEeF",
                        tag : "latest",
                        apikey : process.env.ETHER_SCAN_API
                    }
                })
                    .then((res) => {
                        console.log(res.data)
                        fee = parseInt(res.data.result.slice(0, -18)).toLocaleString()
                    })
                    .catch(() => { })
            }


            setInterval(async () => {

                getFee()
                user.setActivity({
                    name: `$${fee}`,
                    type: 3
                })
                console.log("Fee : " + fee)

            }, ms("10s"))
        }
        catch (e) {
            console.log(e)
        }

    }

}

