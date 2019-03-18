// helper.js
// ===============

const uuidv1 = require('uuid/v1');

module.exports = {

    /**
     * Prints a fancy Header to the console on startup
     */
    printHead: function () {
        console.log('         :::::::::      :::     :::::::::  :::::::::   ::::::::    ');
        console.log('         :+:    :+:   :+: :+:   :+:    :+: :+:    :+: :+:    :+:   ');
        console.log('        +:+    +:+  +:+   +:+  +:+    +:+ +:+    +:+ +:+           ');
        console.log('       +#++:++#+  +#++:++#++: +#++:++#+  +#++:++#:  +#++:++#++     ');
        console.log('      +#+    +#+ +#+     +#+ +#+    +#+ +#+    +#+        +#+      ');
        console.log('     #+#    #+# #+#     #+# #+#    #+# #+#    #+# #+#    #+#       ');
        console.log('    #########  ###     ### #########  ###    ###  ########         ');
        console.log('  ===============================================================  ');
        console.log('                                                                   ');
        console.log('                 Bank Assignment Backend REST Server               ');
        console.log('                      Made with ❤️ and node.js                     ');
        console.log('                        by lichtwellenreiter.                      ');
        console.log('                                                                   ');
        console.log('  ===============================================================  ');
        console.log('                                                                   ');
    },

    createAccId: function () {
        return uuidv1();
    }
};