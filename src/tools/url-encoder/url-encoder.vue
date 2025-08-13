<script setup lang="ts">
import { useCopy } from '@/composable/copy';
import { useValidation } from '@/composable/validation';
import { isNotThrowing } from '@/utils/boolean';
import { withDefaultOnError } from '@/utils/defaults';

const encodeInput = ref('你好，世界 :)');
const encodeOutput = computed(() => withDefaultOnError(() => encodeURIComponent(encodeInput.value), ''));

const encodedValidation = useValidation({
  source: encodeInput,
  rules: [
    {
      validator: value => isNotThrowing(() => encodeURIComponent(value)),
      message: '无法解析此字符串',
    },
  ],
});

const { copy: copyEncoded } = useCopy({ source: encodeOutput, text: '已将编码后的字符串复制到剪贴板' });

const decodeInput = ref('%E4%BD%A0%E5%A5%BD%EF%BC%8C%E4%B8%96%E7%95%8C%20%3A)');
const decodeOutput = computed(() => withDefaultOnError(() => decodeURIComponent(decodeInput.value), ''));

const decodeValidation = useValidation({
  source: decodeInput,
  rules: [
    {
      validator: value => isNotThrowing(() => decodeURIComponent(value)),
      message: '无法解析此字符串',
    },
  ],
});

const { copy: copyDecoded } = useCopy({ source: decodeOutput, text: '已将解码后的字符串复制到剪贴板' });
</script>

<template>
  <c-card title="编码">
    <c-input-text
      v-model:value="encodeInput"
      label="您的字符串 :"
      :validation="encodedValidation"
      multiline
      autosize
      placeholder="要编码的字符串"
      rows="2"
      mb-3
    />

    <c-input-text
      label="编码后的字符串 :"
      :value="encodeOutput"
      multiline
      autosize
      readonly
      placeholder="编码后的字符串"
      rows="2"
      mb-3
    />

    <div flex justify-center>
      <c-button @click="copyEncoded()">
        复制
      </c-button>
    </div>
  </c-card>
  <c-card title="解码">
    <c-input-text
      v-model:value="decodeInput"
      label="已编码的字符串 :"
      :validation="decodeValidation"
      multiline
      autosize
      placeholder="要解码的字符串"
      rows="2"
      mb-3
    />

    <c-input-text
      label="解码后的字符串 :"
      :value="decodeOutput"
      multiline
      autosize
      readonly
      placeholder="解码后的字符串"
      rows="2"
      mb-3
    />

    <div flex justify-center>
      <c-button @click="copyDecoded()">
        复制
      </c-button>
    </div>
  </c-card>
</template>
