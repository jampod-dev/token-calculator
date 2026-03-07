<template>
  <div class="calculator">
    <div class="calculator-header">
      <h1>LLM Token Price Calculator</h1>
      <div class="currency-selector">
        <v-select
          v-model="selectedCurrency"
          :options="currencyOptions"
          :reduce="c => c.id"
          label="name"
          placeholder="USD"
          :clearable="false"
        />
      </div>
    </div>

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

    <div class="form-group form-group--checkbox" v-if="bedrockAvailable">
      <label>
        <input
          type="checkbox"
          v-model="useBedrock"
        >
        Use AWS Bedrock pricing
      </label>
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
        <br>Currency rates do not reflect live market exchange rates
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
      useBedrock: false,
      inputTokens: 0,
      outputTokens: 0,
      numRequests: 1,
      modelsData,
      currencyRates: null,
      currencies: null,      
      selectedCurrency: 'usd',
    };
  },
  mounted() {
    this.getCurrencies()
    this.getCurrencyRates();
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
    bedrockAvailable() {
      if (!this.selectedProvider || !this.selectedModel) return false;
      const bedrockProvider = this.modelsData.bedrock?.[this.selectedProvider];
      return bedrockProvider && this.selectedModel in bedrockProvider;
    },
    bedrockModel() {
      if (!this.bedrockAvailable) return null;
      const model = this.modelsData.bedrock[this.selectedProvider][this.selectedModel];
      return {
        id: this.selectedModel,
        name: `${this.selectedModel} (Bedrock)`,
        inputPrice: model.input_per_1m,
        outputPrice: model.output_per_1m,
        notes: model.notes
      };
    },
    currentModel() {
      if (!this.selectedProvider || !this.selectedModel) return null;
      if (this.useBedrock && this.bedrockModel) {
        return this.bedrockModel;
      }
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
    },
    currencyOptions() {
      if (!this.currencies) return [{ id: 'usd', name: '🇺🇸 USD' }];

      // ISO 4217 fiat currencies only
      const fiatCurrencies = new Set([
        'usd', 'eur', 'gbp', 'jpy', 'chf', 'cad', 'aud', 'nzd', 'cny', 'hkd',
        'sgd', 'sek', 'nok', 'dkk', 'mxn', 'brl', 'inr', 'rub', 'zar', 'krw',
        'twd', 'thb', 'myr', 'idr', 'php', 'vnd', 'aed', 'sar', 'ils', 'try',
        'pln', 'czk', 'huf', 'ron', 'bgn', 'hrk', 'isk', 'uah', 'egp', 'ngn',
        'kes', 'ghc', 'tzs', 'ugx', 'mad', 'dzd', 'tnd', 'pkr', 'bdt', 'lkr',
        'mmk', 'kzt', 'uzs', 'azn', 'gel', 'amd', 'byn', 'mdl', 'rsd', 'mkd',
        'all', 'bam', 'jod', 'lbp', 'kwd', 'bhd', 'omr', 'qar', 'cop', 'ars',
        'clp', 'pen', 'uyu', 'pyg', 'bob', 'ves', 'crc', 'pab', 'dop', 'gtq',
        'hnl', 'nio', 'jmd', 'ttd', 'bbd', 'xcd', 'awg', 'ang', 'bsd', 'kyd',
        'cup', 'htg', 'srd', 'gyd', 'bzd', 'fkp', 'gip', 'shp', 'xaf', 'xof',
        'xpf', 'cdf', 'rwf', 'bif', 'djf', 'kmf', 'mga', 'mur', 'scr', 'mzn',
        'aoa', 'zwl', 'bwp', 'szl', 'lsl', 'nad', 'zmw', 'mwk', 'etb', 'sos',
        'ssp', 'sdg', 'ern', 'lyd', 'syp', 'iqd', 'irr', 'afn', 'npr', 'btn',
        'mvr', 'khr', 'lak', 'kpw', 'mnt', 'fjd', 'pgk', 'wst', 'sbf', 'top',
        'vuv', 'btc'
      ]);

      return Object.entries(this.currencies)
        .filter(([id]) => fiatCurrencies.has(id))
        .map(([id]) => ({
          id,
          name: `${this.currencyToFlag(id)} ${id.toUpperCase()}`
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
    },
    currencyCode() {
      return (this.selectedCurrency || 'usd').toUpperCase();
    },
    conversionRate() {
      if (!this.selectedCurrency || !this.currencyRates) return 1;
      return this.currencyRates[this.selectedCurrency] || 1;
    }
  },
  watch: {
    selectedProvider() {
      this.selectedModel = null;
      this.useBedrock = false;
    },
    selectedModel() {
      this.useBedrock = false;
    }
  },
  methods: {
    fetchWithFallback(endpoint) {
      const primaryUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/${endpoint}`;
      const fallbackUrl = `https://latest.currency-api.pages.dev/v1/${endpoint}`;

      return fetch(primaryUrl)
        .then(response => {
          if (!response.ok) throw new Error('Primary fetch failed');
          return response.json();
        })
        .catch(() => {
          return fetch(fallbackUrl).then(response => response.json());
        });
    },
    getCurrencyRates() {
      this.fetchWithFallback('currencies/usd.json')
        .then(data => {
          this.currencyRates = data.usd;
        })
        .catch(error => {
          console.error('Error fetching currency rates:', error);
        });
    },
    getCurrencies() {
      this.fetchWithFallback('currencies.min.json')
        .then(data => {
          this.currencies = data;
        })
        .catch(error => {
          console.error('Error fetching currencies:', error);
        });
    },

    currencyToFlag(currencyCode) {
      // Special cases where currency code doesn't match country code
      const overrides = {
        eur: 'eu',
        xaf: 'cm', // Central African CFA franc
        xof: 'sn', // West African CFA franc
        xcd: 'ag', // East Caribbean dollar
        xpf: 'pf', // CFP franc
        ang: 'cw', // Netherlands Antillean guilder
        ssp: 'ss', // South Sudanese pound
      };

      const countryCode = overrides[currencyCode] || currencyCode.slice(0, 2);

      // Convert country code to flag emoji
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 0x1F1E6 + char.charCodeAt(0) - 65);

      return String.fromCodePoint(...codePoints);
    },
    formatProviderName(id) {
      const names = {
        anthropic: 'Anthropic',
        openai: 'OpenAI',
        google: 'Google',
        deepseek: 'DeepSeek',
        moonshot: 'Moonshot'
      };
      return names[id] || id;
    },
    formatCurrency(value) {
      const convertedValue = value * this.conversionRate;
      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: this.currencyCode,
          minimumFractionDigits: 2,
          maximumFractionDigits: 6
        }).format(convertedValue);
      } catch {
        // Fallback for unsupported currency codes
        return `${this.currencyCode} ${convertedValue.toFixed(6)}`;
      }
    }
  }
};
</script>
