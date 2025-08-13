<script setup lang="ts">
import type { Colord } from 'colord';
import { colord, extend } from 'colord';
import _ from 'lodash';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';
import { buildColorFormat } from './color-converter.models';

extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

const formats = {
  picker: buildColorFormat({
    label: '颜色选择器',
    format: (v: Colord) => v.toHex(),
    type: 'color-picker',
  }),
  hex: buildColorFormat({
    label: '十六进制',
    format: (v: Colord) => v.toHex(),
    placeholder: '例如: #ff0000',
  }),
  rgb: buildColorFormat({
    label: 'RGB',
    format: (v: Colord) => v.toRgbString(),
    placeholder: '例如: rgb(255, 0, 0)',
  }),
  hsl: buildColorFormat({
    label: 'HSL',
    format: (v: Colord) => v.toHslString(),
    placeholder: '例如: hsl(0, 100%, 50%)',
  }),
  hwb: buildColorFormat({
    label: 'HWB',
    format: (v: Colord) => v.toHwbString(),
    placeholder: '例如: hwb(0, 0%, 0%)',
  }),
  lch: buildColorFormat({
    label: 'LCH',
    format: (v: Colord) => v.toLchString(),
    placeholder: '例如: lch(53.24, 104.55, 40.85)',
  }),
  cmyk: buildColorFormat({
    label: 'CMYK',
    format: (v: Colord) => v.toCmykString(),
    placeholder: '例如: cmyk(0, 100%, 100%, 0)',
  }),
  name: buildColorFormat({
    label: '颜色名称',
    format: (v: Colord) => v.toName({ closest: true }) ?? '未知',
    placeholder: '例如: red',
  }),
};

updateColorValue(colord('#1ea54c'));

function updateColorValue(value: Colord | undefined, omitLabel?: string) {
  if (value === undefined) {
    return;
  }

  if (!value.isValid()) {
    return;
  }

  _.forEach(formats, ({ value: valueRef, format }, key) => {
    if (key !== omitLabel) {
      valueRef.value = format(value);
    }
  });
}
</script>

<template>
  <c-card>
    <template v-for="({ label, parse, placeholder, validation, type }, key) in formats" :key="key">
      <input-copyable
        v-if="type === 'text'"
        v-model:value="formats[key].value.value"
        :test-id="`input-${key}`"
        :label="`${label}:`"
        label-position="left"
        label-width="100px"
        label-align="right"
        :placeholder="placeholder"
        :validation="validation"
        raw-text
        clearable
        mt-2
        @update:value="(v:string) => updateColorValue(parse(v), key)"
      />

      <n-form-item v-else-if="type === 'color-picker'" :label="`${label}:`" label-width="100" label-placement="left" :show-feedback="false">
        <n-color-picker
          v-model:value="formats[key].value.value"
          placement="bottom-end"
          @update:value="(v:string) => updateColorValue(parse(v), key)"
        />
      </n-form-item>
    </template>
  </c-card>
</template>
