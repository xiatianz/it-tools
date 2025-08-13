<script setup lang="ts">
import { convertTextToUnicode, convertUnicodeToText } from './text-to-unicode.service';
import { useCopy } from '@/composable/copy';

const inputText = ref('');
const unicodeFromText = computed(() => inputText.value.trim() === '' ? '' : convertTextToUnicode(inputText.value));
const { copy: copyUnicode } = useCopy({ source: unicodeFromText, text: 'Unicode已复制到剪贴板' });

const inputUnicode = ref('');
const textFromUnicode = computed(() => inputUnicode.value.trim() === '' ? '' : convertUnicodeToText(inputUnicode.value));
const { copy: copyText } = useCopy({ source: textFromUnicode, text: '文本已复制到剪贴板' });
</script>

<template>
  <c-card title="文本转Unicode">
    <c-input-text v-model:value="inputText" multiline placeholder="例如: '你好，世界'" label="输入要转换为Unicode的文本" autosize autofocus raw-text test-id="text-to-unicode-input" />
    <c-input-text v-model:value="unicodeFromText" label="文本的Unicode表示" multiline raw-text readonly mt-2 placeholder="您的文本的Unicode表示将显示在这里" test-id="text-to-unicode-output" />
    <div mt-2 flex justify-center>
      <c-button :disabled="!unicodeFromText" @click="copyUnicode()">
        复制Unicode到剪贴板
      </c-button>
    </div>
  </c-card>

  <c-card title="Unicode转文本">
    <c-input-text v-model:value="inputUnicode" multiline placeholder="输入Unicode" label="输入要转换为文本的Unicode" autosize raw-text test-id="unicode-to-text-input" />
    <c-input-text v-model:value="textFromUnicode" label="Unicode的文本表示" multiline raw-text readonly mt-2 placeholder="您的Unicode的文本表示将显示在这里" test-id="unicode-to-text-output" />
    <div mt-2 flex justify-center>
      <c-button :disabled="!textFromUnicode" @click="copyText()">
        复制文本到剪贴板
      </c-button>
    </div>
  </c-card>
</template>
