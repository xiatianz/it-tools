import fs from 'fs';
import path from 'path';

// 读取中文翻译文件
const zhYamlPath = path.join(process.cwd(), 'locales/zh.yml');
let zhYamlContent = fs.readFileSync(zhYamlPath, 'utf8');

// 需要修复的工具名称映射
const toolNameFixes = new Map([
  // 代码中的名称 -> 翻译文件中应使用的名称
  ['dateTimeConverter', 'date-converter'],
  ['qrCodeGenerator', 'qrcode-generator'],
  ['wifiQrCodeGenerator', 'wifi-qrcode-generator'],
]);

// 读取工具索引文件以获取所有工具名称
const toolsIndexPath = path.join(process.cwd(), 'src/tools/index.ts');
const toolsIndexContent = fs.readFileSync(toolsIndexPath, 'utf8');
const toolNameRegex = /tool as ([a-zA-Z0-9]+)/g;
const toolsFromIndex = new Set();
let match;
while ((match = toolNameRegex.exec(toolsIndexContent)) !== null) {
  toolsFromIndex.add(match[1]);
}

// 提取zh.yml中的工具名称
const yamlToolNameRegex = /  ([a-z0-9-]+):\n    title: /g;
const toolsFromYaml = new Set();
let yamlMatch;
while ((yamlMatch = yamlToolNameRegex.exec(zhYamlContent)) !== null) {
  toolsFromYaml.add(yamlMatch[1]);
}

// 检查并修复工具名称格式
console.log('=== 检查工具名称格式 ===');
let hasChanges = false;

toolsFromIndex.forEach(tool => {
  // 转换为标准kebab-case
  const standardKebabCase = tool.replace(/([A-Z])/g, '-$1').toLowerCase();

  // 检查翻译文件中是否存在标准格式
  if (toolsFromYaml.has(standardKebabCase)) {
    return;
  }

  // 检查是否存在需要修复的情况
  if (toolNameFixes.has(tool)) {
    const correctName = toolNameFixes.get(tool);
    if (toolsFromYaml.has(correctName)) {
      console.log(`- 工具 