import { Wallet, utils } from "zksync-ethers";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { InitialVoiceCreditProxyContractName } from "../constants";

const DEFAULT_INITIAL_VOICE_CREDITS = 99;

const deployContracts = async function (hre:HardhatRuntimeEnvironment) {
    const wallet = new Wallet(String(process.env.WALLET_PRIVATE_KEY));

    const deployer = new Deployer(hre, wallet);

    const loadArtifact = await deployer.loadArtifact(InitialVoiceCreditProxyContractName);
    const initialVoiceCreditProxy = await deployer.deploy(loadArtifact, [DEFAULT_INITIAL_VOICE_CREDITS]);

    console.log(
        `The initial voice credit proxy is deployed at ${await initialVoiceCreditProxy.getAddress()}`
      );
}

export default deployContracts;

deployContracts.tags = ["InitialVoiceCreditProxy"];