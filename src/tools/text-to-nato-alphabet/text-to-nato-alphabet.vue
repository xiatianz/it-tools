<script setup lang="ts">
import { textToNatoAlphabet } from './text-to-nato-alphabet.service';
import { useCopy } from '@/composable/copy';

const input = ref('');
const natoText = computed(() => textToNatoAlphabet({ text: input.value }));
const { copy } = useCopy({ source: natoText, text: 'NATO字母已复制。' });
</script>

<template>
  <div>
    <c-input-text
      v-model:value="input"
      label="要转换为NATO音标字母的文本"
      placeholder="在此输入您的文本..."
      clearable
      mb-5
    />

    <div v-if="natoText">
      <div mb-2>
        您的文本的NATO音标字母表示
      </div>
      <c-card>
        {{ natoText }}
      </c-card>

      <div mt-3 flex justify-center>
        <c-button autofocus @click="copy()">
          复制NATO字母
        </c-button>
      </div>
    </div>
  </div>
</template>
