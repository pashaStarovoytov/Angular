myApp.service('store', function () {
    var login, score, time;

    return {
        setLogin: function (_login) {
            login = _login;
        },

        getLogin: function () {
            return login;
        },

        setScore: function (_score) {
            score = _score;
        },

        getScore: function () {
            return score;
        },
    }
})
