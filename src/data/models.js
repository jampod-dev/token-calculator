export const models = {
  "_meta": {
    "description": "LLM API pricing per 1M tokens (USD). Prices are standard/on-demand tier for ≤200K input tokens unless noted.",
    "last_updated": "2026-03-06",
    "notes": [
      "Prices are for standard context (≤200K input tokens). Many models charge 2x for longer contexts.",
      "Bedrock prices shown are for US regions with global/cross-region inference. Regional endpoints may add ~10%.",
      "Cached input and batch pricing typically offer 50-90% discounts — not included here.",
      "GPT-5.4 just launched (2026-03-05) — verify pricing as it stabilizes.",
      "DeepSeek V3.2 unifies chat and reasoning in a single model."
    ]
  },
  "providers": {
    "anthropic": {
      "models": {
        "claude-opus-4.6": {
          "input_per_1m": 5.00,
          "output_per_1m": 25.00,
          "max_context": 200000,
          "max_context_extended": 1000000,
          "api_model_id": "claude-opus-4-6-20260101",
          "notes": "Most capable. Fast mode available at 6x rates ($30/$150). Extended context (>200K) at 2x rates."
        },
        "claude-sonnet-4.6": {
          "input_per_1m": 3.00,
          "output_per_1m": 15.00,
          "max_context": 200000,
          "max_context_extended": 1000000,
          "api_model_id": "claude-sonnet-4-6",
          "notes": "Balanced performance/cost. Extended context (>200K) at 2x rates ($6/$22.50)."
        },
        "claude-sonnet-4.5": {
          "input_per_1m": 3.00,
          "output_per_1m": 15.00,
          "max_context": 200000,
          "max_context_extended": 1000000,
          "api_model_id": "claude-sonnet-4-5-20250929",
          "notes": "Previous gen balanced model. Extended context (>200K) at 2x rates."
        },
        "claude-haiku-4.5": {
          "input_per_1m": 1.00,
          "output_per_1m": 5.00,
          "max_context": 200000,
          "api_model_id": "claude-haiku-4-5-20251001",
          "notes": "Fastest/cheapest current-gen model."
        },
        "claude-haiku-3.5": {
          "input_per_1m": 0.80,
          "output_per_1m": 4.00,
          "max_context": 200000,
          "api_model_id": "claude-3-5-haiku-20241022",
          "notes": "Legacy. Still available."
        }
      }
    },
    "openai": {
      "models": {
        "gpt-5.4": {
          "input_per_1m": 2.50,
          "output_per_1m": 15.00,
          "max_context": 272000,
          "max_context_extended": 1050000,
          "api_model_id": "gpt-5.4",
          "notes": "Latest flagship (launched 2026-03-05). >272K context at 2x input, 1.5x output. Cached input $1.25."
        },
        "gpt-5.4-pro": {
          "input_per_1m": 30.00,
          "output_per_1m": 150.00,
          "max_context": 272000,
          "max_context_extended": 1050000,
          "api_model_id": "gpt-5.4-pro",
          "notes": "Premium reasoning tier. >272K context at 2x input, 1.5x output."
        },
        "gpt-5.2": {
          "input_per_1m": 1.75,
          "output_per_1m": 14.00,
          "max_context": 256000,
          "api_model_id": "gpt-5.2",
          "notes": "Previous flagship. Cached input $0.175."
        },
        "gpt-5": {
          "input_per_1m": 1.25,
          "output_per_1m": 10.00,
          "max_context": 400000,
          "api_model_id": "gpt-5",
          "notes": "Cached input $0.125 (90% discount)."
        },
        "gpt-5-mini": {
          "input_per_1m": 0.25,
          "output_per_1m": 2.00,
          "max_context": 400000,
          "api_model_id": "gpt-5-mini",
          "notes": "Budget-friendly GPT-5 variant."
        },
        "gpt-5-nano": {
          "input_per_1m": 0.05,
          "output_per_1m": 0.40,
          "max_context": 400000,
          "api_model_id": "gpt-5-nano",
          "notes": "Cheapest GPT-5 variant. Cached input $0.005."
        },
        "gpt-4o": {
          "input_per_1m": 2.50,
          "output_per_1m": 10.00,
          "max_context": 128000,
          "api_model_id": "gpt-4o",
          "notes": "Multimodal. Cached input $1.25."
        },
        "gpt-4o-mini": {
          "input_per_1m": 0.15,
          "output_per_1m": 0.60,
          "max_context": 128000,
          "api_model_id": "gpt-4o-mini",
          "notes": "Cheap multimodal option."
        },
        "gpt-4.1": {
          "input_per_1m": 2.00,
          "output_per_1m": 8.00,
          "max_context": 1048576,
          "api_model_id": "gpt-4.1",
          "notes": "1M native context. Cached input $0.50 (75% discount)."
        },
        "gpt-4.1-mini": {
          "input_per_1m": 0.40,
          "output_per_1m": 1.60,
          "max_context": 1048576,
          "api_model_id": "gpt-4.1-mini",
          "notes": "1M native context, budget tier."
        },
        "o3": {
          "input_per_1m": 2.00,
          "output_per_1m": 8.00,
          "max_context": 200000,
          "api_model_id": "o3",
          "notes": "Reasoning model. Output includes hidden reasoning tokens billed as output."
        },
        "o4-mini": {
          "input_per_1m": 1.10,
          "output_per_1m": 4.40,
          "max_context": 200000,
          "api_model_id": "o4-mini",
          "notes": "Compact reasoning model. Output includes hidden reasoning tokens."
        }
      }
    },
    "google": {
      "models": {
        "gemini-3.1-pro": {
          "input_per_1m": 2.00,
          "output_per_1m": 12.00,
          "max_context": 200000,
          "max_context_extended": 1000000,
          "api_model_id": "gemini-3.1-pro-preview",
          "notes": "Latest flagship. >200K context at 2x rates ($4/$18). Preview — pricing may change."
        },
        "gemini-3-flash": {
          "input_per_1m": 0.50,
          "output_per_1m": 3.00,
          "max_context": 1000000,
          "api_model_id": "gemini-3-flash-preview",
          "notes": "Fast frontier model. Flat pricing regardless of context length."
        },
        "gemini-2.5-pro": {
          "input_per_1m": 1.25,
          "output_per_1m": 10.00,
          "max_context": 200000,
          "max_context_extended": 1000000,
          "api_model_id": "gemini-2.5-pro",
          "notes": "Previous gen pro. >200K context at 2x rates ($2.50/$15)."
        },
        "gemini-2.5-flash": {
          "input_per_1m": 0.30,
          "output_per_1m": 2.50,
          "max_context": 1000000,
          "api_model_id": "gemini-2.5-flash",
          "notes": "Hybrid reasoning model. Audio input at $1.00/1M tokens."
        },
        "gemini-2.5-flash-lite": {
          "input_per_1m": 0.10,
          "output_per_1m": 0.40,
          "max_context": 1000000,
          "api_model_id": "gemini-2.5-flash-lite",
          "notes": "Most cost-effective Gemini model."
        },
        "gemini-2.0-flash": {
          "input_per_1m": 0.10,
          "output_per_1m": 0.40,
          "max_context": 1000000,
          "api_model_id": "gemini-2.0-flash",
          "notes": "Previous gen flash. Same price as 2.5 Flash-Lite."
        }
      }
    },
    "deepseek": {
      "models": {
        "deepseek-v3.2": {
          "input_per_1m": 0.28,
          "output_per_1m": 0.42,
          "max_context": 128000,
          "api_model_id": "deepseek-chat",
          "notes": "Unified model handling both chat and reasoning. Cache hit input $0.028 (90% discount)."
        },
        "deepseek-r1": {
          "input_per_1m": 0.50,
          "output_per_1m": 2.18,
          "max_context": 64000,
          "api_model_id": "deepseek-reasoner",
          "notes": "Now V3.2-based. Dedicated reasoning endpoint. Cache hit input $0.05."
        }
      }
    },
    "moonshot": {
      "models": {
        "kimi-k2.5": {
          "input_per_1m": 0.60,
          "output_per_1m": 3.00,
          "max_context": 260000,
          "api_model_id": "kimi-k2.5",
          "notes": "Latest flagship. Native multimodal (vision+text). Thinking/non-thinking modes. Cache hit input $0.15 (75% discount). OpenAI-compatible API at api.moonshot.ai/v1."
        },
        "kimi-k2.5-non-thinking": {
          "input_per_1m": 0.60,
          "output_per_1m": 2.50,
          "max_context": 260000,
          "api_model_id": "kimi-k2.5",
          "notes": "Same model in non-thinking mode. Slightly cheaper output."
        },
        "kimi-k2": {
          "input_per_1m": 0.60,
          "output_per_1m": 2.50,
          "max_context": 131000,
          "api_model_id": "kimi-k2",
          "notes": "Previous gen. Cache hit input $0.15 (75% discount)."
        },
        "kimi-k2-0905-exacto": {
          "input_per_1m": 0.39,
          "output_per_1m": 1.90,
          "max_context": 262000,
          "api_model_id": "kimi-k2-0905",
          "notes": "Exacto variant with 262K context."
        }
      }
    }
  },
  "bedrock": {
    "_notes": "AWS Bedrock on-demand pricing for US regions (N. Virginia, Ohio, Oregon) with global/cross-region inference. Regional endpoints add ~10%.",
    "anthropic": {
      "claude-opus-4.6": {
        "input_per_1m": 5.00,
        "output_per_1m": 25.00,
        "bedrock_model_id": "us.anthropic.claude-opus-4-6-v1",
        "notes": "Same as direct API pricing for global endpoints."
      },
      "claude-sonnet-4.6": {
        "input_per_1m": 3.00,
        "output_per_1m": 15.00,
        "bedrock_model_id": "us.anthropic.claude-sonnet-4-6-v1",
        "notes": "Same as direct API pricing for global endpoints."
      },
      "claude-sonnet-4.5": {
        "input_per_1m": 3.00,
        "output_per_1m": 15.00,
        "bedrock_model_id": "us.anthropic.claude-sonnet-4-5-20250929-v1:0",
        "notes": "Same as direct API pricing for global endpoints."
      },
      "claude-haiku-4.5": {
        "input_per_1m": 1.00,
        "output_per_1m": 5.00,
        "bedrock_model_id": "us.anthropic.claude-haiku-4-5-20251001-v1:0",
        "notes": "Same as direct API pricing for global endpoints."
      },
      "claude-3.5-haiku": {
        "input_per_1m": 0.80,
        "output_per_1m": 4.00,
        "bedrock_model_id": "us.anthropic.claude-3-5-haiku-20241022-v1:0",
        "notes": "Legacy model."
      },
      "claude-3.5-sonnet-v2": {
        "input_per_1m": 6.00,
        "output_per_1m": 30.00,
        "bedrock_model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
        "notes": "Extended access pricing (effective Dec 2025). Double the original rate."
      }
    },
    "deepseek": {
      "deepseek-v3.2": {
        "input_per_1m": 0.62,
        "output_per_1m": 1.85,
        "bedrock_model_id": "deepseek.deepseek-v3-2-v1:0",
        "notes": "~2.2x markup over direct DeepSeek API pricing."
      }
    },
    "meta": {
      "_notes": "Llama models on Bedrock. Pricing varies — check AWS for current Llama 4 rates."
    }
  }
}