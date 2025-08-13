const fs = require('fs');
const path = require('path');

// 读取工具索引文件
const toolsIndexPath = path.join(__dirname, 'src/tools/index.ts');
const toolsIndexContent = fs.readFileSync(toolsIndexPath, 'utf8');

// 读取中文翻译文件
const zhYamlPath = path.join(__dirname, 'locales/zh.yml');
const zhYamlContent = fs.readFileSync(zhYamlPath, 'utf8');

// 提取工具索引中的工具名称
const toolNameRegex = /tool as ([a-zA-Z0-9]+)/g;
const toolsFromIndex = new Set();
let match;
while ((match = toolNameRegex.exec(toolsIndexContent)) !== null) {
  toolsFromIndex.add(match[1]);
}

// 处理特殊情况：import名称与工具名称不完全匹配的情况
const specialCases = new Map([
  ['bip39', 'bip39-generator'],
  ['cypher', 'encryption'],
  ['baseConverter', 'integer-base-converter'],
  ['yamlToJson', 'yaml-to-json-converter'],
  ['jsonToYaml', 'json-to-yaml-converter'],
]);

// 提取zh.yml中的工具名称
const yamlToolNameRegex = /  ([a-z0-9-]+):\n    title: /g;
const toolsFromYaml = new Set();
let yamlMatch;
while ((yamlMatch = yamlToolNameRegex.exec(zhYamlContent)) !== null) {
  toolsFromYaml.add(yamlMatch[1]);
}

// 对比找出未翻译的工具
const untranslatedTools = [];
const possiblyUnmatched = [];

toolsFromIndex.forEach(tool => {
  // 转换为kebab-case
  const kebabCaseTool = tool.replace(/([A-Z])/g, '-$1').toLowerCase();

  // 检查是否存在于yaml中
  if (toolsFromYaml.has(kebabCaseTool)) {
    return;
  }

  // 检查特殊情况
  if (specialCases.has(tool)) {
    const specialCase = specialCases.get(tool);
    if (toolsFromYaml.has(specialCase)) {
      return;
    }
  }

  // 检查可能的不匹配情况
  const possibleMatches = Array.from(toolsFromYaml).filter(yamlTool => {
    return yamlTool.includes(kebabCaseTool.split('-')[0]) ||
           kebabCaseTool.includes(yamlTool.split('-')[0]);
  });

  if (possibleMatches.length > 0) {
    possiblyUnmatched.push({
      tool,
      kebabCase: kebabCaseTool,
      possibleMatches
    });
  } else {
    untranslatedTools.push({
      tool,
      kebabCase: kebabCaseTool
    });
  }
});

// 输出结果
console.log('=== 未找到翻译的工具 ===');
if (untranslatedTools.length === 0) {
  console.log('恭喜！所有工具都已有翻译。');
} else {
  untranslatedTools.forEach(({ tool, kebabCase }) => {
    console.log(`- ${tool} (${kebabCase})`);
  });
}

console.log('\n=== 可能存在名称不匹配的工具 ===');
if (possiblyUnmatched.length === 0) {
  console.log('没有发现可能不匹配的工具。');
} else {
  possiblyUnmatched.forEach(({ tool, kebabCase, possibleMatches }) => {
    console.log(`- ${tool} (${kebabCase}) 可能匹配: ${possibleMatches.join(', ')}`);
  });
}

// 生成缺失的翻译条目
if (untranslatedTools.length > 0) {
  console.log('\n=== 建议添加的翻译条目 ===');
  untranslatedTools.forEach(({ tool, kebabCase }) => {
    console.log(`  ${kebabCase}:`);
    console.log(`    title: ${tool}`);
    console.log(`    description: TODO: 添加${tool}的描述`);
    console.log('');
  });
}