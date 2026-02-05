function calculate(x, y) {
    var result = x + y
    console.log("Result is " + result); // Console log warning
    if (x == y) { // Loose equality warning
        return null;
    }
}
export default calculate;