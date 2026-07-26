import dns from "node:dns/promises";

try {
    console.log(await dns.resolve4("google.com"));
    console.log(await dns.resolveSrv("_mongodb._tcp.hospital-token.enqpjwb.mongodb.net"));
} catch (err) {
    console.error(err);
}