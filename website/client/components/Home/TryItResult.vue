<script setup lang="ts">
import type { PackResult } from '../api/client';
import TryItResultContent from './TryItResultContent.vue';
import TryItResultErrorContent from './TryItResultErrorContent.vue';

defineProps<{
  result: PackResult | null;
  loading: boolean;
  error: string | null;
  repositoryUrl?: string;
}>();
</script>

<template>
  <div class="result-viewer">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Processing repository...</p>
    </div>

    <TryItResultErrorContent
      v-else-if="error"
      :message="error"
      :repository-url="repositoryUrl"
    />

    <TryItResultContent
      v-else-if="result"
      :result="result"
    />
  </div>
</template>

<style scoped>
.result-viewer {
  margin-top: 24px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
}

.loading {
  padding: 48px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
