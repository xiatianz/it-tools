<script setup lang="ts">
import { convertAsciiBinaryToText, convertTextToAsciiBinary } from './text-to-binary.models';
import { withDefaultOnError } from '@/utils/defaults';
import { useCopy } from '@/composable/copy';
import { isNotThrowing } from '@/utils/boolean';

const inputText = ref('');
const binaryFromText = computed(() => convertTextToAsciiBinary(inputText.value));
const { copy: copyBinary } = useCopy({ source: binaryFromText, text: '二进制已复制到剪贴板' });

const inputBinary = ref('');
const textFromBinary = computed(() => withDefaultOnError(() => convertAsciiBinaryToText(inputBinary.value), ''));
const inputBinaryValidationRules = [
  {
    validator: (value: string) => isNotThrowing(() => convertAsciiBinaryToText(value)),
    message: '二进制应为有效的ASCII二进制字符串，且位数为8的倍数',
  },
];
const { copy: copyText } = useCopy({ source: textFromBinary, text: '文本已复制到剪贴板' });
</script>

<template>
  <c-card title="文本转ASCII二进制">
    <c-input-text v-model:value="inputText" multiline placeholder="例如: '你好，世界'" label="输入要转换为二进制的文本" autosize autofocus raw-text test-id="text-to-binary-input" />
    <c-input-text v-model:value="binaryFromText" label="文本的二进制表示" multiline raw-text readonly mt-2 placeholder="您的文本的二进制表示将显示在这里" test-id="text-to-binary-output" />
    <div mt-2 flex justify-center>
      <c-button :disabled="!binaryFromText" @click="copyBinary()">
        复制二进制到剪贴板
      </c-button>
    </div>
  </c-card>

  <c-card title="ASCII二进制转文本">
    <c-input-text v-model:value="inputBinary" multiline placeholder="例如: '01001000 01100101 01101100 01101100 01101111'" label="输入要转换为文本的二进制" autosize raw-text :validation-rules="inputBinaryValidationRules" test-id="binary-to-text-input" />
    <c-input-text v-model:value="textFromBinary" label="二进制的文本表示" multiline raw-text readonly mt-2 placeholder="您的二进制的文本表示将显示在这里" test-id="binary-to-text-output" />
    <div mt-2 flex justify-center>
      <c-button :disabled="!textFromBinary" @click="copyText()">
        复制文本到剪贴板
      </c-button>
    </div>
  </c-card>
</template>
