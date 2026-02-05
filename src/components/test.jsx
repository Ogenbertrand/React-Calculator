function calculate(x, y) {
    var result = x + y
    console.log("Result is " + result); // Console log warning
    if (x == y) { // Loose equality warning
        return null;
    }
}

function unusedFunction() { // Unused function warning
    console.log("This function is never used.");
}
export default calculate;

