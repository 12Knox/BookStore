const OperationHelper = require('apac').OperationHelper;
const cheerio = require('cheerio');
 
let opHelper;
let title;
let $;

opHelper = new OperationHelper({
    awsId:     'AKIAJKZSA3XIWTBEWEKA',
    awsSecret: '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',
    assocId:   'eisuke1212-22',
    endPoint: 'ecs.amazonaws.jp'
});

opHelper.execute('ItemSearch', {
    'SearchIndex': 'Books',
    'BrowseNode': 465610,
    'Keywords': 'GIS',
    'ResponseGroup': 'Small',
    'Sort': 'salesrank'
}, 

(err, results, xml) => {
    if (err) { console.log("error"); return; }
    $ = cheerio.load(xml);
    $("Items > Item").each(function(idx, item) {
        title = $(item).find("Title").text();
        console.log(title);
    });
});