process.on("unhandledRejection", e => { if (!String(e).includes("HTTP error")) throw e; }); // ignore AgentKit telemetry failures
import { AgentKit, ViemWalletProvider } from "@coinbase/agentkit";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { blockchainIQActionProvider } from "./index.mjs";
const k = process.env.X402_PRIVATE_KEY; const pk = k.startsWith("0x") ? k : `0x${k}`;
const walletProvider = new ViemWalletProvider(createWalletClient({ account: privateKeyToAccount(pk), chain: base, transport: http() }));
const agentkit = await AgentKit.from({ walletProvider, actionProviders: [blockchainIQActionProvider()] });
const action = agentkit.getActions().find(a => a.name.endsWith("blockchain_iq"));
const out = JSON.parse(await action.invoke({ resource: process.argv[2] || "brief" }));
console.log("action", action.name); console.log("status", out.status); console.log("settlement", JSON.stringify(out.settlement));
console.log(JSON.stringify(out.data).slice(0, 400));
