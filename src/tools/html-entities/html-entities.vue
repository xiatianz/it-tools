<script setup lang="ts">
import { escape, unescape } from 'lodash';

import { useCopy } from '@/composable/copy';

const escapeInput = ref('<title>955991工具箱</title>');
const escapeOutput = computed(() => escape(escapeInput.value));
const { copy: copyEscaped } = useCopy({ source: escapeOutput });

const unescapeInput = ref('&lt;title&gt;955991工具箱&lt;/title&gt;');
const unescapeOutput = computed(() => unescape(unescapeInput.value));
const { copy: copyUnescaped } = useCopy({ source: unescapeOutput });
</script>

<template>
  <c-card title="转义HTML实体">
    <n-form-item label="您的字符串 :">
      <c-input-text
        v-model:value="escapeInput"
        multiline
        placeholder="要转义的字符串"
        rows="3"
        autosize
        raw-text
      />
    </n-form-item>

    <n-form-item label="转义后的字符串 :">
      <c-input-text
        multiline
        readonly
        placeholder="转义后的字符串"
        :value="escapeOutput"
        rows="3"
        autosize
      />
    </n-form-item>

    <div flex justify-center>
      <c-button @click="copyEscaped()">
        复制
      </c-button>
    </div>
  </c-card>
  <c-card title="解除HTML实体转义">
    <n-form-item label="已转义的字符串 :">
      <c-input-text
        v-model:value="unescapeInput"
        multiline
        placeholder="要解除转义的字符串"
        rows="3"
        autosize
        raw-text
      />
    </n-form-item>

    <n-form-item label="解除转义后的字符串 :">
      <c-input-text
        :value="unescapeOutput"
        multiline
        readonly
        placeholder="解除转义后的字符串"
        rows="3"
        autosize
      />
    </n-form-item>

    <div flex justify-center>
      <c-button @click="copyUnescaped()">
        复制
      </c-button>
    </div>
  </c-card>
</template>
