import { Wallet, utils } from "zksync-ethers";
import { deployContract } from "./utils";
import * as dotenv from "dotenv"

dotenv.config();

export default async () => {
    const options= {
        silent: true,
        noVerify: true,
        wallet: new Wallet(String(process.env.WALLET_PRIVATE_KEY))
    }
    await deployContract("PoseidonT4", []);
}

