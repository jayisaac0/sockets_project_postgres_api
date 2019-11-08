function error(error, request, response, next) {
    response.status(500).send('Something failed');
}

module.exports = error;