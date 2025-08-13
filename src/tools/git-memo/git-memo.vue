<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const themeVars = useThemeVars();
const { t } = useI18n();
</script>

<template>
  <div class="git-memo">
    <h2>{{ t('tools.git-memo.setGlobalConfig') }}</h2>
    <pre><code>git config --global user.name "[name]"
git config --global user.email "[email]"</code></pre>

    <h2>{{ t('tools.git-memo.getStarted') }}</h2>
    <h3>{{ t('tools.git-memo.createRepository') }}</h3>
    <pre><code>git init</code></pre>

    <h3>{{ t('tools.git-memo.cloneRepository') }}</h3>
    <pre><code>git clone [url]</code></pre>

    <h2>{{ t('tools.git-memo.commit') }}</h2>
    <h3>{{ t('tools.git-memo.commitAll') }}</h3>
    <pre><code>git commit -am "[commit message]"</code></pre>

    <h3>{{ t('tools.git-memo.amendCommit') }}</h3>
    <pre><code>git commit --amend --no-edit</code></pre>

    <h2>{{ t('tools.git-memo.mistake') }}</h2>
    <h3>{{ t('tools.git-memo.changeCommitMessage') }}</h3>
    <pre><code>git commit --amend</code></pre>

    <h3>{{ t('tools.git-memo.undoCommitKeepChanges') }}</h3>
    <pre><code>git reset HEAD~1</code></pre>

    <h3>{{ t('tools.git-memo.undoNCommitsKeepChanges') }}</h3>
    <pre><code>git reset HEAD~N</code></pre>

    <h3>{{ t('tools.git-memo.undoCommitDiscardChanges') }}</h3>
    <pre><code>git reset HEAD~1 --hard</code></pre>

    <h3>{{ t('tools.git-memo.resetToRemote') }}</h3>
    <pre><code>git fetch origin
git reset --hard origin/[branch-name]</code></pre>

    <h2>{{ t('tools.git-memo.miscellaneous') }}</h2>
    <h3>{{ t('tools.git-memo.renameMasterToMain') }}</h3>
    <pre><code>git branch -m master main</code></pre>
  </div>
</template>

<style lang="less" scoped>
::v-deep(pre) {
  margin: 0;
  padding: 15px 22px;
  background-color: v-bind('themeVars.cardColor');
  border-radius: 4px;
  overflow: auto;
}
</style>
