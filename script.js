// 混淆级别选择
function obfuscateCode() {
    let inputCode = document.getElementById('inputCode').value;
    let level = document.getElementById('obfuscationLevel').value;

    if (!inputCode) {
        alert('请输入代码！');
        return;
    }

    let obfuscatedCode;
    switch (level) {
        case 'low':
            obfuscatedCode = lowLevelObfuscate(inputCode);
            break;
        case 'medium':
            obfuscatedCode = mediumLevelObfuscate(inputCode);
            break;
        case 'high':
            obfuscatedCode = highLevelObfuscate(inputCode);
            break;
        default:
            obfuscatedCode = inputCode;
    }

    document.getElementById('outputCode').value = obfuscatedCode;
}

// 低档混淆：简单替换变量名
function lowLevelObfuscate(code) {
    const randomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    return code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (match) => {
        if (match.length > 2) {
            return '_' + randomString(5);
        }
        return match;
    });
}

// 中档混淆：除了替换变量名，还会压缩代码
function mediumLevelObfuscate(code) {
    let obfuscatedCode = lowLevelObfuscate(code);
    obfuscatedCode = obfuscatedCode.replace(/\s+/g, ' ').replace(/;\s*/g, ';');
    return obfuscatedCode;
}

// 高档混淆：更复杂的代码混淆，可能包括控制流混淆等
function highLevelObfuscate(code) {
    let obfuscatedCode = mediumLevelObfuscate(code);
    obfuscatedCode = obfuscatedCode.replace(/\bfunction\b/g, 'f');
    obfuscatedCode = obfuscatedCode.replace(/\bvar\b/g, 'v');
    // 可以加入更多高级混淆处理
    return obfuscatedCode;
}

// 复制代码到剪贴板
document.getElementById('copyButton').addEventListener('click', function () {
    const outputCode = document.getElementById('outputCode');
    outputCode.select();
    document.execCommand('copy');
    alert('代码已复制到剪贴板');
});
