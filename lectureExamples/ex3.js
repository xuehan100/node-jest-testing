var add = function (x, y, callback) {
    callback(x + y);
}
//console.log("here");
add(4, 5, (result) => {
    console.log(result);
});
