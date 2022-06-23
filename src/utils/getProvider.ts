import config from "@/config"
import { StaticJsonRpcProvider, BaseProvider } from "@ethersproject/providers"
export const provider: BaseProvider = new StaticJsonRpcProvider(config.ensRPC)