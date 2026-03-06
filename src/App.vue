<template>
  <div class="calculator">
    <h1>LLM Token Price Calculator</h1>

    <div class="form-group">
      <label for="provider">Provider</label>
      <v-select
        id="provider"
        v-model="selectedProvider"
        :options="providerOptions"
        :reduce="p => p.id"
        label="name"
        placeholder="Select provider..."
      />
    </div>

    <div class="form-group">
      <label for="model">Model</label>
      <v-select
        id="model"
        v-model="selectedModel"
        :options="modelOptions"
        :reduce="m => m.id"
        label="name"
        placeholder="Search models..."
        :disabled="!selectedProvider"
      />
    </div>

    <div class="form-group">
      <label for="inputTokens">Input Tokens</label>
      <input
        type="number"
        id="inputTokens"
        v-model.number="inputTokens"
        min="0"
        placeholder="0"
      >
    </div>

    <div class="form-group">
      <label for="outputTokens">Output Tokens</label>
      <input
        type="number"
        id="outputTokens"
        v-model.number="outputTokens"
        min="0"
        placeholder="0"
      >
    </div>

    <div class="form-group">
      <label for="numRequests">Number of Requests</label>
      <input
        type="number"
        id="numRequests"
        v-model.number="numRequests"
        min="1"
        placeholder="1"
      >
    </div>

    <div class="results">
      <div class="result-row">
        <span>Input Cost:</span>
        <span>{{ formatCurrency(inputCost) }}</span>
      </div>
      <div class="result-row">
        <span>Output Cost:</span>
        <span>{{ formatCurrency(outputCost) }}</span>
      </div>
      <div class="result-row result-row--total">
        <span>Total Cost:</span>
        <span>{{ formatCurrency(totalCost) }}</span>
      </div>
    </div>

    <div class="pricing-info" v-if="currentModel">
      <p>
        <strong>{{ currentModel.name }}</strong>:
        ${{ currentModel.inputPrice }}/1M input tokens,
        ${{ currentModel.outputPrice }}/1M output tokens
      </p>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { models as modelsData } from './data/models.js';

export default {
  name: 'App',
  components: {
    vSelect
  },
  data() {
    return {
      selectedProvider: null,
      selectedModel: null,
      inputTokens: 0,
      outputTokens: 0,
      numRequests: 1,
      modelsData
    };
  },
  computed: {
    providerOptions() {
      const providers = this.modelsData.providers;
      return Object.keys(providers).map(id => ({
        id,
        name: this.formatProviderName(id)
      }));
    },
    modelOptions() {
      if (!this.selectedProvider) return [];
      const providerData = this.modelsData.providers[this.selectedProvider];
      if (!providerData?.models) return [];

      return Object.entries(providerData.models).map(([id, model]) => ({
        id,
        name: id,
        inputPrice: model.input_per_1m,
        outputPrice: model.output_per_1m,
        notes: model.notes
      }));
    },
    currentModel() {
      if (!this.selectedProvider || !this.selectedModel) return null;
      const model = this.modelOptions.find(m => m.id === this.selectedModel);
      return model || null;
    },
    requestCount() {
      return this.numRequests || 1;
    },
    inputCost() {
      if (!this.currentModel || !this.inputTokens) return 0;
      return (this.inputTokens / 1_000_000) * this.currentModel.inputPrice * this.requestCount;
    },
    outputCost() {
      if (!this.currentModel || !this.outputTokens) return 0;
      return (this.outputTokens / 1_000_000) * this.currentModel.outputPrice * this.requestCount;
    },
    totalCost() {
      return this.inputCost + this.outputCost;
    }
  },
  watch: {
    selectedProvider() {
      this.selectedModel = null;
    }
  },
  methods: {
    formatProviderName(id) {
      const names = {
        anthropic: 'Anthropic',
        openai: 'OpenAI',
        google: 'Google',
        deepseek: 'DeepSeek'
      };
      return names[id] || id;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      }).format(value);
    }
  }
};
</script>
