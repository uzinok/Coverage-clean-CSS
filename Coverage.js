var fs = require("fs");
var url = require('url');
 
var fileName = process.argv[2];
var filter = process.argv[3];
 
if (!fs.existsSync(fileName)) {
    console.log('not found file: ', fileName);
    return;
}
 
var content = JSON.parse(fs.readFileSync(fileName, 'utf8'));
 
for (var i = 0, len = content.length; i < len; i++) {
 
    var row = content[i];
    var ext = url.parse(row.url).pathname.split('.').pop();
 
    if (ext !== 'css') {
        continue;
    }
 
    if (filter && row.url.indexOf(filter) !== -1) {
        showUseCSS(row);
        break;
    }
 
    if (!filter) {
        showUseCSS(row);
    }
}
 
function showUseCSS(row) {
    for (var i = 0, len = row.ranges.length; i < len; i++) {
        var offset = row.ranges[i];
        console.log(row.text.substr(offset.start, offset.end - offset.start) + "\n");
    }
}