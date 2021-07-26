#!/usr/bin/env node

'use strict';

// you must pass a directory in which database will be saved
// if it doesn't exist, it will be created
const iptoasn = require('./index.js')('cache/');

(async function() {
    const testArray = [
        '8.8.8.8',
        '50.22.180.100',
        '1.2.3.4',
        '104.16.181.15',
        '127.0.0.1',
        'asd'
    ];

    await iptoasn.load();

    // check when the database was updated
    // lastUpdated are days
    // lastUpdated is Infinity if there's no database at all
    const lastUpdated = await iptoasn.lastUpdated();

    console.log(`Last updated ${lastUpdated} days ago.`);

    // update the database if it's older than 31 days
    // you must call .load() even if you don't update the database
    if (lastUpdated > 31) {
        console.log('Cache too old or never created. Updating...');
        await iptoasn.update();
    }

    testArray.forEach(function(ip) {
        console.log(ip, '-', iptoasn.lookup(ip));
    });
})();