function reverseString(str) {
    return str.trim().split("").reverse().join("");
}

process.stdin.setEncoding("utf-8");

process.stdin.on("data", str => {
    process.stdout.write(reverseString(str) + "\n\n");
});