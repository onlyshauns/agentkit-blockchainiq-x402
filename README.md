# agentkit-blockchainiq-x402
Coinbase **AgentKit action provider** that makes **paid x402 calls** to Blockchain IQ (`brief` $0.01, `event-risk` $0.05), paying USDC on Base (eip155:8453) via `@x402/fetch` + `@x402/evm`. No API key, no account, no gas (EIP-3009 authorization; facilitator settles).

```bash
npm i
X402_PRIVATE_KEY=0x<throwaway key with ≥$0.05 USDC on Base> node demo.mjs brief
```
```js
import { AgentKit } from "@coinbase/agentkit";
import { blockchainIQActionProvider } from "./index.mjs";
const agentkit = await AgentKit.from({ walletProvider, actionProviders: [blockchainIQActionProvider()] });
// action "CustomActionProvider_blockchain_iq" -> {status, settlement:{transaction,...}, data}
```
Works with `getLangChainTools(agentkit)` / Vercel AI SDK AgentKit extensions. Settlement tx hash decoded from `PAYMENT-RESPONSE`. MIT.
