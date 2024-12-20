// 简单的代码混淆功能
function obfuscateCode() {
    let inputCode = document.getElementById('inputCode').value;

    if (!inputCode) {
        alert('请输入代码！');
        return;
    }

    let obfuscatedCode = simpleObfuscate(inputCode);
    document.getElementById('outputCode').value = obfuscatedCode;
}

// 简单的代码混淆函数：替换变量名
function simpleObfuscate(code) {
    const randomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    // 用简单的替换方法将变量名混淆
    return code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (match) => {
        if (match.length > 2) {
            return randomString(5); // 混淆变量名
        }
        return match;
    });
}