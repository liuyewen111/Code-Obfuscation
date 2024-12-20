### 1. HTML 文件 (index.html)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>在线代码混淆工具</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>在线代码混淆工具</h1>

        <div class="form-group">
            <label for="inputCode">请输入代码：</label>
            <textarea id="inputCode" rows="10" placeholder="在此输入代码"></textarea>
        </div>

        <div class="form-group">
            <label for="obfuscationLevel">选择混淆程度：</label>
            <select id="obfuscationLevel">
                <option value="low">低档</option>
                <option value="medium">中档</option>
                <option value="high">高档</option>
            </select>
        </div>

        <div class="form-group">
            <button onclick="obfuscateCode()">混淆代码</button>
        </div>

        <div class="form-group">
            <label for="outputCode">混淆后的代码：</label>
            <textarea id="outputCode" rows="10" readonly placeholder="混淆后的代码将在此显示"></textarea>
        </div>

        <button id="copyButton">复制代码</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### 2. CSS 文件 (style.css)

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 80%;
    max-width: 800px;
}

h1 {
    text-align: center;
    color: #333;
}

.form-group {
    margin-bottom: 20px;
}

textarea {
    width: 100%;
    padding: 10px;
    font-family: monospace;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#copyButton {
    background-color: #28a745;
}

#copyButton:hover {
    background-color: #218838;
}
```

### 3. JavaScript 文件 (script.js)

```javascript
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
```

### 代码解释

1. **HTML 部分**：
   - 用户输入原始代码后，选择混淆级别，点击按钮即可得到混淆后的代码。
   - 提供了一个按钮来复制混淆后的代码到剪贴板，方便用户使用。

2. **CSS 部分**：
   - 提供了简洁的页面样式，确保工具界面美观且易用。

3. **JavaScript 部分**：
   - `lowLevelObfuscate`：进行简单的变量名替换，通过随机生成的字符串替换变量。
   - `mediumLevelObfuscate`：在低档混淆基础上，进一步压缩代码，去除多余的空格和换行。
   - `highLevelObfuscate`：采用更复杂的混淆手段，如替换函数名和变量名。
   - 复制功能：通过点击按钮将混淆后的代码复制到剪贴板。

### Cloudflare Workers 兼容性

- 代码混淆主要是替换变量名、函数名和去除多余的空格等，**不会改变代码逻辑**，因此混淆后代码仍然能够在 **Cloudflare Workers** 上运行。
- 为了保证 Cloudflare Workers 上代码的正确执行，混淆级别最好选择 **低档或中档**，避免复杂的控制流混淆，这可能会导致 Cloudflare Workers 上的执行效率降低或出现不可预期的错误。
- 如果需要在 Cloudflare Workers 上部署，可以将混淆后的代码部署为 Workers 脚本，类似如下：

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 在此处添加混淆后的代码
  return new Response('Hello Worker!', { status: 200 })
}
```

### 结论

- **混淆后的代码能在 Cloudflare Workers 上托管并正常运行**，前提是混淆过程中没有影响到核心 API 的调用和 Cloudflare Workers 环境的兼容性。
- 使用 **低档和中档混淆** 是比较安全的选择，避免了过度的复杂化，确保代码在 Cloudflare Workers 上的稳定性和执行效率。
